import React, { useEffect, useState } from "react";
import {
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../common/FormInput";
import { __getCommenApiDataList } from "../../../utils/api/commonApi";
import FormButton from "../../common/FormButton";
import axios from "axios";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { __postApiData, BASE_URL } from "../../../utils/api";

const Organizer = ({ open, onClose, zatraDetails, setZatraDetails, reload, openModal }) => {
    const [categoryList, setCategoryList] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const validationSchema = Yup.object({
        OrganizerTypeId: Yup.string().required("Organizer Type is required"),
        OrganizerName: Yup.string().required("Organizer Name is required"),
        ContactName: Yup.string().required("Contact Name is required"),
        ContactNumber: Yup.string()
            .matches(/^[6-9]{1}[0-9]{9}$/, "Enter a valid 10-digit number")
            .required("Contact Number is required"),
        Password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        EmailAddress: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        Website: Yup.string().url("Enter a valid URL").nullable(),
        // Logo: Yup.string().required("Logo is required"),
    });
    // ✅ Fetch data for dropdown
    const fetchData = async (lookupTypes) => {
        try {
            const data = await __getCommenApiDataList({
                lookup_type: lookupTypes,
                parent_lookup_id: null,
            });
            setCategoryList(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData(["organizer_type"]);
    }, []);

    // ✅ Toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    // ✅ Formik Setup
    const formik = useFormik({
        initialValues: {
            OrganizerTypeId: "",
            OrganizerName: "",
            ContactName: "",
            ContactNumber: "",
            IsOrganiserAdmin: true,
            Password: "",
            EmailAddress: "",
            Website: "",
            Logo: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const payload = {
                    ...values,
                    IsSponsor: openModal?.type === "sponsor" ? true : false,
                    ZatraId: zatraDetails?._id
                }
                const res = await __postApiData("/api/v1/admin/SaveOrganizerSponser",
                    payload
                );
                if (res.response && res.response.response_code === "200") {
                    toast.success(openModal?.type === "sponsor" ? "Sponsor added successfully" : "Organizer added successfully");
                    onClose();
                    reload();
                } else {
                    toast.error(res.response.response_message || openModal?.type === "sponsor" ? "Failed to add Sponsor" : "Failed to add Organizer");
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to submit:", error);
                setIsLoading(false);
            }
        },
    });

    // ✅ File Upload Handler
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return toast.warning("Please select a file first");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(`${BASE_URL}/api/v1/common/AddImage`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response?.data?.response?.response_code === "200") {
                const url = response.data?.data[0]?.full_URL || "";
                formik.setFieldValue("Logo", url);
                toast.success("File uploaded successfully!");
            } else {
                toast.error(response?.data?.response?.response_message || "File upload failed");
            }
        } catch (error) {
            console.error("File upload failed:", error);
            toast.error("Error uploading file");
        }
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
                <h2 className="text-lg font-semibold">{openModal.type === "organizer" ? "Add Organizer" : "Add Sponsor"}</h2>
                <IconButton
                    onClick={() => {
                        onClose();
                        setZatraDetails(null);
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </div>

            {/* ✅ Form Start */}
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4">
                <DialogContent className="space-y-4">
                    {/* 📝 Basic Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            label={openModal.type === "organizer" ? "Organizer Type" : "Sponsor Type"}
                            name="OrganizerTypeId"
                            placeholder={openModal.type === "organizer" ? "Select an organizer type" : "Select an sponsor type"}
                            type="select"
                            options={categoryList}
                            value={formik.values.OrganizerTypeId}
                            onChange={formik.handleChange}
                            error={formik.touched?.OrganizerTypeId && formik.errors?.OrganizerTypeId}
                            helperText={formik.touched?.OrganizerTypeId && formik.errors?.OrganizerTypeId}
                        />

                        <FormInput
                            label={openModal.type === "organizer" ? "Organizer Name" : "Sponsor Name"}
                            name="OrganizerName"
                            placeholder={openModal.type === "organizer" ? "Enter Organizer Name" : "Enter Sponsor Name"}
                            value={formik.values?.OrganizerName}
                            onChange={formik.handleChange}
                            error={formik.touched?.OrganizerName && formik.errors?.OrganizerName}
                            helperText={formik.touched?.OrganizerName && formik.errors?.OrganizerName}
                        />

                        <FormInput
                            label="Contact Name"
                            name="ContactName"
                            placeholder="Enter Contact Name"
                            value={formik.values?.ContactName}
                            onChange={formik.handleChange}
                            error={formik.touched?.ContactName && formik.errors?.ContactName}
                            helperText={formik.touched?.ContactName && formik.errors?.ContactName}
                        />

                        <FormInput
                            label="Contact Number"
                            name="ContactNumber"
                            placeholder="Enter Contact Number"
                            inputMode="numeric"
                            value={formik.values?.ContactNumber}
                            onChange={formik.handleChange}
                            error={formik.touched?.ContactNumber && formik.errors?.ContactNumber}
                            helperText={formik.touched?.ContactNumber && formik.errors?.ContactNumber}
                        />
                    </div>

                    {/* ✅ Organizer Admin */}
                    <div className="flex items-center gap-1">
                        <Checkbox
                            id="IsOrganiserAdmin"
                            name="IsOrganiserAdmin"
                            checked={formik.values?.IsOrganiserAdmin}
                            onChange={(e) => formik.setFieldValue("IsOrganiserAdmin", e.target?.checked)}
                            sx={{
                                color: "var(--web-primary)",
                                "&.Mui-checked": { color: "var(--web-primary)" },
                            }}
                        />
                        <label htmlFor="IsOrganiserAdmin" className="text-webprimary cursor-pointer">
                            {openModal.type === "organizer" ? "Set as Organizer Admin" : "Set as Sponsor Admin"}
                        </label>
                    </div>

                    {/* ✅ Password & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            label="Password"
                            name="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formik.values?.Password}
                            onChange={formik.handleChange}
                            error={formik.touched?.Password && Boolean(formik.errors?.Password)}
                            helperText={formik.touched?.Password && formik.errors?.Password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <FormInput
                            label="Email Address"
                            name="EmailAddress"
                            placeholder="Enter Email Address"
                            value={formik.values?.EmailAddress}
                            onChange={formik.handleChange}
                            error={formik.touched?.EmailAddress && Boolean(formik.errors?.EmailAddress)}
                            helperText={formik.touched?.EmailAddress && formik.errors?.EmailAddress}
                        />

                        <FormInput
                            label="Website"
                            name="Website"
                            placeholder="Enter Website"
                            value={formik.values?.Website}
                            onChange={formik.handleChange}
                            error={formik.touched?.Website && Boolean(formik.errors?.Website)}
                            helperText={formik.touched?.Website && formik.errors?.Website}
                        />

                        {/* ✅ File Upload */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="ZatraLogo" className="text-base font-semibold">
                                Zatra Logo
                            </label>
                            <TextField
                                fullWidth
                                id="ZatraLogo"
                                name="Logo"
                                size="small"
                                type="file"
                                className="custom-input"
                                inputProps={{ accept: "image/*" }}
                                onChange={handleFileUpload}
                                error={formik.touched?.Logo && Boolean(formik.errors?.Logo)}
                                helperText={formik.touched?.Logo && formik.errors?.Logo}
                            />
                            {formik.values?.Logo && (
                                <div className="mt-2">
                                    <img
                                        src={formik.values?.Logo}
                                        alt="Logo Preview"
                                        className="w-32 h-32 object-cover border rounded-md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>

                {/* ✅ Submit Button */}
                <div className="flex justify-end px-6 pb-4">
                    <FormButton type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Save"}</FormButton>
                </div>
            </form>
        </Dialog>
    );
};

export default Organizer;
