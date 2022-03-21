
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import dayjs from 'dayjs';

import AddArrangement from './AddArrangement';
import ArrangementDetail from "./ArrangementDetail";
import NavBar from "../NavBar";
import { db } from '../../Config/firebase';
import "../../styles.css";





const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,




    },
    fab: {
        position: 'fixed',
        bottom: 25,
        right: 10,
    },
}));

function changeDay(d) {
    switch (d) {
        case "0":
            return "日"

        case "1":
            return "一"

        case "2":
            return "二"

        case "3":
            return "三"

        case "4":
            return "四"

        case "5":
            return "五"

        case "6":
            return "六"

        default:

            return "一"

    }
}

export default function Arrangement() {
    const [open, setOpen] = React.useState(false);
    const [detailOpen, setDetailOpen] = React.useState(false);
    const [arrangements, setArrangements] = useState([])
    const [selectedID, setSelectedID] = useState("");
    const [action, setAction] = useState("add");
    const [main, setMain] = useState({

        title: "",
        dsy: ""
    })

    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    async function readData() {
        try {

            const q = query(collection(db, "user_info/DlXAEufxhTCF0L2SvK39/travels"), where("progress", "==", "arrangement"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push(
                        {
                            id: doc.id,
                            title: doc.data().title,
                            day: dayjs(doc.data().day),
                        }
                    );
                });
                setArrangements(data)

            });
        } catch (e) { console.log(e) }

    }
    function openDetail(i) {
        setDetailOpen(true)
        setSelectedID(i.id)
        setMain({

            title: i.title,
            day: (i.day.format("M")) + "月" + i.day.format("D") + "日 星期" + changeDay(i.day.format("d"))

        })

    }

    function closeDetail() {
        setDetailOpen(false)
        setSelectedID("")
        setMain({
            title: "",
            dsy: ""
        })
    }

    function openAdd(action) {
        if (action === "add") {
            setAction("add")
            setOpen(true)
        } else {
            setAction("edit")
            setOpen(true)
        }
    }

    useEffect(() => { readData() }, [])

    return (
        <div >
            <NavBar />
            <List className={classes.root}>
                {arrangements.map((i) => (
                    <div key={i.id} >
                        <span className="font-link" style={{ fontSize: 18, fontWeight: 500, marginLeft: 20 }}>
                            {i.day.format("YYYY 年 M 月 D 日 ") + `(${changeDay(i.day.format("d"))})`}
                            {/* {(i.day.format("M")) + "月" + i.day.format("D") + "日 星期" + changeDay(i.day.format("d"))} */}
                        </span>
                        <Divider />
                        <ListItem onClick={() => { openDetail(i) }} >
                            <Grid container spacing={2} style={{ margin: 1 }}>
                                <Grid item>
                                    <div className="vl"></div>
                                </Grid>
                                <Grid item>
                                    <span className="font-link" style={{ fontSize: 20 }}>
                                        {i.title}
                                    </span>
                                </Grid>

                            </Grid>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => { openAdd("edit"); setSelectedID(i.id) }} >
                                    <EditIcon />
                                </IconButton>
                            </ListItemSecondaryAction>

                        </ListItem>
                    </div>

                ))}

            </List>

            <AddArrangement open={open} handleClose={handleClose} id={selectedID} action={action} />
            <ArrangementDetail open={detailOpen} main={main} selectedID={selectedID} closeDetail={closeDetail} />
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => openAdd("add")}>
                <AddIcon />
            </Fab>
        </div >
    )
}