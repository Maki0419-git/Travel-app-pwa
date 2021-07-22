import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        width: 280
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },

}));


export default function ImageListComponent({ data }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ImageList className={classes.imageList} cols={1.5}>
                {data.map((item) => (
                    <ImageListItem key={item.imgPath} className={classes.img} >
                        <img src={item.imgPath} />
                        <ImageListItemBar
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                            title={item.label}
                            subtitle={<span>by: Melody</span>}
                            actionIcon={
                                <IconButton
                                    // aria-label={"author:Melody"}

                                    className={classes.icon}
                                // onClick={() => openDialog(item)}
                                >
                                    <InfoIcon style={{ color: "white" }} />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}
