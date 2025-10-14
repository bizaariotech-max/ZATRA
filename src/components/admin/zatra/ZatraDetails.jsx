import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    TextField,
    Button,
    Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormButton from "../../../components/common/FormButton";
import FormInput from "../../common/FormInput";
import axios from "axios";
import { __postApiData, BASE_URL } from "../../../utils/api";
import { toast } from "react-toastify";

const ZatraDetails = ({ open, onClose, zatraDetails, setZatraDetails, reload }) => {
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            _id: zatraDetails?._id || "",
            PictureGallery: zatraDetails?.PictureGallery || [null],
            VideoGallery: zatraDetails?.VideoGallery || [null],
            ZatraContacts: zatraDetails?.ZatraContacts || [
                { Name: "", PhoneNumber: "", EmailAddress: "" },
            ],
            RegistrationLink: zatraDetails?.RegistrationLink || "",
            Instructions: zatraDetails?.Instructions || "",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            RegistrationLink: Yup.string().url("Invalid link").nullable(),
            Instructions: Yup.string().required("Instructions are required"),
            ZatraContacts: Yup.array().of(
                Yup.object().shape({
                    Name: Yup.string().required("Name is required"),
                    PhoneNumber: Yup.string()
                        .matches(/^[0-9]{10}$/, "Must be a valid 10-digit number")
                        .required("Phone number required"),
                    EmailAddress: Yup.string()
                        .email("Invalid email")
                        .required("Email required"),
                })
            ),
        }),
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const res = await __postApiData("/api/v1/admin/SaveZatra", {
                    ...values,
                    _id: zatraDetails?._id,
                });
                if (res.response && res.response.response_code === "200") {
                    toast.success("Zatra added successfully");
                    onClose();
                    reload();
                } else {
                    toast.error(res.response.response_message || "Failed to add Zatra");
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to submit:", error);
                setIsLoading(false);
            }
        },
    });

    // ✅ Add new contact
    const handleAddContact = () => {
        formik.setFieldValue("ZatraContacts", [
            ...formik.values.ZatraContacts,
            { Name: "", PhoneNumber: "", EmailAddress: "" },
        ]);
    };

    // ✅ File upload (shared for both image & video)
    const handleFileUpload = async (e, key, index = null) => {
        const file = e.target.files[0];
        if (!file) return alert("Please select a file first");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(`${BASE_URL}/api/v1/common/AddImage`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response?.data?.response?.response_code === "200") {
                const fileUrl = response.data?.data[0]?.full_URL || "";
                const updated = [...formik.values[key]];

                if (index !== null) {
                    updated[index] = fileUrl;
                } else {
                    updated.push(fileUrl);
                }
                formik.setFieldValue(key, updated);
            } else {
                toast.error(response?.data?.response?.response_message || "File upload failed");
            }
        } catch (error) {
            console.error("File upload failed:", error);
            toast.error("Error uploading file");
        }
    };

    // ✅ Remove file (for both galleries)
    const handleRemoveFile = (key, index) => {
        const updated = [...formik.values[key]];
        updated.splice(index, 1);
        formik.setFieldValue(key, updated);
    };

    return (
        <Dialog
            open={open}
            onClose={() => {
                onClose();
                setZatraDetails(null);
            }}
            fullWidth
            maxWidth="md"
        >
            <div
                className="flex justify-between items-center px-6 py-3 border-b border-gray-200"
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    backgroundColor: "#fff", // important so it doesn’t overlap content
                }}
            >
                <h2 className="!p-0 text-xl font-bold">
                    Zatra Details
                </h2>
                <IconButton
                    onClick={() => {
                        onClose();
                        setZatraDetails(null);
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </div>

            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4">
                <DialogContent className="space-y-4">
                    {/* 📝 Basic Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            multiline
                            rows={3}
                            label="Instructions"
                            name="Instructions"
                            value={formik.values.Instructions}
                            onChange={formik.handleChange}
                            error={formik.touched.Instructions && Boolean(formik.errors.Instructions)}
                            helperText={formik.touched.Instructions && formik.errors.Instructions}
                        />
                        <FormInput
                            label="Registration Link"
                            name="RegistrationLink"
                            value={formik.values.RegistrationLink}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.RegistrationLink &&
                                Boolean(formik.errors.RegistrationLink)
                            }
                            helperText={
                                formik.touched.RegistrationLink &&
                                formik.errors.RegistrationLink
                            }
                        />
                    </div>

                    {/* 📸 Picture Gallery */}
                    <div className="space-y-4">
                        <label className="font-semibold">Picture Gallery</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {formik.values?.PictureGallery?.map((img, index) => (
                                <div key={index} className="relative rounded-md p-2">
                                    {!img ? (
                                        <TextField
                                            size="small"
                                            type="file"
                                            className="custom-input"
                                            inputProps={{ accept: "image/*" }}
                                            onChange={(e) =>
                                                handleFileUpload(e, "PictureGallery", index)
                                            }
                                        />
                                    ) : (
                                        <>
                                            <img
                                                src={img}
                                                alt={`gallery-${index}`}
                                                className="w-full h-32 object-contain rounded mb-2 border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile("PictureGallery", index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                                            >
                                                ✕
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() =>
                                formik.setFieldValue("PictureGallery", [
                                    ...formik.values.PictureGallery,
                                    null,
                                ])
                            }
                        >
                            + Add More
                        </Button>
                    </div>

                    {/* 🎥 Video Gallery (multi-video support) */}
                    <div className="space-y-4">
                        <label className="font-semibold">Video Gallery</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {formik.values?.VideoGallery?.map((video, index) => (
                                <div key={index} className="relative rounded-md p-2">
                                    {!video ? (
                                        <TextField
                                            size="small"
                                            type="file"
                                            className="custom-input"
                                            inputProps={{ accept: "video/*" }}
                                            onChange={(e) => handleFileUpload(e, "VideoGallery", index)}
                                        />
                                    ) : (
                                        <>
                                            <video
                                                controls
                                                className="w-full h-32 object-contain rounded mb-2 border"
                                            >
                                                <source src={video} type="video/mp4" />
                                            </video>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile("VideoGallery", index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                                            >
                                                ✕
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() =>
                                formik.setFieldValue("VideoGallery", [
                                    ...formik.values.VideoGallery,
                                    null,
                                ])
                            }
                        >
                            + Add More
                        </Button>
                    </div>

                    {/* 👥 Contacts */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="font-semibold">Zatra Contacts</label>
                            <Button onClick={handleAddContact}>+ Add Contact</Button>
                        </div>

                        {formik.values.ZatraContacts.map((contact, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3"
                            >
                                <FormInput
                                    label="Name"
                                    name={`ZatraContacts[${index}].Name`}
                                    value={contact.Name}
                                    onChange={formik.handleChange}
                                />
                                <FormInput
                                    label="Phone Number"
                                    name={`ZatraContacts[${index}].PhoneNumber`}
                                    inputMode="numeric"
                                    value={contact.PhoneNumber}
                                    onChange={formik.handleChange}
                                />
                                <FormInput
                                    label="Email"
                                    name={`ZatraContacts[${index}].EmailAddress`}
                                    value={contact.EmailAddress}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        ))}
                    </div>
                </DialogContent>
                <Divider />
                <DialogActions className="px-6 py-3">
                    <FormButton disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Details"}
                    </FormButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ZatraDetails;
