
import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';

import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { TimePicker } from "./DateSelection"
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import DescriptionIcon from '@material-ui/icons/Description';
import dayjs from 'dayjs'
import Select from '@material-ui/core/Select';
import { availableLocations } from "../CityCountyData";
const Fields = ({ data, saveField, deleteField, index }) => {

    const [location, setLoaction] = useState("");
    const [address, setAddress] = useState("");
    const [memo, setMemo] = useState("");
    const [clock, setTime] = useState(dayjs());
    const [city, setCity] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [ifError, setIfError] = useState(false);

    useEffect(() => {
        setLoaction(data.location)
        setAddress(data.address)
        setTime(data.clock)
        setMemo(data.memo)
        setCity(data.city)
    }, [data])



    return (
        <div style={{ flexDirection: "column", width: "100%", marginTop: 10 }}>
            <Grid container >
                <Grid item xs={10} style={{ paddingTop: 10 }}>
                    <Typography variant="h6" color="primary">
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
                    <InputLabel id="demo-simple-select-label"><span className="font-link" style={{ fontSize: 14, }}>縣市</span></InputLabel>
                    <Select
                        required
                        error={ifError}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={city || ''}
                        onChange={(event) => setCity(event.target.value)}
                        style={{ width: "100%" }}
                        inputProps={{
                            readOnly: isSaved,
                        }}
                    >
                        {availableLocations.map((i) => (
                            <MenuItem value={i.cityName}><span className="font-link" style={{ fontSize: 16, }}>{i.cityName}</span></MenuItem>
                        ))}
                    </Select>
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
                    <TimePicker clock={clock} setTime={setTime} isSaved={isSaved} />
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
                                    if (location && city !== "") {
                                        saveField(index, location, address, clock, memo, city); setIsSaved(true); setIfError(false)

                                    } else { setIfError(true) }
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

export default Fields;