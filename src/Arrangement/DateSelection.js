
import React, { useState } from 'react';
import {
    alpha,
    ThemeProvider,
    withStyles,
    makeStyles,
    createTheme,
} from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJS from '@date-io/dayjs';
import {
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import dayjs from 'dayjs'




const useStyles = makeStyles((theme) => ({
    root: {
        border: theme.palette.primary
    }
}));



export function DatePicker() {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(dayjs());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
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
            value={selectedDate || ''}
            onChange={date => handleDateChange(date)}
            color="primary"
            style={{ width: "100%" }}


        />

    );
}

export function TimePicker({ time, setTime, isSaved }) {
    // The first commit of Material-UI



    return (

        <KeyboardTimePicker
            variant="inline"
            inputVariant="outlined"
            label={<span className="font-link" style={{ fontSize: 20 }}>
                旅遊時間
            </span>}
            placeholder="08:00 AM"
            mask="__:__ _M"
            value={time}
            onChange={date => setTime(date)}
            style={{ width: "100%" }}


        />

    );
}