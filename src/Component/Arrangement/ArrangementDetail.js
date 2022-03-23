
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import DescriptionIcon from '@material-ui/icons/Description';
import TextField from '@material-ui/core/TextField';
import { getSpots } from '../../utils/firebaseFunc';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '95%',
        paddingLeft: 5,
    },
    step: {
        '&.MuiStepper-root': {
            paddingTop: 10
        }
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
    icon: {
        margin: 10,
    },
    span: {
        fontSize: 16,
        fontWeight: 300,
        fontFamily: 'Noto Serif TC'
    },
    alert: {
        width: '100%',
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
}));


function GetStepContent({ details }) {
    const classes = useStyles();
    return (
        <div style={{ width: '100%', }}>

            <Box display="flex" alignItems="center">
                <LocationOnIcon className={classes.icon} color="disabled" fontSize="medium" />
                <span className={classes.span}>
                    {details.address}
                </span>
            </Box>
            <Box display="flex" alignItems="center" >
                <WatchLaterIcon className={classes.icon} color="disabled" fontSize="medium" />
                <span className={classes.span}>
                    {details.clock}
                </span>
            </Box>
            <Box display="flex" alignItems="flex-start" >
                <DescriptionIcon className={classes.icon} color="disabled" fontSize="medium" />
                <TextField
                    value={details.memo}
                    variant="outlined"
                    style={{ width: "100%", }}
                    InputProps={{
                        readOnly: true,
                        className: classes.span
                    }}
                    multiline
                    minRows={3}
                />
            </Box>

        </div>
    )

}


export default function ArrangementDetail({ id }) {
    const [spots, setSpots] = useState([]);
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

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

            const spots = await getSpots("DlXAEufxhTCF0L2SvK39", id);
            setSpots(spots);

        } catch (e) { console.log(e) }
    }

    console.log(spots)
    useEffect(() => readData(), [])
    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical" className={classes.step}>
                {spots.map((spot, index) => (
                    <Step key={index}>
                        <StepLabel>
                            <span className="font-link" style={{ fontSize: 20, fontWeight: 500 }}>
                                {spot.location}
                            </span>
                        </StepLabel>
                        <StepContent>
                            <GetStepContent details={spot} />
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        上一站
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === spots.length - 1 ? '結束' : '下一站'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === spots.length && (
                <Alert
                    className={classes.alert}
                    action={
                        <Button color="inherit" size="small" onClick={handleReset}>
                            從頭開始看
                        </Button>
                    }
                >
                    您的旅程已結束!
                </Alert>
            )}
        </div>
    );
}
