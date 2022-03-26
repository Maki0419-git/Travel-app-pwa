import { useState, useEffect, useRef } from 'react'
import TravelDetail from "./TravelDetail";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { updateTravel, uploadToStorage } from '../../utils/firebaseFunc';

const useStyles = makeStyles((theme) => ({

    root: {
        margin: 100,
        marginTop: 20,
        [theme.breakpoints.down('md')]: {
            margin: 80,
        },
        [theme.breakpoints.down('sm')]: {
            margin: 20,
        },
    },
    media: {
        paddingTop: '56.25%', // 16:9
        backgroundImage: ({ index }) => `linear-gradient(rgba(0,0,0, 0.25), rgba(0,0,0, 0.55)),url(${process.env.PUBLIC_URL}/img/landscape/${index}.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
    },
    mediaTextContainer: {
        position: 'absolute',
        bottom: 0,
        display: "flex",
        width: '97%',
        justifyContent: "space-between"
    },
    mediaTitle: {
        color: 'white',
        [theme.breakpoints.down('md')]: {
            fontSize: 25
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 20
        },
    },
    mediaDate: {
        color: 'white',
        [theme.breakpoints.down('md')]: {
            fontSize: 15
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 10
        },
        marginLeft: 4
    },
    mediaMore: {
        position: 'absolute',
        top: 4,
        right: 2,
        color: 'white',
    },
    memory: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 24,
        alignItems: 'flex-start'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function changeDay(d) {
    switch (d) {
        case "0":
            return "日"

        case "1":
            return "一"

        case "2":
            return "二"

        case "3":
            return "三"

        case "4":
            return "四"

        case "5":
            return "五"

        case "6":
            return "六"

        default:

            return "一"

    }
}

const TravelCard = ({ index, record }) => {
    const [expanded, setExpanded] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [memory, setMemory] = useState("");
    const [edit, setEdit] = useState(false);
    const inputRef = useRef(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const saveToDB = async () => {
        try {
            await updateTravel("DlXAEufxhTCF0L2SvK39", record.id, { memory });
            setEdit(false);
        } catch (e) {
            console.log(e)
            alert('Error updating travel record')
        }
    }

    const changeCover = async (e) => {
        console.log(e.target.files)
        if (e.target.files && e.target.files.length > 0) {
            try {
                await uploadToStorage("travel_cover", record.id, Object.values(e.target.files));
                handleClose();
            } catch (e) {
                alert(e);
                console.log(e)
            }
        }
    }

    const classes = useStyles({ index });
    useEffect(() => {
        setMemory(record.memory)
    }, [record])
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                // image={`${process.env.PUBLIC_URL}/img/landscape/1.jpg`}
                title="Paella dish"
            >
                <MoreVertIcon className={classes.mediaMore} fontSize="large" onClick={handleClick} />
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => inputRef.current.click()}>編輯首圖</MenuItem>
                    <input type="file" accept="image/x-png,image/jpeg" ref={inputRef}
                        onChange={(e) => changeCover(e)}
                        id="file"
                        style={{ display: "none" }}
                    />
                    <MenuItem onClick={handleClose}>刪除此旅遊紀錄</MenuItem>
                </Menu>
                <CardContent className={classes.mediaTextContainer}>
                    <Box>
                        <Typography variant="h2" component="p" className={classes.mediaTitle}>
                            {record.title}
                        </Typography>
                        <Typography variant="h6" component="p" className={classes.mediaDate}>
                            {record.day.format("YYYY 年 M 月 D 日 ") + `(${changeDay(record.day.format("d"))})`}
                        </Typography>
                    </Box>
                    <ArrowRightAltIcon className="float-arrow" fontSize="large" style={{ fontSize: 50 }} />
                </CardContent>
            </CardMedia>
            <CardContent className={classes.memory}>
                {edit ?
                    <TextField id="standard-basic" label="留下你獨一無二的回憶!" multiline fullWidth value={memory} onChange={(e) => setMemory(e.target.value)} /> :
                    <Typography variant="body1" component="p" color="textSecondary">{memory ? memory : "留下你獨一無二的回憶!"}</Typography>}
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    {edit && <SaveIcon fontSize="small" style={{ margin: 2, cursor: "pointer" }} onClick={saveToDB} />}
                    <EditIcon fontSize="small" style={{ margin: 2, cursor: "pointer" }} onClick={() => setEdit(true)} />
                </Box>
            </CardContent>
            <CardActions disableSpacing>
                <Button color="primary" startIcon={<PhotoLibraryIcon />} style={{ paddingLeft: 24 }}>更多旅遊照片</Button>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <TravelDetail />
            </Collapse>
        </Card>
    )
}

export default TravelCard
