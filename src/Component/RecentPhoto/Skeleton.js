import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MUISkeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    container: {
        height: 200,
        width: '100%',
        boxSizing: 'border-box',
        padding: 0.5,
        margin: "1%"
    },
    box1: {
        height: 150,
        marginBottom: 1,
        "&.MuiSkeleton-text": {
            transform: "scale(1, 0.90)"
        }

    },
    box2: {
        height: 50,
        marginBottom: 1,
        "&.MuiSkeleton-text": {
            transform: "scale(1, 0.90)"
        }
    }

}));


const Skeleton = ({ colResult }) => {
    console.log(colResult);
    const classes = useStyles();
    return (
        // <div className={classes.root}>
        <>
            {colResult.map(i =>
                <div className={classes.container} >
                    <MUISkeleton className={classes.box1} />
                    <MUISkeleton className={classes.box2} />
                </div>
            )}
        </>
        // </div>
    )
}

export default Skeleton
