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
import AddIcon from '@material-ui/icons/Add';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { DatePicker } from "./DateSelection"
import dayjs from 'dayjs';
import { getSpots, addSpots, deleteSpots, addArrangement } from '../../utils/firebaseFunc';
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


function EditArrangement({ open, handleClose, id, action, main }) {
    const classes = useStyles();
    const [submit, setSubmit] = useState([{
        location: "",
        address: "",
        clock: dayjs().format("H:m"),
        memo: "",
        city: "",
        save: false

    }])
    const [title, setTitle] = useState("")
    const [day, setDay] = useState(dayjs())
    const [requiredError, setRequiredError] = useState(false);
    const saveField = (index, location, address, clock, memo, city) => {
        const copySub = [...submit];
        copySub[index] = { location, address, clock, memo, city, save: true }
        setSubmit(copySub);
    }


    const deleteField = (index) => {
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
                clock: dayjs().format("H:m"),
                memo: "",
                city: "",
                save: false
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
                clock: dayjs().format("H:m"),
                memo: "",
                city: "",
                save: false
            }])
        } else {
            const spots = await getSpots("DlXAEufxhTCF0L2SvK39", id);
            setSubmit(spots)
            setTitle(main.title)
            setDay(main.day.format("YYYY/MM/DD"))
        }
    }


    useEffect(() => {

        readData();
    }, [open])



    async function saveToDB() {
        if (title === "") {
            setRequiredError(true)
        }
        else if (submit.some((filed) => filed.save === false)) {
            alert("您有行程尚未儲存")
        }
        else {
            if (action === "add") {
                try {
                    const travelID = await addArrangement("DlXAEufxhTCF0L2SvK39",
                        {
                            title: title,
                            day: day.format("YYYY-MM-DD"),
                            progress: "arrangement"
                        });
                    await addSpots("DlXAEufxhTCF0L2SvK39", travelID, submit);
                } catch (e) { console.log(e) }
            } else if (action === "edit") {
                try {
                    await deleteSpots("DlXAEufxhTCF0L2SvK39", id);
                    await addSpots("DlXAEufxhTCF0L2SvK39", id, submit)
                } catch (e) { console.log(e) }
            }
            handleClose();
        }
    }

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
                        <Fields
                            data={i}
                            saveField={saveField}
                            deleteField={deleteField}
                            key={index}
                            index={index}
                            action={action}
                        />
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


export default React.memo(EditArrangement, areEqual)