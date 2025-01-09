import React, { useState, useEffect } from "react";
import { FaUpload } from 'react-icons/fa';

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    const [images, setImages] = useState([]);
    // console.log("okokoko",images);
    
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };
    const handleIconClick = () => {
        document.getElementById('file-input').click(); // Trigger the file input click when icon is clicked
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            setMessage("Please select an image to upload!");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await fetch("https://crud-with-multer.vercel.app/api/images/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Upload successful! File name: ${data.name}`);
                fetchImages(); // Refresh the list of images
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.error}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    // Fetch all images
    const fetchImages = async () => {
        try {
            // http://localhost:5000/api/images
            const response = await fetch("https://crud-with-multer.vercel.app/api/images");
            const data = await response.json();
            setImages(data);
        } catch (error) {
            setMessage(`Error fetching images: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://crud-with-multer.vercel.app/api/images/delete/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setMessage("Image deleted successfully!");
                fetchImages(); // Refresh the list of images
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    // const handleUpdate = async (id, updatedData) => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/api/images/update/${id}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(updatedData),
    //         });
    //         if (response.ok) {
    //             setMessage("Image updated successfully!");
    //             fetchImages(); // Refresh the list
    //         } else {
    //             setMessage("Error updating image");
    //         }
    //     } catch (error) {
    //         setMessage(`Error: ${error.message}`);
    //     }
    // };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Image Upload</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {/* -------------------------- */}
            {/* <div style={{display:'flex', justifyContent:"center", alignItems:"center"}}>
                <FaUpload
                    style={{ fontSize: '24px', cursor: 'pointer' }}
                    onClick={handleIconClick}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="file-input"
                    style={{ display: 'none' }}
                />
                <button onClick={handleSubmit} style={{ marginLeft: 10 }}>Upload</button>
            </div> */}
            {/* ------------------ */}
            <h3>All Images</h3>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
                {images.map((img) => (
                    <div key={img._id}>
                        {/* {console.log('yes - ',img.filePath)} */}
                        <img
                            src={`https://crud-with-multer.vercel.app/${img.filePath}`}
                            alt={img.name}
                            style={{ width: "250px", height: "200px" }}
                        />
                        <div>
                            <button onClick={() => handleDelete(img._id)} style={{}}>Remove</button>
                            {/* <button onClick={() => handleUpdate(img._id, { name: "Updated Image" })}>Update</button> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUpload;
