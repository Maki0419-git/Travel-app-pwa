import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
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
import dayjs from 'dayjs';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../Config/firebase';
import Fields from "./Fields";




const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,


    },
    boxContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 5
    },
    boxSpaceBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 5
    }
}));



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function AddArrangement({ open, handleClose, id, action }) {
    const classes = useStyles();
    const [submit, setSubmit] = useState([{

        location: "",
        address: "",
        clock: dayjs(),
        memo: "",
        city: ""

    }])
    const finishOne = useRef(false);
    const [title, setTitle] = useState("")
    const [day, setDay] = useState(dayjs())
    const [requiredError, setRequiredError] = useState(false);
    console.log(submit);

    const saveField = (index, location, address, clock, memo, city) => {
        finishOne.current = true;
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



    async function readData() {
        if (action === "add") {
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
        } else {

            db.collection("user_info/DlXAEufxhTCF0L2SvK39/travels/" + id + "/spots")
                .onSnapshot((snapshot) => {
                    const data = snapshot.docs.map((doc) => ({
                        city: doc.data().city,
                        location: doc.data().location,
                        address: doc.data().address,
                        clock: dayjs.unix(doc.data().clock),
                        memo: doc.data().memo
                    }
                    )
                    );
                    console.log("All locations:", data);
                    setSubmit(data);

                })
            db.collection("user_info/DlXAEufxhTCF0L2SvK39/travels").doc(id).onSnapshot((snapshot) => {
                setTitle(snapshot.data().title)
                console.log(dayjs.unix(snapshot.data().day.seconds))
                setDay(dayjs.unix(snapshot.data().day.seconds))
            })
        }
    }


    useEffect(() => {
        finishOne.current = false;
        readData();
        // console.log("open")


        // }])
    }, [open])



    async function saveToDB() {
        if (title === "") {
            setRequiredError(true)
        } else {

            try {
                const docRef = await addDoc(collection(db, "user_info/DlXAEufxhTCF0L2SvK39/travels"), {
                    title: title,
                    day: day.format("YYYY-MM-DD"),
                    progress: "arrangement"
                });

                console.log(finishOne.current)
                if (finishOne.current) {
                    submit.forEach((element, index) => {
                        addDoc(collection(db, "user_info/DlXAEufxhTCF0L2SvK39/travels/" + docRef.id + "/spots"), {
                            order: index + 1,
                            location: element.location,
                            address: element.address,
                            clock: element.clock.format("HH:mm"),
                            memo: element.memo,
                            city: element.city,
                        });
                    });
                }
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
                <DialogContent>
                    {/* name */}
                    <Box className={classes.boxContainer}>
                        <div className="vl"></div>
                        <span className="font-link" style={{ fontSize: 20, marginLeft: 10 }}>
                            為你的旅遊取個名字吧!
                        </span>
                    </Box>
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
                    {/* time */}
                    <Box className={classes.boxContainer}>
                        <div className="vl"></div>
                        <span className="font-link" style={{ fontSize: 20, marginLeft: 10 }}>
                            何時旅遊?
                        </span>
                    </Box>
                    <DatePicker setDay={setDay} day={day} />
                    {/* where */}
                    <Box className={classes.boxSpaceBetween}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div className="vl"></div>
                            <span className="font-link" style={{ fontSize: 20, marginLeft: 10 }}>
                                想去哪裡?
                            </span>
                        </div>
                        <Button color="primary"
                            onClick={addField}
                        ><span className="font-link" style={{ fontSize: 14 }}>
                                新增景點
                            </span>
                            <AddIcon style={{ fontSize: 15 }} />
                        </Button>
                    </Box>
                    {submit.map((i, index) => (
                        <Fields data={i} saveField={saveField} deleteField={deleteField} key={index} index={index} />
                    ))}
                </DialogContent>
            </Dialog>
        </div >

    );
}
function areEqual(prevProps, nextProps) {
    if (
        prevProps.open !== nextProps.open
    ) {
        console.log("render");
        return false;
    }
    // console.log(true);
    return true;
}


export default React.memo(AddArrangement, areEqual)