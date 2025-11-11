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

const RegistrationFee = ({ open, onClose, zatraDetails, setZatraDetails, reload }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [datalist, setDataList] = useState({
        registrationCategoryList: [],
        feeCategoryList: [],
    });

    const { registrationCategoryList, feeCategoryList } = datalist;

    const updateState = (data) => setDataList((prev) => ({ ...prev, ...data }));

    const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
        try {
            const data = await __getCommenApiDataList({
                lookup_type: lookupTypes,
                parent_lookup_id: parent_lookup_id || null,
            });

            if (data && Array.isArray(data) && data.length > 0) {
                updateState({ [stateKey]: data });
            } else if (data?.data?.length > 0) {
                updateState({ [stateKey]: data.data });
            } else if (data?.list?.length > 0) {
                updateState({ [stateKey]: data.list });
            } else {
                updateState({ [stateKey]: [] });
            }
        } catch (error) {
            console.error(`Error fetching ${stateKey}:`, error);
        }
    };

    useEffect(() => {
        fetchData(["registration_fee_category"], "registrationCategoryList", null);
        fetchData(["fee_category"], "feeCategoryList", null);
    }, []);

    const formik = useFormik({
        initialValues: {
            RegistrationFees: zatraDetails?.RegistrationFees?.length > 0 ? zatraDetails?.RegistrationFees?.map((item) => ({ FeeCategory: item.FeeCategory?._id, FeeAmount: item.FeeAmount })) : [{ FeeCategory: "", FeeAmount: "" }],
            AmenitiesProvided: zatraDetails?.AmenitiesProvided?.length > 0 ? zatraDetails?.AmenitiesProvided : [""],
            SpecialDarshansFeeCategoryAmount: zatraDetails?.SpecialDarshansFeeCategoryAmount?.length > 0 ? zatraDetails?.SpecialDarshansFeeCategoryAmount?.map((item) => ({ FeeCategory: item.FeeCategory?._id, Amount: item.Amount })) : [{ FeeCategory: "", Amount: "" }],
            CameraAndShootingFeeCategoryAmount: zatraDetails?.CameraAndShootingFeeCategoryAmount?.length > 0 ? zatraDetails?.CameraAndShootingFeeCategoryAmount?.map((item) => ({ FeeCategory: item.FeeCategory?._id, Amount: item.Amount })) : [{ FeeCategory: "", Amount: "" }],
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const payload = {
                    _id: zatraDetails?._id,
                    RegistrationFees: values.RegistrationFees?.map((item) => ({
                        FeeCategory: item.FeeCategory,
                        FeeAmount: item.FeeAmount,
                    })),
                    AmenitiesProvided: values.AmenitiesProvided,
                    SpecialDarshansFeeCategoryAmount: values.SpecialDarshansFeeCategoryAmount,
                    CameraAndShootingFeeCategoryAmount: values.CameraAndShootingFeeCategoryAmount,
                };

                const res = await __postApiData(
                    "/api/v1/admin/SaveZatra-RegistrationFees",
                    payload
                );

                if (res.response && res.response.response_code === "200") {
                    toast.success("Registration fees added successfully");
                    onClose();
                    reload();
                } else {
                    toast.error(res.response.response_message || "Failed to add Registration fees");
                }
            } catch (error) {
                console.error("Failed to submit:", error);
                toast.error("Error submitting form");
            } finally {
                setIsLoading(false);
            }
        },
    });

    // 🔹 Common handlers (Formik-based)
    const handleDynamicFeeChange = (section, index, field, value) => {
        const updated = [...formik.values[section]];
        updated[index][field] = value;
        formik.setFieldValue(section, updated);
    };

    const handleAddFee = (section) => {
        formik.setFieldValue(section, [
            ...formik.values[section],
            { FeeCategory: "", Amount: "" },
        ]);
    };

    const handleRemoveFee = (section, index) => {
        const updated = formik.values[section].filter((_, i) => i !== index);
        formik.setFieldValue(section, updated.length ? updated : [{ FeeCategory: "", Amount: "" }]);
    };

    // 🔹 Amenities handlers (Formik-based)
    const handleAmenityChange = (index, value) => {
        const updated = [...formik.values.AmenitiesProvided];
        updated[index] = value;
        formik.setFieldValue("AmenitiesProvided", updated);
    };

    const handleAddAmenity = () => {
        formik.setFieldValue("AmenitiesProvided", [
            ...formik.values.AmenitiesProvided,
            "",
        ]);
    };

    const handleRemoveAmenity = (index) => {
        const updated = formik.values.AmenitiesProvided.filter((_, i) => i !== index);
        formik.setFieldValue(
            "AmenitiesProvided",
            updated.length ? updated : [""]
        );
    };

    // 🔹 Render fee section
    const renderFeeSection = (title, sectionKey) => (
        <div className="space-y-4">
            <h3 className="text-base font-semibold">{title}</h3>
            {formik.values[sectionKey]?.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center flex-col md:flex-row gap-3 border p-3 rounded-md bg-gray-50"
                >
                    <FormInput
                        label="Fee Category"
                        type="select"
                        value={item.FeeCategory}
                        onChange={(e) =>
                            handleDynamicFeeChange(sectionKey, index, "FeeCategory", e.target.value)
                        }
                        options={registrationCategoryList}
                    />

                    <FormInput
                        label="Amount"
                        inputMode="numeric"
                        placeholder="Enter Amount"
                        value={item.Amount}
                        onChange={(e) =>
                            handleDynamicFeeChange(sectionKey, index, "Amount", e.target.value)
                        }
                    />

                    {formik.values[sectionKey].length > 1 && (
                        <IconButton color="error" onClick={() => handleRemoveFee(sectionKey, index)}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </div>
            ))}

            <div className="flex justify-start">
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAddFee(sectionKey)}
                >
                    + Add More
                </Button>
            </div>
        </div>
    );

    // 🔹 Amenities section
    const renderAmenitiesSection = () => (
        <div className="space-y-4">
            <h3 className="text-base font-semibold">Amenities Provided</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formik.values.AmenitiesProvided.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <FormInput
                            placeholder="Enter Amenity"
                            value={amenity}
                            onChange={(e) => handleAmenityChange(index, e.target.value)}
                        />

                        {formik.values.AmenitiesProvided.length > 1 && (
                            <IconButton color="error" onClick={() => handleRemoveAmenity(index)}>
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-start">
                <Button variant="contained" color="success" onClick={handleAddAmenity}>
                    + Add More
                </Button>
            </div>
        </div>
    );

    // 🔹 Add more for RegistrationFees (already handled separately)
    const handleAddMore = () => {
        formik.setFieldValue("RegistrationFees", [
            ...formik.values.RegistrationFees,
            { FeeCategory: "", FeeAmount: "" },
        ]);
    };

    const handleRemove = (index) => {
        const updatedList = [...formik.values.RegistrationFees];
        updatedList.splice(index, 1);
        formik.setFieldValue("RegistrationFees", updatedList);
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
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
                <h2 className="text-lg font-semibold">Add Registration Fees</h2>
                <IconButton
                    onClick={() => {
                        onClose();
                        setZatraDetails(null);
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </div>

            {/* Form */}
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4">
                <DialogContent className="space-y-4">
                    <label className="block text-lg font-semibold mb-2">Registration Fees</label>

                    {formik.values?.RegistrationFees?.map((item, index) => (
                        <div key={index} className="border p-4 rounded-lg relative">
                            {formik.values?.RegistrationFees?.length > 1 && (
                                <IconButton
                                    onClick={() => handleRemove(index)}
                                    style={{ position: "absolute", top: 0, right: 10, color: "red" }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                                <FormInput
                                    label="Category"
                                    type="select"
                                    value={item.FeeCategory}
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `RegistrationFees[${index}].FeeCategory`,
                                            e.target.value
                                        )
                                    }
                                    options={feeCategoryList}
                                />
                                <FormInput
                                    label="Fee"
                                    value={item.FeeAmount}
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `RegistrationFees[${index}].FeeAmount`,
                                            e.target.value
                                        )
                                    }
                                    inputMode="numeric"
                                />
                            </div>
                        </div>
                    ))}

                    <Button variant="contained" size="medium" onClick={handleAddMore} color="success" className="mt-2">
                        + Add More
                    </Button>
                    {renderFeeSection("Special Darshans Fee Details", "SpecialDarshansFeeCategoryAmount")}
                    {renderFeeSection("Camera and Shooting Fee Details", "CameraAndShootingFeeCategoryAmount")}
                    {renderAmenitiesSection()}


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
                    <FormButton type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                    </FormButton>
                </div>
            </form>
        </Dialog>
    );
};

export default RegistrationFee;
