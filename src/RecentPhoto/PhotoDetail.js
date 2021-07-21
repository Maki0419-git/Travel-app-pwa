import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Dialog from '@material-ui/core/Dialog';
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        position: "re",

    },
    media: {
        height: "100%",
        //paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    icon: {
        padding: 3,

    }
}));

export default function PhotoDetail({ detailShow, closeDialog, imageDetail }) {
    const classes = useStyles();
    const [content, setContent] = useState(imageDetail)
    console.log(imageDetail);
    useEffect(() => {
        setContent({
            img: imageDetail.img,
            title: imageDetail.title,
            author: imageDetail.author,
            time: imageDetail.time,
            content: imageDetail.content,
        })
    }, [detailShow])

    return (
        <Dialog open={detailShow} onClose={closeDialog}>
            <Card className={classes}>

                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" >
                            <BookmarkBorderIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                    }
                    title={content.title}
                    subheader={content.time}
                />
                <CardMedia
                    className={classes.media}
                    src={content.img}
                    component="img"

                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {content.content}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to like" className={classes.icon}>
                        <FavoriteIcon />
                    </IconButton>

                    <IconButton aria-label="add to favorites" className={classes.icon}>
                        <ThumbUpAltIcon />
                    </IconButton>

                </CardActions>

            </Card>
        </Dialog>
    );
}