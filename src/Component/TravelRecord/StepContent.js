import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import PrevDialog from "./PrevDialog"

const defaultProps = {
    bgcolor: 'background.paper',
    borderColor: 'primary.main',
    m: 1,
    border: 1,
    // style: { width: '8rem', height: '8rem' },
};

const GetStepContent = () => {
    const [imagePrev, setImagePrev] = useState([]);
    const [imageUpload, setImageUpload] = useState([]);
    const [prevOpen, setPrevOpen] = useState(false)

    const editPhoto = (index) => {
        const copyPrev = [...imagePrev];
        const copyUpload = [...imageUpload];
        copyPrev.splice(index, 1)
        copyUpload.splice(index, 1)
        setImagePrev(copyPrev);
        setImageUpload(copyUpload);
    }

    const handleClose = () => {
        setPrevOpen(false)
    }
    const handleUpload = function (e) {

        // console.log(e.target.files[0]);
        const filesArray = Array.from(e.target.files)
        // .map((file) =>
        //     file.name
        // );
        const url = filesArray
            .map((file) =>
                ({ label: "", imgPath: URL.createObjectURL(file) })
            );
        // console.log(filesArray);
        setImagePrev(prev => [...prev, ...url])
        setImageUpload((prev) => [...prev, ...filesArray])
        setPrevOpen(true)
        Array.from(e.target.files).map(
            (file) => URL.revokeObjectURL(file) // avoid memory leak
        );

    }
    console.log(imagePrev)
    // if (imagePrev.length !== 0) {
    //     return (
    //         <div>
    //             <ImageListComponent data={imagePrev} />
    //             <Box display="flex" flexDirection="row-reverse" m={1} >
    //                 <Box  >
    //                     <IconButton style={{ padding: 3 }}>
    //                         <AddPhotoAlternateIcon />
    //                     </IconButton>
    //                 </Box>
    //                 <Box  >
    //                     <IconButton style={{ padding: 3 }}>
    //                         <CloudUploadIcon />
    //                     </IconButton>
    //                 </Box>

    //             </Box>
    //         </div>
    //     )
    // } else {
    return (
        <Box borderRadius={16} {...defaultProps} style={{
            flex: 1, display: "flex", flexDirection: "column",
            pt: 50, pb: 50, pl: 100, pr: 100
        }}>
            <input type="file" accept="image/x-png,image/jpeg" onChange={handleUpload}
                id="file"
                style={{ display: "none" }}
                multiple
            />
            <IconButton >
                <label htmlFor="file" >
                    <AddPhotoAlternateIcon fontSize="large" />
                </label>
            </IconButton>
            <span className="font-link" style={{ fontSize: 15 }}>
                為你的旅程添加相片!
            </span>
            <PrevDialog open={prevOpen} handleClose={handleClose} imagePrev={imagePrev}
                imageUpload={imageUpload}
                editPhoto={editPhoto}
                handleUpload={handleUpload}
            />
        </Box>
    )

}

export default GetStepContent;