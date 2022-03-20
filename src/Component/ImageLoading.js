
import { useState, useEffect } from 'react'

const ImageLoading = ({ src }) => {
    const [url, setURL] = useState(`${process.env.PUBLIC_URL}/Loading.png`);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setURL(src);
    }, [src])

    return <img src={url} alt="no img" style={{ objectFit: "cover", width: "100%", height: "100%" }} loading="lazy" />

}

export default ImageLoading
