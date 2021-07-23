import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { DatePicker } from "./DateSelection"
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Config } from '../firebase';
import Fields from "./Fields";
import dayjs from 'dayjs';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,


    },
}));



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function AddArrangement({ open, handleClose }) {
    const classes = useStyles();
    const [submit, setSubmit] = useState([{

        location: "",
        address: "",
        clock: dayjs(),
        memo: "",
        city: ""

    }])
    const [title, setTitle] = useState("")
    const [day, setDay] = useState(dayjs())
    const [requiredError, setRequiredError] = useState(false);
    console.log(submit);

    const saveField = (index, location, address, clock, memo, city) => {
        const copySub = [...submit];
        copySub[index] = { location: location, address: address, clock: clock, memo: memo, city: city }
        setSubmit(copySub);
    }


    const deleteField = (index) => {
        console.log("index:" + index)
        const copySub = [...submit]
        copySub.splice(index, 1)
        setSubmit(copySub)
    }


    const addField = () => {
        setSubmit((prev) => ([
            ...prev,
            {
                location: "",
                address: "",
                clock: dayjs(),
                memo: "",
                city: "",
            }
        ]))
    }


    useEffect(() => {
        console.log("open")
        setTitle("")
        setRequiredError(false)
        setDay(dayjs())
        setSubmit([{

            location: "",
            address: "",
            clock: dayjs(),
            memo: "",
            city: ""

        }])
    }, [open])



    async function saveToDB() {
        if (title === "") {
            setRequiredError(true)
        } else {
            if (!firebase.apps.length) {

                firebase.initializeApp(Config);

            }
            let db = firebase.firestore();
            try {
                const docRef = await db.collection("user_info/DlXAEufxhTCF0L2SvK39/travels").add({
                    title: title,
                    day: day.toDate(),
                    progress: "arrangement"
                });
                console.log(docRef.id)

                submit.forEach((element, index) => {
                    db.collection("user_info/DlXAEufxhTCF0L2SvK39/travels/" + docRef.id + "/spots").add({
                        order: index + 1,
                        location: element.location,
                        address: element.address,
                        clock: element.clock.format("HH:mm"),
                        memo: element.memo,
                        city: element.city,

                    })
                });
            }
            catch (error) {
                console.error("Error adding arrangement: ", error);
            }

            handleClose();




        }
    }
    // console.log(day.toDate());
    return (

        <div>
            <Dialog fullScreen open={open} TransitionComponent={Transition} >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="close" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            <span className="font-link" style={{ fontSize: 23 }}>
                                規劃你的行程!
                            </span>
                        </Typography>
                        <Button autoFocus color="inherit" edge="end" onClick={saveToDB}>
                            <span className="font-link" style={{ fontSize: 16 }}>
                                完成
                            </span>
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent style={{ display: "flex", flexDirection: "column", alignItems: "center", }}>

                    <div style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
                        <Grid container spacing={2} style={{ marginBottom: 5, marginTop: 5 }} >
                            <Grid item >
                                <div className="vl"></div>
                            </Grid>
                            <Grid item>
                                <span className="font-link" style={{ fontSize: 20 }}>
                                    為你的旅遊取個名字吧!
                                </span>
                            </Grid>

                        </Grid>
                        <TextField

                            error={requiredError}
                            label={<span className="font-link" style={{ fontSize: 20 }}>
                                命名
                            </span>}
                            required
                            value={title}
                            variant="outlined"
                            onChange={(event) => setTitle(event.target.value)}
                            style={{ marginTop: 5, marginBottom: 10, width: "100%" }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" style={{ paddingRight: 10 }}>
                                    <BorderColorIcon />
                                </InputAdornment>,

                            }}


                        />
                    </div>
                    <div style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
                        <Grid container spacing={2} style={{ marginBottom: 5, marginTop: 5 }} >
                            <Grid item >
                                <div className="vl"></div>
                            </Grid>
                            <Grid item>
                                <span className="font-link" style={{ fontSize: 20 }}>
                                    何時旅遊?
                                </span>
                            </Grid>

                        </Grid>
                        <DatePicker setDay={setDay} day={day} />
                    </div>
                    <div style={{ flexDirection: "column", width: "100%" }}>

                        <Grid container spacing={2} style={{ marginTop: 5, alignItems: "center", position: "relative", right: 14 }} >
                            <Grid item auto="true">

                            </Grid>
                            <Grid item >
                                <div className="vl"></div>
                            </Grid>
                            <Grid item xs={7}>
                                <span className="font-link" style={{ fontSize: 20 }}>
                                    想去哪裡?
                                </span>
                            </Grid>

                            <Grid item position="end">
                                <Button color="primary"
                                    onClick={addField}
                                ><span className="font-link" style={{ fontSize: 14 }}>
                                        新增景點
                                    </span>
                                    <AddIcon style={{ fontSize: 15 }} />
                                </Button>
                            </Grid>
                        </Grid>

                    </div>
                    <div style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
                        {submit.map((i, index) => (
                            <Fields data={i} saveField={saveField} deleteField={deleteField} key={index} index={index} />
                        ))}
                    </div>



                </DialogContent>
            </Dialog>
        </div >

    );
}