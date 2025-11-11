import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogContent,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import FormInput from "../../common/FormInput";
import { __postApiData } from "../../../utils/api";
import { toast } from "react-toastify";
import FormButton from "../../common/FormButton";
import { __getCommenApiDataList } from "../../../utils/api/commonApi";

const SocialMedia = ({ open, onClose, zatraDetails, setZatraDetails, reload }) => {
    const [brandTypeList, setBrandTypeList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // ✅ Fetch dropdown data
    const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
        try {
            const data = await __getCommenApiDataList({
                lookup_type: lookupTypes,
                parent_lookup_id: parent_lookup_id || null,
            })
            setBrandTypeList(data);
        } catch (error) {
            console.error(`Error fetching ${stateKey}:`, error);
        }
    }
    useEffect(() => {
        fetchData(['social_media_type'],);
    }, []);
    const formik = useFormik({
        initialValues: {
            ZatraSocialMedia:zatraDetails?.ZatraSocialMedia ? zatraDetails?.ZatraSocialMedia?.map(item => ({ SocialMediaId: item.SocialMediaId?._id, URL: item.URL })) :   [
                {
                    SocialMediaId: "",
                    URL: "",
                },
            ],
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const payload = {
                    _id: zatraDetails?._id,
                    ZatraSocialMedia: values.ZatraSocialMedia?.map((item) => ({
                        SocialMediaId: item.SocialMediaId,
                        URL: item.URL,
                    })),
                };
                const res = await __postApiData("/api/v1/admin/SaveZatra-SocialMedia",
                    payload
                );
                if (res.response && res.response.response_code === "200") {
                    toast.success("Social media added successfully");
                    onClose();
                    reload();
                } else {
                    toast.error(res.response.response_message || "Failed to add Social media");
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to submit:", error);
                setIsLoading(false);
            }
        },
    });

    // Function to add new social media entry
    const handleAddMore = () => {
        formik.setFieldValue("ZatraSocialMedia", [
            ...formik.values.ZatraSocialMedia,
            {
                SocialMediaId: "",
                URL: "",
            },
        ]);
    };

    // Function to remove an entry
    const handleRemove = (index) => {
        const updatedList = [...formik.values.ZatraSocialMedia];
        updatedList.splice(index, 1);
        formik.setFieldValue("ZatraSocialMedia", updatedList);
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
            {/* 🔝 Header */}
            <div
                className="flex justify-between items-center px-6 py-3 border-b border-gray-200"
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    backgroundColor: "#fff",
                }}
            >
                <h2 className="text-lg font-semibold">Add Social Media</h2>
                <IconButton
                    onClick={() => {
                        onClose();
                        setZatraDetails(null);
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </div>

            {/* 🧾 Form Section */}
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4">
                <DialogContent className="space-y-4">
                    <label className="block text-lg font-semibold mb-2">
                        Zatra Social Media Links
                    </label>

                    {formik.values.ZatraSocialMedia.map((item, index) => (
                        <div key={index} className="border p-4 rounded-lg relative">
                            {formik.values?.ZatraSocialMedia?.length > 1 && (
                                <IconButton
                                    onClick={() => handleRemove(index)}
                                    style={{ position: "absolute", top: 0, right: 10, color: 'red' }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center"
                            >
                                <FormInput
                                    label={"Asset Type"}
                                    name={`ZatraSocialMedia[${index}].SocialMediaId`}
                                    type="select"
                                    value={item.SocialMediaId}
                                    onChange={formik.handleChange}
                                    options={brandTypeList}
                                />
                                <FormInput
                                    label={"URL"}
                                    name={`ZatraSocialMedia[${index}].URL`}
                                    value={item.URL}
                                    onChange={formik.handleChange}
                                />


                            </div>
                        </div>

                    ))}

                    <Button
                        variant="contained"
                        size="medium"
                        onClick={handleAddMore}
                        className="mt-2"
                        color="success"
                    >
                        + Add More
                    </Button>
                </DialogContent>

                <div className="flex justify-end gap-3 px-6 pb-4">
                    <Button
                        onClick={() => {
                            onClose();
                            setZatraDetails(null);
                        }}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <div className="">
                        <FormButton type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save"}
                        </FormButton>
                    </div>
                </div>
            </form>
        </Dialog>
    );
};

export default SocialMedia;
