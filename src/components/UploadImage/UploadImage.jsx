import { getImageUrl } from "@/service/uploadImages/imgBB";
import { useState } from "react";

export const UploadImage = (saveImage) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        getImageUrl(event.target.files[0]);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {/* {selectedFile && <p>Selected file: {selectedFile}</p>} */}
        </div>
    );
}