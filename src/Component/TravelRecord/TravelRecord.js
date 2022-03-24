import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TravelCard from './TravelCard';
import NavBar from "../NavBar";
import '../../styles.css';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        display: "flex",
        flex: 1,
        flexDirection: "column",

    },

}));

export default function TravelRecord() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <NavBar />
            <div>
                {new Array(2).fill(0).map((i, index) =>
                    <TravelCard index={index} />
                )}
            </div>

        </div>
    );
}
