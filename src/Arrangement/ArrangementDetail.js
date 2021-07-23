import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import DescriptionIcon from '@material-ui/icons/Description';
import TextField from '@material-ui/core/TextField';
import "../styles.css";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Config } from '../firebase';
import dayjs from 'dayjs';

if (!firebase.apps.length) {

    firebase.initializeApp(Config);

}
let db = firebase.firestore();

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },

});

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;

    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


function getSteps() {
    return [<span className="font-link" style={{ fontSize: 20, fontWeight: 500 }}>
        台中美術館
    </span>, 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
    return (
        <div style={{ width: '100%', }}>

            <Box display="flex" justifyContent="flex-start" >
                <Box >
                    <LocationOnIcon fontSize="small" style={{ margin: 3 }} color="disabled" />
                </Box>
                <Box >
                    <span className="font-link" style={{ fontSize: 14, fontWeight: 300 }}>
                        台中市123256
                    </span>
                </Box>

            </Box>
            <Box display="flex" justifyContent="flex-start" >
                <Box >
                    <WatchLaterIcon fontSize="small" style={{ margin: 3 }} color="disabled" />
                </Box>
                <Box >
                    <span className="font-link" style={{ fontSize: 14, fontWeight: 300 }}>
                        12:00
                    </span>
                </Box>

            </Box>
            <Box display="flex" justifyContent="flex-start" >
                <Box >
                    <DescriptionIcon fontSize="small" style={{ margin: 3 }} color="disabled" />
                </Box>
                <Box >
                    <TextField




                        value={1234567890}
                        variant="outlined"
                        style={{ width: "100%" }}
                        InputProps={{
                            readOnly: true,
                        }}
                        multiline
                        rows={3}


                    />


                </Box>

            </Box>

        </div>
    )
    // switch (step) {
    //     case 0:
    //         return `For each ad campaign that you create, you can control how much
    //             you're willing to spend on clicks and conversions, which networks
    //             and geographical locations you want your ads to show on, and more.`;
    //     case 1:
    //         return 'An ad group contains one or more ads which target a shared set of keywords.';
    //     case 2:
    //         return `Try out different ad text to see what brings in the most customers,
    //             and learn how to enhance your ads using features like ad extensions.
    //             If you run into any problems with your ads, find out how to tell if
    //             they're running and how to resolve approval issues.`;
    //     default:
    //         return 'Unknown step';
    // }
}

export default function ArrangementDetail({ open, main, selectedID }) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [mainContent, setMainContent] = useState({
        title: main.title,
        day: main.day
    })
    const [detail, setDetail] = useState([]);

    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    async function readData() {
        try {
            db.collection("user_info/DlXAEufxhTCF0L2SvK39/travels/" + selectedID + "/spots")
                .onSnapshot((snapshot) => {
                    const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        location: doc.data().location,
                        address: doc.data().address,
                        clock: doc.data().clock,
                    }
                    )
                    );
                    console.log("All locations:", data);

                    setDetail(data);

                    // setArrangements(data)

                })
        } catch (e) { console.log(e) }
    }


    useEffect(() => { setMainContent({ title: main.title, day: main.day }); readData() }, [selectedID])
    return (
        <div>

            <Dialog
                // onClose={handleClose} 
                aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" style={{ padding: 10 }}
                // onClose={handleClose}
                > <div style={{ width: '60%', }}>
                        <Box display="flex" justifyContent="flex-start" >
                            <Box >
                                <span className="font-link" style={{ fontSize: 24, fontWeight: 500 }}>
                                    {mainContent.title}
                                </span>
                            </Box>

                        </Box>
                        <Box display="flex" justifyContent="flex-start" >
                            <Box >
                                <EventIcon fontSize="small" style={{ paddingTop: 5, margin: 3 }} />
                            </Box>
                            <Box >
                                <span className="font-link" style={{ fontSize: 14, fontWeight: 300 }}>
                                    {mainContent.day}
                                </span>
                            </Box>

                        </Box>

                    </div>

                </DialogTitle>
                <DialogContent dividers style={{ padding: 10 }}>
                    <div className={classes.steproot}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        <Typography>{getStepContent(index)}</Typography>
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    className={classes.button}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleNext}
                                                    className={classes.button}
                                                >
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} className={classes.resetContainer}>
                                <Typography>All steps completed - you&apos;re finished</Typography>
                                <Button onClick={handleReset} className={classes.button}>
                                    Reset
                                </Button>
                            </Paper>
                        )}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus
                        //  onClick={handleClose} 
                        color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}