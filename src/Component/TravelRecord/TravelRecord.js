import React from 'react';
import TravelDetail from "./TravelDetail";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import NavBar from "../NavBar";
import '../../styles.css';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        display: "flex",
        flex: 1,
        flexDirection: "column",

    },
    root: {
        margin: 100,
        marginTop: 20,
        [theme.breakpoints.down('md')]: {
            margin: 80,
        },
        [theme.breakpoints.down('sm')]: {
            margin: 20,
        },
    },
    media: {
        paddingTop: '56.25%', // 16:9
        backgroundImage: `linear-gradient(rgba(0,0,0, 0.25), rgba(0,0,0, 0.55)),url(${process.env.PUBLIC_URL}/img/landscape/0.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
    },
    mediaTextContainer: {
        position: 'absolute',
        bottom: 0,
        display: "flex",
        width: '97%',
        justifyContent: "space-between"
    },
    mediaTitle: {
        color: 'white',
        [theme.breakpoints.down('md')]: {
            fontSize: 25
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 20
        },
    },
    mediaDate: {
        color: 'white',
        [theme.breakpoints.down('md')]: {
            fontSize: 15
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 10
        },
        marginLeft: 4
    },
    mediaMore: {
        position: 'absolute',
        top: 4,
        right: 2,
        color: 'white',
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
}));



export default function TravelRecord() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={classes.container}>
            <NavBar />
            <div>
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.media}
                        // image={`${process.env.PUBLIC_URL}/img/landscape/1.jpg`}
                        title="Paella dish"
                    >
                        <MoreVertIcon className={classes.mediaMore} fontSize="large" />
                        <CardContent className={classes.mediaTextContainer}>
                            <Box>
                                <Typography variant="h2" component="p" className={classes.mediaTitle}>
                                    Shrimp and Chorizo
                                </Typography>
                                <Typography variant="h6" component="p" className={classes.mediaDate}>
                                    September 14, 2016
                                </Typography>
                            </Box>
                            <ArrowRightAltIcon className="float-arrow" fontSize="large" style={{ fontSize: 50 }} />
                        </CardContent>
                    </CardMedia>
                    <CardActions disableSpacing>

                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <TravelDetail />
                    </Collapse>
                </Card>
            </div>

        </div>
    );
}
