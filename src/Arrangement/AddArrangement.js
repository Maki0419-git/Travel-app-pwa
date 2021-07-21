import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddIcon from '@material-ui/icons/Add';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DescriptionIcon from '@material-ui/icons/Description';
import { DatePicker, TimePicker } from "./DateSelection"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import dayjs from 'dayjs'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,


    },
}));


const Alert = ({ error }) => {
    return (
        <Snackbar open={error} autoHideDuration={6000} >
            <MuiAlert severity="error" elevation={6} variant="filled">This is a warning message!</MuiAlert>
        </Snackbar>
    )
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const Fields = ({ data, saveField, deleteField, index }) => {

    const [location, setLoaction] = useState("");
    const [address, setAddress] = useState("");
    const [memo, setMemo] = useState("");
    const [time, setTime] = useState(dayjs());
    const [isSaved, setIsSaved] = useState(false);
    const [ifError, setIfError] = useState(false);

    useEffect(() => {
        setLoaction(data.location)
        setAddress(data.address)
        setTime(data.time)
    }, [data])

    const classes = useStyles();

    return (
        <div style={{ flexDirection: "column", width: "100%", marginTop: 10 }}>
            <Grid container >
                <Grid item xs={10} style={{ paddingTop: 10 }}>
                    <Typography variant="h6" className={classes.title} color="primary">
                        <span className="font-link" style={{ fontSize: 20, }}>
                            第 {index + 1} 站
                        </span>
                    </Typography>
                </Grid>
                {isSaved &&
                    <>

                        <Grid item xs={1} sm={4}>
                            <IconButton
                                onClick={() => { setIsSaved(false) }}
                            ><EditIcon /></IconButton>
                        </Grid>
                    </>
                }
            </Grid>

            <Divider />
            <form autoComplete="off" onSubmit={(event) => event.preventDefault()} style={{ width: "100%", flexDirection: "column", marginTop: 15 }} >
                <div style={{ marginTop: 8, marginBottom: 15, }}>
                    <TextField
                        required
                        error={ifError}
                        label={<span className="font-link" style={{ fontSize: 20 }}>
                            景點
                        </span>}

                        value={location || ''}
                        variant="outlined"
                        onChange={(event) => setLoaction(event.target.value)}

                        style={{ width: "100%" }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end" style={{ paddingRight: 10 }}>
                                <LocalFloristIcon />
                            </InputAdornment>,
                            readOnly: isSaved,
                        }}


                    />
                </div>
                <div style={{ marginTop: 8, marginBottom: 15, }}>
                    <TextField


                        label={<span className="font-link" style={{ fontSize: 20 }}>
                            地址
                        </span>}

                        value={address || ''}
                        variant="outlined"
                        onChange={(event) => setAddress(event.target.value)}
                        style={{ width: "100%" }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end" style={{ paddingRight: 10 }}>
                                <LocationOnIcon />
                            </InputAdornment>,
                            readOnly: isSaved,
                        }}


                    />
                </div>
                <div style={{ marginTop: 8, marginBottom: 15, }}>
                    <TimePicker time={time} setTime={setTime} isSaved={isSaved} />
                </div>
                <div style={{ marginTop: 8, marginBottom: 15, }}>
                    <TextField


                        label={<span className="font-link" style={{ fontSize: 20 }}>
                            備註
                        </span>}

                        value={memo || ''}
                        variant="outlined"
                        onChange={(event) => setMemo(event.target.value)}
                        style={{ width: "100%" }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end" style={{ paddingRight: 10 }}>
                                <DescriptionIcon />
                            </InputAdornment>,
                            readOnly: isSaved,
                        }}
                        multiline
                        rows={3}


                    />
                </div>
                {isSaved === false &&
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Button variant="outlined" color="primary"
                                style={{ marginTop: 10, width: "100%" }}
                                onClick={() => { deleteField(index) }}
                            >
                                刪除
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="outlined" color="primary"
                                style={{ marginTop: 10, width: "100%" }}
                                onClick={() => {
                                    if (location === "") {
                                        setIfError(true)
                                    } else { saveField(index, location, address, time, memo); setIsSaved(true); setIfError(false) }
                                }}
                                type="submit"
                            >
                                儲存
                            </Button>
                        </Grid>
                    </Grid>

                }
                {/* <Alert error={ifError} /> */}
            </form>

        </div>
    )
}


export default function AddArrangement({ open, handleClose }) {
    const classes = useStyles();
    const [submit, setSubmit] = useState([{

        location: "",
        address: "",
        time: new Date(),
        memo: ""

    }])
    const [name, setName] = useState("")
    const [fieldCount, setFieldCount] = useState(1);
    console.log(submit);

    const saveField = (index, location, address, time, memo) => {
        const copySub = [...submit];
        copySub[index] = { location: location, address: address, time: time, memo: memo }
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
            ...prev, {
                [(submit.length + 1).toString()]: {
                    location: "",
                    address: "",
                    time: "",
                    memo: ""
                }
            }]))
    }


    useEffect(() => {
        console.log("open")
        setSubmit([{

            location: "",
            address: "",
            time: new Date(),
            memo: ""

        }])
    }, [open])

    return (

        <div>
            {/* {console.log(submit["1"])}
            {console.log(submit["2"])}

            {console.log("a:" + arrangements)} */}
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
                        <Button autoFocus color="inherit" edge="end" onClick={handleClose}>
                            完成
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingLeft: 15 }}>
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


                            label={<span className="font-link" style={{ fontSize: 20 }}>
                                命名
                            </span>}

                            value={name}
                            variant="outlined"
                            onChange={(event) => setName(event.target.value)}
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
                        <DatePicker />
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