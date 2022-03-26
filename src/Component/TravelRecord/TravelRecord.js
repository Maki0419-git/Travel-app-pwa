import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TravelCard from './TravelCard';
import NavBar from "../NavBar";
import '../../styles.css';
import { getTravelRecord } from '../../utils/firebaseFunc';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        display: "flex",
        flex: 1,
        flexDirection: "column",

    },

}));

export default function TravelRecord() {
    const [records, setRecords] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        getTravelRecord("DlXAEufxhTCF0L2SvK39", setRecords)
    }, [])
    return (
        <div className={classes.container}>
            <NavBar />
            <div>
                {records.map((record, index) =>
                    <TravelCard index={index} record={record} />
                )}
            </div>

        </div>
    );
}
