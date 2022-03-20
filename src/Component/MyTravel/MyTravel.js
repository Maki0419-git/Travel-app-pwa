import React, { useState, } from "react";
import Taiwan from "@svg-maps/taiwan";
import { CheckboxSVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import CityCountyData from "./CityName.json";
import NavBar from "../NavBar";
import { itemData } from '../ImageList';
import "../../styles.css";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        maxWidth: 400,
        margin: 10,
        padding: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    list: {
        margin: 10,
        padding: 5
    },
    ImageRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginTop: 10
    },
    imageList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

export default function MyTravel() {
    const [location, setLoation] = useState([]);
    const classes = useStyles();
    function checkLocation(selectedNodes) {
        const cities = [];

        const element = selectedNodes.reduce((neededElements, item) => {
            cities.push(item.attributes.id.value);
            CityCountyData.map((data) => {
                return data.CityEngName === item.attributes.name.value
                    ? neededElements.push(data.CityName)
                    : NaN;
            });
            return neededElements;
        }, []);

        setLoation(element);

    }

    // function changeLocation(selected) {
    //     console.log(selected.attributes.name.value)
    // }
    return (
        <div >
            {console.log(location)}
            <div>
                <NavBar />

            </div>
            <div  >
                <div className={classes.paper}>
                    <Grid container spacing={2} style={{ flexWrap: 'nowrap' }} >

                        <Grid item>
                            <div className="vl"></div>
                        </Grid>
                        <Grid item xs >
                            <span className="font-link" style={{ fontSize: 25 }}>
                                請選擇欲查詢地區:
                            </span>
                            {location.length !== 0 &&
                                <div >
                                    {location.map(i => (
                                        <Chip color="primary" className="font-link" variant="outlined"
                                            style={{ marginTop: 10, marginRight: 5 }}
                                            label={<span className="font-link" style={{ fontSize: 15, fontWeight: 700 }}>
                                                {i}
                                            </span>} />

                                    ))}

                                </div>
                            }
                        </Grid>
                    </Grid>

                    <CheckboxSVGMap map={Taiwan} onChange={checkLocation} />
                </div>
                <div className={classes.list}>
                    <Grid container spacing={2} >
                        <Grid item>
                            <div className="vl"></div>
                        </Grid>
                        <Grid item>
                            <span className="font-link" style={{ fontSize: 25 }}>
                                景點
                            </span>
                        </Grid>

                    </Grid>
                    <div className={classes.ImageRoot}>
                        <ImageList className={classes.imageList} cols={2.5}>
                            {itemData.map((item) => (
                                <ImageListItem key={item.img}>
                                    <img src={item.img} alt={item.title} />
                                    <ImageListItemBar
                                        title={item.title}

                                        actionIcon={
                                            <IconButton
                                                aria-label={`info about ${item.title}`}
                                                className={classes.icon}

                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </div>
                <div className={classes.list}>
                    <Grid container spacing={2} >
                        <Grid item>
                            <div className="vl"></div>
                        </Grid>
                        <Grid item>
                            <span className="font-link" style={{ fontSize: 25 }}>
                                餐廳
                            </span>
                        </Grid>

                    </Grid>
                    <div className={classes.ImageRoot}>
                        <ImageList className={classes.imageList} cols={2.5}>
                            {itemData.map((item) => (
                                <ImageListItem key={item.img}>
                                    <img src={item.img} alt={item.title} />
                                    <ImageListItemBar
                                        title={item.title}

                                        actionIcon={
                                            <IconButton
                                                aria-label={`info about ${item.title}`}
                                                className={classes.icon}

                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </div>
            </div>
        </div>
    )
}