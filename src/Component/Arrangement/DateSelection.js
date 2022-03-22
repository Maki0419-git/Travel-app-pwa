
import React from 'react';
import {
    makeStyles, alpha
} from '@material-ui/core/styles';

import {
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import dayjs from 'dayjs';




const useStyles = makeStyles((theme) => ({
    root: {
        border: theme.palette.primary
    }
}));



export function DatePicker({ setDay, day }) {
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
            placeholder="ex: YYYY/MM/DD"
            format="YYYY/MM/DD"
            value={day || ''}
            onChange={date => setDay(date)}
            color="primary"
            style={{ width: "100%", marginTop: 10, marginBottom: 10 }}
        />

    );
}

export function TimePicker({ clock, setTime, isSaved }) {
    const { h, m } = ((clock) => {
        const turnStringClockToNumber = clock.split(":");
        return { h: Number(turnStringClockToNumber[0]), m: Number(turnStringClockToNumber[1]) }
    })(clock);
    return (
        <KeyboardTimePicker
            variant="inline"
            inputVariant="outlined"
            label={<span className="font-link" style={{ fontSize: 20 }}>
                旅遊時間
            </span>}
            mask="__:__ _M"
            value={dayjs().hour(h).minute(m)}
            onChange={time => setTime(time.format("H:m"))}
            style={{ width: "100%" }}
            disabled={isSaved}
        />

    );
}