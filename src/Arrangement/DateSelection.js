
import React, { useState } from 'react';
import {
    makeStyles,
} from '@material-ui/core/styles';

import {
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';





const useStyles = makeStyles((theme) => ({
    root: {
        border: theme.palette.primary
    }
}));



export function DatePicker({ setDay, day }) {
    // The first commit of Material-UI

    const classes = useStyles();
    return (

        <KeyboardDatePicker
            required
            className={classes.margin}
            label={<span className="font-link" style={{ fontSize: 20 }}>
                旅遊日期
            </span>}
            variant="inline"
            inputVariant="outlined"
            placeholder="ex: DD/MM/AAAA"
            format="YYYY/MM/DD"
            value={day || ''}
            onChange={date => setDay(date)}
            color="primary"
            style={{ width: "100%" }}


        />

    );
}

export function TimePicker({ clock, setTime, isSaved }) {
    // The first commit of Material-UI



    return (

        <KeyboardTimePicker
            variant="inline"
            inputVariant="outlined"
            label={<span className="font-link" style={{ fontSize: 20 }}>
                旅遊時間
            </span>}

            mask="__:__ _M"
            value={clock}
            onChange={date => setTime(date)}
            style={{ width: "100%" }}
            InputProps={{
                readOnly: isSaved,
            }}


        />

    );
}