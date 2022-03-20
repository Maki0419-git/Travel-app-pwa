
import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../Config/firebase";
import NavBar from "../NavBar";
import ImageLoading from "../ImageLoading";
import PhotoDetail from "./PhotoDetail";
import Skeleton from "./Skeleton";

const useStyles = makeStyles((theme) => ({
    container: {
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,

    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        padding: 10
    },
    imageList: {
        width: "100%",
        height: "100%",
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

const col = () => (Math.floor(Math.random() * 10)) % 2 + 1

const colCaculating = (length) => {
    const result = new Array(length).fill(0).reduce((acc, item, index) => {
        console.log(acc)
        if (!index) {
            acc.push([col()]);
            return acc
        } else {
            //get last row
            let lastRow = acc[acc.length - 1];
            //未滿一行
            if (lastRow.reduce((acc, num) => acc + num) < 3) {
                let newCol = col();
                while (lastRow.reduce((acc, num) => acc + num) + newCol > 3) {
                    newCol = col()
                }
                acc[acc.length - 1].push(newCol)
                return acc
            } else {
                let newCol = col();
                acc.push([newCol])
                return acc
            }
        }
    }, [])
    return result.join().split(',')
}

const waitForEach = async (array, callback) => {
    for (let i = 0; i < array.length; i++) {
        await callback(array[i], i)
    }
}

export default function RecentPhoto() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const colResult = useRef([]);
    const [detailShow, setDetailShow] = useState(false);
    const [imageDetail, setImageDetail] = useState({
        img: '',
        title: '',
        author: '',
        time: "",
        content: "",
    })

    function openDialog(item) {
        setDetailShow(true)
        setImageDetail({
            img: item.img,
            title: item.title,
            author: item.author,
            time: item.time,
            content: item.content,
        })
    }

    function closeDialog(item) {


        setDetailShow(false)
    }
    const classes = useStyles();

    const getImage = async () => {
        setLoading(true)
        let lists;
        try {
            // Create a reference under which you want to list
            const imgRef = ref(storage, 'Covers');
            lists = await listAll(imgRef);

        } catch (error) {
            console.log(error);

        }
        colResult.current = colCaculating(lists.items.length);

        setImages(colResult.current.map(i => ({ src: "", col: i })))
        let newImages = [];
        try {
            await waitForEach(lists.items, async (itemRef, index) => {
                const downloadURL = await getDownloadURL(itemRef);
                newImages.push({ src: downloadURL, col: Number(colResult.current[newImages.length]) })

            })
        } catch (error) {
            console.log(error);
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }
        }
        setImages(newImages)
        setLoading(false)
    }




    useEffect(() => getImage(), [])
    console.log(images)

    return (
        <div className={classes.container}>
            <NavBar />
            {/* <div className={classes.root}> */}

            <ImageList rowHeight={200} className={classes.imageList} cols={3}>
                {images.map((item, index) => (
                    <ImageListItem key={index} cols={item.col || 1}>
                        {loading ? <Skeleton colResult={colResult.current} /> :
                            <>
                                <ImageLoading src={item.src} />
                                <ImageListItemBar
                                    title={"test"}
                                    subtitle={<span>by: {"test"}</span>}
                                    actionIcon={
                                        <IconButton
                                            aria-label={`info about test`}
                                            className={classes.icon}
                                        // onClick={() => openDialog(item)}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </>}
                    </ImageListItem>

                ))}
            </ImageList>

            {/* </div> */}
            {/* <PhotoDetail detailShow={detailShow} closeDialog={closeDialog} imageDetail={imageDetail} /> */}
        </div>
    );
}