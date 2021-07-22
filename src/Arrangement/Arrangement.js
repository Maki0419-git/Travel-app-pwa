
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavBar from "../NavBar";
import "../styles.css";
import AddArrangement from './AddArrangement';
import ArrangementDetail from "./ArrangementDetail";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Config } from '../firebase';

if (!firebase.apps.length) {

    firebase.initializeApp(Config);

}
let db = firebase.firestore();

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        padding: 10
    },
    fab: {
        position: 'fixed',
        bottom: 25,
        right: 10,
    },
}));

export default function Arrangement() {
    const [open, setOpen] = React.useState(false);
    const [detailOpen, setDetailOpen] = React.useState(false);
    const [arrangements, setArrangements] = useState([])
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    async function readData() {

        db.collection("user_info/DlXAEufxhTCF0L2SvK39/arrangements")
            .onSnapshot((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    title: doc.data().title,
                    day: doc.data().day,

                }
                )
                );
                console.log("All Arrangements:", data);

                setArrangements(data)

            })

    }


    useEffect(() => { readData() }, [])

    return (
        <div style={{ alignItems: "center", flex: 1 }}>
            <div>
                <NavBar />
            </div>
            <div>
                <div className={classes.root}>
                    <List>
                        <span className="font-link" style={{ fontSize: 18, fontWeight: 500 }}>
                            7月19號 星期一
                        </span>
                        <Divider />
                        <ListItem>
                            <Grid container spacing={2} style={{ margin: 1 }}>
                                <Grid item>
                                    <div className="vl"></div>
                                </Grid>
                                <Grid item>
                                    <span className="font-link" style={{ fontSize: 20 }}>
                                        台南之旅
                                    </span>
                                </Grid>

                            </Grid>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>

                        </ListItem>
                    </List>

                </div>
                <div >
                    <AddArrangement open={open} handleClose={handleClose} />
                </div>
                <div>
                    <ArrangementDetail open={detailOpen} />
                </div>
            </div>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => setOpen(true)}>
                <AddIcon />
            </Fab>

        </div >
    )
}