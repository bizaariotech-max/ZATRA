import React from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'
import { Button, IconButton, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import DeleteIcon from "@mui/icons-material/Delete";

const StationSpecialities = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const formik = useFormik({
        initialValues: {
            StationSpecialityTypeId: "",
            Name: "",
            ShortDescription: "",
            LongDescription: "",
            PictureGallery: [null],
            VideoGallery: [null],
            URL: [""]
        },
        onSubmit: async (values) => {
            console.log("values", values);
        }
    })

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

    // ✅ Add more URL field
    const handleAddField = () => {
        formik.setFieldValue("URL", [...formik.values.URL, ""]);
    };

    // ✅ Remove specific field
    const handleRemoveField = (index) => {
        const updated = formik.values.URL.filter((_, i) => i !== index);
        formik.setFieldValue("URL", updated);
    };
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="City/Station Specialities"
                description="Add or update the required details for the city/station specialities to keep records accurate and complete."
            />
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4 mt-8 shadow-card rounded-md p-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Zatra Name */}
                    <FormInput
                        label="Station Speciality Type"
                        name="StationSpecialityTypeId"
                        type='select'
                        placeholder="Select a option"
                        options={[{ _id: "1", lookup_value: "Local Representative" }]}
                        value={formik.values?.StationSpecialityTypeId}
                        onChange={formik.handleChange}
                        error={formik.touched.StationSpecialityTypeId && formik.errors.StationSpecialityTypeId}
                        helperText={formik.touched.StationSpecialityTypeId && formik.errors.StationSpecialityTypeId}
                    />
                    <FormInput
                        label="Name / Title"
                        name="Name"
                        placeholder="Enter Name / Title"
                        value={formik.values?.Name}
                        onChange={formik.handleChange}
                        error={formik.touched?.Name && formik.errors?.Name}
                        helperText={formik.touched?.Name && formik.errors?.Name}
                    />
                    <FormInput
                        label="Short Description"
                        name="ShortDescription"
                        placeholder="Enter Short Description"
                        multiline
                        rows={3}
                        value={formik.values?.ShortDescription}
                        onChange={formik.handleChange}
                        error={formik.touched?.ShortDescription && formik.errors?.ShortDescription}
                        helperText={formik.touched?.ShortDescription && formik.errors?.ShortDescription}
                    />
                    <FormInput
                        label="Long Description"
                        name="LongDescription"
                        placeholder="Enter Long Description"
                        multiline
                        rows={3}
                        value={formik.values?.LongDescription}
                        onChange={formik.handleChange}
                        error={formik.touched?.LongDescription && formik.errors?.LongDescription}
                        helperText={formik.touched?.LongDescription && formik.errors?.LongDescription}
                    />

                    {/* 📸 Picture Gallery */}
                    <div className="">
                        <label className="font-semibold">Picture Gallery</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formik.values?.PictureGallery?.map((img, index) => (
                                <div key={index} className="relative rounded-md py-2">
                                    {!img ? (
                                        <TextField
                                            size="small"
                                            type="file"
                                            fullWidth
                                            className='custom-input'
                                            inputProps={{ accept: "image/*" }}
                                            onChange={(e) =>
                                                handleFileUpload(e, "PictureGallery", index)
                                            }
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                    padding: '8px 12px',
                                                    height: 'auto',
                                                },
                                            }}
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
                            variant="contained"
                            size="small"
                            color='success'
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
                    <div className="">
                        <label className="font-semibold">Video Gallery</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formik.values?.VideoGallery?.map((video, index) => (
                                <div key={index} className="relative rounded-md py-2 w-full">
                                    {!video ? (
                                        <TextField
                                            size="small"
                                            fullWidth
                                            type="file"
                                            className='custom-input'
                                            inputProps={{ accept: "video/*" }}
                                            onChange={(e) => handleFileUpload(e, "VideoGallery", index)}
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                    padding: '8px 12px',
                                                    height: 'auto',
                                                },
                                            }}
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
                            variant="contained"
                            size="small"
                            color='success'
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


                </div>
                <div>
                    <label className="font-semibold">Product Video URLs</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {formik.values.URL.map((url, index) => (
                            <div
                                key={index}
                                className="flex items-center relative space-x-2 mb-2 border border-gray-300 px-2 py-3 rounded-md"
                            >
                                <FormInput
                                    label={`URL`}
                                    name={`URL[${index}]`}
                                    placeholder="Enter video URL"
                                    value={url}
                                    onChange={formik.handleChange}
                                    error={formik.touched.URL && formik.errors.URL?.[index]}
                                />

                                {formik.values.URL.length > 1 && (
                                    <IconButton
                                        className='absolute top-3'
                                        color="error"
                                        size="small"
                                        onClick={() => handleRemoveField(index)}
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
                        onClick={handleAddField}
                    >
                        + Add More
                    </Button>
                </div>
                <div className="mt-4">
                    <FormButton disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                    </FormButton>
                </div>
            </form>
        </div>
    )
}

export default StationSpecialities