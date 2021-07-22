import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import CancelIcon from '@material-ui/icons/Cancel';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Box from '@material-ui/core/Box';
import "../styles.css";
import firebase from "firebase/app";

import "firebase/storage";

import { Config } from '../firebase.js';



const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        // width: "100%"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    result: {

        width: "100%",
        display: "flex",

        alignItems: "center",
        justifyContent: "left"
    },
    root: {
        display: 'flex',
        padding: 10,
        flexDirection: "column",
        // flexWrap: 'wrap',
        // justifyContent: 'space-around',
        // alignItems: "center",

        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        margin: 10,
        padding: 5,
        width: "100%",
        height: "100%",
    },

    field: {
        margin: 20
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
        position: "relative",
        bottom: 12,
        left: 12,
        zIndex: 3
    },
    grid: {
        flexGrow: 1,
        width: "100%"
    },
    center: {
        margin: "auto"
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PrevDialog({ open, handleClose, imagePrev, imageUpload, editPhoto, handleUpload }) {
    const classes = useStyles();

    async function waitEach(array, callback) {
        for (let i = 0; i < array.length; i++) {
            await callback(i, array[i]); //等它!
        }
    }

    const handleSubmit = () => {

        if (!firebase.apps.length) {

            firebase.initializeApp(Config);

        }

        const storage = firebase.storage();

        if (imageUpload) {

            waitEach(imageUpload, async (index, item) => {
                try {
                    console.log(item);
                    const imageRef = storage.ref().child("ABC/" + item.name);

                    await imageRef.put(item);

                    alert("上傳成功");

                    const url = await imageRef.getDownloadURL();

                    console.log(url);

                }

                catch (e) {

                    if (e.code === "storage/unauthorized") {

                        alert("尚未登入");

                    } else { console.log(e.message); }
                }
            })
        }
    }
    return (


        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}
            style={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "center", }}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <span className="font-link" style={{ fontSize: 23, }}>
                            您選擇的照片
                        </span>
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.root}>
                <Box display="flex"  >
                    <Box p={1} flexGrow={1} className={classes.center}>
                        <span className="font-link" style={{
                            fontSize: 17,
                        }} >
                            共 {imagePrev.length} 張
                        </span>
                    </Box>

                    <Box  >
                        <input type="file" accept="image/x-png,image/jpeg" onChange={handleUpload}
                            id="file"
                            style={{
                                display: "none"
                                // visibility: "hidden",
                                // width: 0,
                                // height: 0
                            }}
                            multiple
                            capture
                        />
                        <IconButton >
                            <label htmlFor="file" >
                                <AddPhotoAlternateIcon />
                            </label>
                        </IconButton>
                    </Box>
                </Box>

                <ImageList rowHeight={180} className={classes.imageList} >

                    {imagePrev.map((photo, index) => (
                        <ImageListItem key={photo.imgPath} >

                            <img src={photo.imgPath} height="150" />
                            <ImageListItemBar

                                position="top"
                                actionIcon={
                                    <IconButton className={classes.icon} onClick={() => editPhoto(index)}>
                                        <CancelIcon fontSize="medium" />
                                    </IconButton>
                                }
                                actionPosition="right"
                                className={classes.titleBar}
                            />

                        </ImageListItem>
                    ))}

                </ImageList>
            </div>
            <div className="field">
                <TextField
                    id="outlined-multiline-static"
                    label="留言"
                    multiline
                    rows={4}
                    defaultValue="留個言吧!"
                    variant="outlined"
                    style={{ width: "90%", marginTop: 20, padding: 15 }}
                />
            </div>
            <Box display="flex" flexDirection="row-reverse" p={1} m={1} >
                {console.log(imageUpload)}
                <Box p={1} >
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        width="90%"
                        startIcon={<CloudUploadIcon />}
                        onClick={handleSubmit}
                    >
                        UPLOAD
                    </Button>
                </Box>

            </Box>

        </Dialog>

    );
}
