
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        padding: 10
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(15),
        right: theme.spacing(6),
    },
}));

export default function Arrangement() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
            </div>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => setOpen(true)}>
                <AddIcon />
            </Fab>

        </div >
    )
}