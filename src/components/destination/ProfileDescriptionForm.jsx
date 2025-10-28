import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/api";
import { toast } from "react-toastify";
import { TextField, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FormInput from "../common/FormInput";

const ProfileDescriptionForm = ({ initialProfile = {}, onChange }) => {
    const [profileDescription, setProfileDescription] = useState({
        ProfilePicture: initialProfile?.ProfilePicture || "",
        PictureGallery: initialProfile?.PictureGallery || [null],
        VideoGallery: initialProfile?.VideoGallery || [null],
        ProductVideoUrl: initialProfile?.ProductVideoUrl || [""],
        ShortDescription: initialProfile?.ShortDescription || "",
        LongDescription: initialProfile?.LongDescription || "",
    });

    // Sync changes to parent
    useEffect(() => {
        onChange(profileDescription);
    }, [profileDescription]);

    // ✅ Handle text field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileDescription((prev) => ({ ...prev, [name]: value }));
    };
    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        const fieldName = e.target.name; // <--- detect which input triggered it
        if (!file) return alert("Please select a file first");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(
                `${BASE_URL}/api/v1/common/AddImage`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response?.data?.response?.response_code === "200") {
                const fileUrl = response.data?.data[0]?.full_URL || "";
                setProfileDescription((prev) => ({
                    ...prev,
                    [fieldName]: fileUrl
                }))
            } else {
                toast.error(
                    response?.data?.response?.response_message || "File upload failed"
                );
            }
        } catch (error) {
            console.error("File upload failed:", error);
            toast.error("Error uploading file");
        }
    };
    // ✅ File upload (image/video)
    const handleFileUpload = async (e, key, index = null) => {
        const file = e.target.files[0];
        if (!file) return toast.error("Please select a file first");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(`${BASE_URL}/api/v1/common/AddImage`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response?.data?.response?.response_code === "200") {
                const fileUrl = response.data?.data[0]?.full_URL || "";
                setProfileDescription((prev) => {
                    const updated = [...prev[key]];
                    if (index !== null) updated[index] = fileUrl;
                    else updated.push(fileUrl);
                    return { ...prev, [key]: updated };
                });
                toast.success("File uploaded successfully");
            } else {
                toast.error(response?.data?.response?.response_message || "File upload failed");
            }
        } catch (error) {
            console.error("File upload failed:", error);
            toast.error("Error uploading file");
        }
    };

    // ✅ Remove file
    const handleRemoveFile = (key, index) => {
        setProfileDescription((prev) => {
            const updated = [...prev[key]];
            updated.splice(index, 1);
            return { ...prev, [key]: updated };
        });
    };

    // ✅ Add new video URL field
    const handleAddUrlField = () => {
        setProfileDescription((prev) => ({
            ...prev,
            ProductVideoUrl: [...prev.ProductVideoUrl, ""],
        }));
    };

    // ✅ Remove specific URL field
    const handleRemoveUrlField = (index) => {
        setProfileDescription((prev) => ({
            ...prev,
            ProductVideoUrl: prev.ProductVideoUrl.filter((_, i) => i !== index),
        }));
    };

    return (
        <>
            <div className="flex flex-col gap-2 mb-2">
                <label htmlFor="ProfilePicture" className="text-base font-semibold">
                    Profile Picture
                </label>
                <TextField

                    id="ProfilePicture"
                    name="ProfilePicture"
                    placeholder="Upload an image"
                    size="small"
                    type="file"
                    className="custom-input"
                    onChange={handleLogoUpload}
                    inputProps={{ accept: "image/*" }}
                    sx={{ "& .MuiInputBase-input": { padding: "8px 12px", height: "auto", }, }}
                />
                {profileDescription?.ProfilePicture && (
                    <div className="mt-2">
                        <img
                            src={profileDescription?.ProfilePicture}
                            alt="Logo Preview"
                            className="w-32 h-32 object-cover border rounded-md"
                        />
                    </div>
                )}
            </div>

            {/* 🖼 Picture Gallery */}
            <div>
                <label className="font-semibold">Picture Gallery</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileDescription.PictureGallery.map((img, index) => (
                        <div key={index} className="relative rounded-md py-2">
                            {!img ? (
                                <div className="flex items-center gap-2">
                                    <TextField
                                        size="small"
                                        type="file"
                                        fullWidth
                                        inputProps={{ accept: "image/*" }}
                                        onChange={(e) => handleFileUpload(e, "PictureGallery", index)}
                                        className="custom-input"
                                        sx={{ "& .MuiInputBase-input": { padding: "8px 12px", height: "auto", }, }}
                                    />
                                    {profileDescription.PictureGallery.length > 1 && (
                                        <IconButton
                                            color="error"
                                            size="small"
                                            onClick={() => handleRemoveFile("PictureGallery", index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <img
                                        src={img}
                                        alt={`gallery-${index}`}
                                        className="w-full h-32 object-contain rounded mb-2 border"
                                    />
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <Button
                    variant="contained"
                    size="small"
                    color="success"
                    onClick={() =>
                        setProfileDescription((prev) => ({
                            ...prev,
                            PictureGallery: [...prev.PictureGallery, null],
                        }))
                    }
                >
                    + Add More
                </Button>
            </div>

            {/* 🎥 Video Gallery */}
            <div className="mt-4">
                <label className="font-semibold">Video Gallery</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileDescription.VideoGallery.map((video, index) => (
                        <div key={index} className="relative rounded-md py-2">
                            {!video ? (
                                <div className="flex items-center gap-2">
                                    <TextField
                                        size="small"
                                        fullWidth
                                        type="file"
                                        inputProps={{ accept: "video/*" }}
                                        className="custom-input"
                                        sx={{ "& .MuiInputBase-input": { padding: "8px 12px", height: "auto", }, }}
                                        onChange={(e) => handleFileUpload(e, "VideoGallery", index)}
                                    />
                                    {profileDescription.VideoGallery.length > 1 && (
                                        <IconButton
                                            color="error"
                                            size="small"
                                            onClick={() => handleRemoveFile("VideoGallery", index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <video
                                        controls
                                        className="w-full h-32 object-contain rounded mb-2 border"
                                    >
                                        <source src={video} type="video/mp4" />
                                    </video>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <Button
                    variant="contained"
                    size="small"
                    color="success"
                    onClick={() =>
                        setProfileDescription((prev) => ({
                            ...prev,
                            VideoGallery: [...prev.VideoGallery, null],
                        }))
                    }
                >
                    + Add More
                </Button>
            </div>

            {/* 🔗 Product Video URL */}
            <div className="mt-4">
                <label className="font-semibold">Product Video URL</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {profileDescription.ProductVideoUrl.map((url, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <FormInput
                                name={`ProductVideoUrl[${index}]`}
                                placeholder="Enter video URL"
                                value={url}
                                onChange={(e) => {
                                    const updated = [...profileDescription.ProductVideoUrl];
                                    updated[index] = e.target.value;
                                    setProfileDescription((prev) => ({
                                        ...prev,
                                        ProductVideoUrl: updated,
                                    }));
                                }}
                            />
                            {profileDescription.ProductVideoUrl.length > 1 && (
                                <IconButton
                                    color="error"
                                    size="small"
                                    onClick={() => handleRemoveUrlField(index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </div>
                    ))}
                </div>

                <Button
                    variant="contained"
                    size="small"
                    color="success"
                    onClick={handleAddUrlField}
                >
                    + Add More
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-2">
                <FormInput
                    label="Short Description"
                    name="ShortDescription"
                    placeholder="Enter Short Description"
                    multiline
                    rows={3}
                    value={profileDescription.ShortDescription}
                    onChange={handleChange}
                />
                <FormInput
                    label="Long Description"
                    name="LongDescription"
                    placeholder="Enter Long Description"
                    multiline
                    rows={3}
                    value={profileDescription.LongDescription}
                    onChange={handleChange}
                />
            </div>
        </>
    );
};

export default ProfileDescriptionForm;
