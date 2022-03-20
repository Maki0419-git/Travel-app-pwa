import NavBar from "../NavBar";
import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { itemData } from '../ImageList';
import PhotoDetail from "./PhotoDetail";
const useStyles = makeStyles((theme) => ({
    container: {


        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,

    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        padding: 10
    },
    imageList: {
        width: "100%",
        height: "100%",
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

export default function RecentPhoto() {
    const [detailShow, setDetailShow] = useState(false);
    const [imageDetail, setImageDetail] = useState({
        img: '',
        title: '',
        author: '',
        time: "",
        content: "",
    })

    function openDialog(item) {
        setDetailShow(true)
        setImageDetail({
            img: item.img,
            title: item.title,
            author: item.author,
            time: item.time,
            content: item.content,
        })
    }

    function closeDialog(item) {


        setDetailShow(false)
    }
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <NavBar />

            <div className={classes.root}>

                <ImageList rowHeight={160} className={classes.imageList} cols={3}>
                    {itemData.map((item, index) => (
                        <ImageListItem key={item.img} cols={item.cols || 1}>
                            <img src={item.img} alt={item.title} />
                            <ImageListItemBar
                                title={item.title}
                                subtitle={<span>by: {item.author}</span>}
                                actionIcon={
                                    <IconButton
                                        aria-label={`info about ${item.title}`}
                                        className={classes.icon}
                                        onClick={() => openDialog(item)}
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </ImageListItem>

                    ))}
                </ImageList>

            </div>
            <PhotoDetail detailShow={detailShow} closeDialog={closeDialog} imageDetail={imageDetail} />
        </div>
    );
}