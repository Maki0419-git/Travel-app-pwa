import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import InfoIcon from '@material-ui/icons/Info';
import PrevDialog from "./PrevDialog"




const useStyles = makeStyles((theme) => ({

    photoContainer: {
        border: `1px solid ${theme.palette.primary.main}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        minWidth: "99%",
        [theme.breakpoints.down('md')]: {
            minWidth: "99%",
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: "90%",
        },
    },
    imageListContainer: {
        display: 'flex',
        overflowX: "visible",
        overflowY: "hidden",
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        "&.MuiImageList-root": {
            flexWrap: "nowrap",
        }
    },
    imageList: {
        flexWrap: 'nowrap',
        margin: 6,
        minheight: '30vh',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },

}));


const GetStepContent = () => {
    const [imagePrev, setImagePrev] = useState([]);
    const [imageUpload, setImageUpload] = useState([]);
    const [prevOpen, setPrevOpen] = useState(false)
    const classes = useStyles();

    const editPhoto = (index) => {
        const copyPrev = [...imagePrev];
        const copyUpload = [...imageUpload];
        copyPrev.splice(index, 1)
        copyUpload.splice(index, 1)
        setImagePrev(copyPrev);
        setImageUpload(copyUpload);
    }

    const handleClose = () => {
        setImageUpload([]);
        setImagePrev([]);
        setPrevOpen(false)
    }
    const handleUpload = function (e) {
        const filesArray = Array.from(e.target.files)
        const url = filesArray.map((file) => URL.createObjectURL(file));
        setImagePrev(prev => [...prev, ...url])
        setImageUpload((prev) => [...prev, ...filesArray])
        setPrevOpen(true)
        Array.from(e.target.files).map(
            (file) => URL.revokeObjectURL(file) // avoid memory leak
        );

    }

    return (
        <>
            <ImageList className={classes.imageListContainer} cols={2.5} rowHeight={300}>
                {imagePrev.map((item, index) => (
                    <ImageListItem key={index} className={classes.imageList}>
                        <img src={item} />
                        <ImageListItemBar
                            title={123}
                            subtitle={<span>by: yoshino</span>}
                            actionIcon={
                                <IconButton aria-label={`info about yoshino`} className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
                <Box borderRadius={16} className={classes.photoContainer} >
                    <input type="file" accept="image/x-png,image/jpeg" onChange={handleUpload}
                        id="file"
                        style={{ display: "none" }}
                        multiple
                    />
                    <IconButton >
                        <label htmlFor="file" >
                            <AddPhotoAlternateIcon fontSize="large" />
                        </label>
                    </IconButton>
                    <span className="font-link" style={{ fontSize: 15 }}>
                        為你的旅程添加相片!
                    </span>

                </Box>
            </ImageList>
            <PrevDialog
                open={prevOpen}
                {...{ handleClose, imagePrev, imageUpload, editPhoto, handleUpload, setImageUpload, setImagePrev }}

            />
        </>

    )

}

{/* */ }

export default GetStepContent;