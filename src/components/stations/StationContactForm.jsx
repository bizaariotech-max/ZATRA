import React, { useState, useRef } from 'react'
import FormInput from '../common/FormInput'
import { useFormik } from 'formik'
import { __postApiData, BASE_URL } from '../../utils/api'
import { toast } from 'react-toastify'
import axios from 'axios'
import { TextField } from '@mui/material'
import FormButton from '../common/FormButton'
import { useAuth } from '../../context/AuthContext'

const StationContactForm = ({ type, fetchData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false); // 🔹 for image upload state
    const fileInputRef = useRef(null); // 🔹 for resetting the file input
    const { userDetails } = useAuth();

    let options = [];
    if (type === "localRepresentative") {
        options = [{ _id: "687756d4aa2e78aefc414a51", lookup_value: "Local Representative" }];
    } else if (type === "administrator") {
        options = [{ _id: "687756e5aa2e78aefc414a53", lookup_value: "Civic Administration" }];
    } else {
        options = [{ _id: "687a18fb665fcc3a0f4626c2", lookup_value: "Industry Association" }];
    }

    const formik = useFormik({
        initialValues: {
            ContactTypeId: "",
            ContactName: "",
            Designation: "",
            Phone: "",
            Email: "",
            Website: "",
            AddressLine1: "",
            AddressLine2: "",
            PostalCode: "",
            Image: ""
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const payload = { ...values, CityId: userDetails?.StationId };
                setIsLoading(true);

                const res = await __postApiData('/api/v1/admin/SaveCityContact', payload);
                if (res.response && res.response.response_code === "200") {
                    toast.success("Data added successfully");
                    resetForm();
                    fetchData();

                    // 🔹 Reset the file input after submit
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                } else {
                    toast.error(res.response.response_message || "Failed to add Data");
                }
            } catch (err) {
                console.log(err?.response?.data?.message || "Failed to add Data");
                toast.error("Failed to add Data");
            } finally {
                setIsLoading(false);
            }
        }
    });

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return toast.error("Please select a file first");

        try {
            setIsUploading(true); // 🔹 start uploading
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(
                `${BASE_URL}/api/v1/common/AddImage`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (response?.data?.response?.response_code === "200") {
                formik.setFieldValue("Image", response.data?.data[0]?.full_URL || "");
                toast.success("Image uploaded successfully");
            } else {
                toast.error(response?.data?.response?.response_message || "File upload failed");
            }
        } catch (error) {
            console.error("File upload failed:", error);
            toast.error("Error uploading file");
        } finally {
            setIsUploading(false); // 🔹 stop uploading
        }
    };

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 mt-8 shadow-card rounded-md p-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                    label="Contact Type"
                    name="ContactTypeId"
                    type='select'
                    placeholder="Select a option"
                    options={options}
                    value={formik.values?.ContactTypeId}
                    onChange={formik.handleChange}
                    error={formik.touched.ContactTypeId && formik.errors.ContactTypeId}
                    helperText={formik.touched.ContactTypeId && formik.errors.ContactTypeId}
                />
                <FormInput
                    label="Contact/Association Name"
                    name="ContactName"
                    placeholder="Enter Contact/Association Name"
                    value={formik.values?.ContactName}
                    onChange={formik.handleChange}
                    error={formik.touched?.ContactName && formik.errors?.ContactName}
                    helperText={formik.touched?.ContactName && formik.errors?.ContactName}
                />
                <FormInput
                    label="Designation/ Acronym"
                    name="Designation"
                    placeholder="Enter Designation/ Acronym"
                    value={formik.values?.Designation}
                    onChange={formik.handleChange}
                    error={formik.touched?.Designation && formik.errors?.Designation}
                    helperText={formik.touched?.Designation && formik.errors?.Designation}
                />
                <FormInput
                    label="Phone"
                    name="Phone"
                    placeholder="Enter Phone"
                    inputMode={"numeric"}
                    value={formik.values?.Phone}
                    onChange={formik.handleChange}
                    error={formik.touched?.Phone && formik.errors?.Phone}
                    helperText={formik.touched?.Phone && formik.errors?.Phone}
                />
                <FormInput
                    label="Email"
                    name="Email"
                    placeholder="Enter Email"
                    value={formik.values?.Email}
                    onChange={formik.handleChange}
                    error={formik.touched?.Email && formik.errors?.Email}
                    helperText={formik.touched?.Email && formik.errors?.Email}
                />
                <FormInput
                    label="Website"
                    name="Website"
                    placeholder="Enter Website"
                    value={formik.values?.Website}
                    onChange={formik.handleChange}
                    error={formik.touched?.Website && formik.errors?.Website}
                    helperText={formik.touched?.Website && formik.errors?.Website}
                />
                <FormInput
                    label="Address Line 1"
                    name="AddressLine1"
                    placeholder="Enter Address Line 1"
                    value={formik.values?.AddressLine1}
                    onChange={formik.handleChange}
                    error={formik.touched?.AddressLine1 && formik.errors?.AddressLine1}
                    helperText={formik.touched?.AddressLine1 && formik.errors?.AddressLine1}
                />
                <FormInput
                    label="Address Line 2"
                    name="AddressLine2"
                    placeholder="Enter Address Line 2"
                    value={formik.values?.AddressLine2}
                    onChange={formik.handleChange}
                    error={formik.touched?.AddressLine2 && formik.errors?.AddressLine2}
                    helperText={formik.touched?.AddressLine2 && formik.errors?.AddressLine2}
                />
                <FormInput
                    label="Postal Code"
                    name="PostalCode"
                    placeholder="Enter Postal Code"
                    value={formik.values?.PostalCode}
                    onChange={formik.handleChange}
                    error={formik.touched?.PostalCode && formik.errors?.PostalCode}
                    helperText={formik.touched?.PostalCode && formik.errors?.PostalCode}
                />
                <div className="flex flex-col gap-2">
                    <label htmlFor="Image" className="text-base font-semibold">
                        Image
                    </label>
                    <TextField
                        fullWidth
                        id="Image"
                        name="Image"
                        placeholder="Upload an image"
                        size="small"
                        type="file"
                        className="custom-input"
                        inputProps={{ accept: "image/*" }}
                        onChange={handleFileUpload}
                        inputRef={fileInputRef} // 🔹 attach ref
                        error={formik.touched.Image && Boolean(formik.errors.Image)}
                        helperText={formik.touched.Image && formik.errors.Image}
                    />
                    {formik.values.Image && (
                        <div className="mt-2">
                            <img
                                src={formik.values.Image}
                                alt="Logo Preview"
                                className="w-32 h-32 object-cover border rounded-md"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4">
                <FormButton disabled={isLoading || isUploading}>
                    {isUploading
                        ? "Uploading Image..."
                        : isLoading
                        ? "Saving..."
                        : "Save"}
                </FormButton>
            </div>
        </form>
    )
}

export default StationContactForm
