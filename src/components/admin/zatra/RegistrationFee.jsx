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
        fetchData(['fee_category'],);
    }, []);
    const formik = useFormik({
        initialValues: {
            RegistrationFees: [
                {
                    FeeCategory: "",
                    FeeAmount: "",
                },
            ],
        },
        onSubmit: async (values) => {
            try {
                const payload = {
                    _id: zatraDetails?._id,
                    RegistrationFees: values.RegistrationFees?.map((item) => ({
                        FeeCategory: item.FeeCategory,
                        FeeAmount: item.FeeAmount,
                    })),
                };
                const res = await __postApiData("/api/v1/admin/SaveZatra-RegistrationFees",
                    payload
                );
                if (res.response && res.response.response_code === "200") {
                    toast.success("Registration fees added successfully");
                    onClose();
                    reload();
                } else {
                    toast.error(res.response.response_message || "Failed to add Registration fees");
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
        formik.setFieldValue("RegistrationFees", [
            ...formik.values.RegistrationFees,
            {
                FeeCategory: "",
                FeeAmount: "",
            },
        ]);
    };

    // Function to remove an entry
    const handleRemove = (index) => {
        const updatedList = [...formik.values.RegistrationFees];
        updatedList.splice(index, 1);
        formik.setFieldValue("RegistrationFees", updatedList);
    };
    return (
        <>
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

                {/* 🧾 Form Section */}
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4">
                    <DialogContent className="space-y-4">
                        <label className="block text-lg font-semibold mb-2">
                            Registration Fees
                        </label>

                        {formik.values.RegistrationFees.map((item, index) => (
                            <div key={index} className="border p-4 rounded-lg relative">
                                {index > 0 && (
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
                                        label={"Category"}
                                        name={`RegistrationFees[${index}].FeeCategory`}
                                        type="select"
                                        value={item.FeeCategory}
                                        onChange={formik.handleChange}
                                        options={brandTypeList}
                                    />
                                    <FormInput
                                        label={"Fee"}
                                        name={`RegistrationFees[${index}].FeeAmount`}
                                        value={item.FeeAmount}
                                        onChange={formik.handleChange}
                                        inputMode={"numeric"}
                                    />


                                </div>
                            </div>

                        ))}

                        <Button
                            variant="outlined"
                            size="medium"
                            onClick={handleAddMore}
                            className="mt-2"
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
        </>
    )
}

export default RegistrationFee
