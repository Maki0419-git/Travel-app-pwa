
import React from "react";

import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
//https://www.kindacode.com/article/react-warning-finddomnode-is-deprecated-in-strictmode/
const useStyles = makeStyles({
    list: {
        width: 250
    },
    fullList: {
        width: "auto",
        padding: 3
    },
    icon: {


    }
});
// const useStyles = makeStyles((theme) => ({
//   active: {
//     backgroundColor: theme.palette.secondary.main,

//     color: theme.palette.text.secondary
//   }
// }));
export default function SideBar({ open, closeBar }) {
    const classes = useStyles();
    const activeStyle = { backgroundColor: "pink", color: "black" };
    return (
        <div>
            <React.Fragment key={"left"}>
                <Drawer anchor={"left"} open={open} onClose={closeBar}>
                    <div className={classes.fullList}>
                        <List>
                            <ListItem
                                button
                                component={NavLink}
                                activeStyle={activeStyle}
                                exact
                                to={"/"}

                            >
                                <ListItemIcon className={classes.icon}>
                                    <PhotoLibraryIcon />
                                </ListItemIcon>
                                <ListItemText primary={"近期照片"} />
                            </ListItem>

                            <ListItem
                                button
                                component={NavLink}
                                activeStyle={activeStyle}
                                to={"/MyTravel"}

                            >
                                <ListItemIcon className={classes.icon}>
                                    <CardTravelIcon />
                                </ListItemIcon>
                                <ListItemText primary={"我的旅遊"} />
                            </ListItem>
                            <ListItem
                                button
                                component={NavLink}
                                activeStyle={activeStyle}
                                to={"/Arrangement"}

                            >
                                <ListItemIcon>
                                    <FormatListBulletedIcon className={classes.icon} />
                                </ListItemIcon>
                                <ListItemText primary={"近期安排"} />
                            </ListItem>
                            <ListItem
                                button
                                component={NavLink}
                                activeStyle={activeStyle}
                                to={"/TravelRecord"}

                            >
                                <ListItemIcon>
                                    <FormatListBulletedIcon className={classes.icon} />
                                </ListItemIcon>
                                <ListItemText primary={"旅程紀錄"} />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </React.Fragment>
        </div>
    );
}