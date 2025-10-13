import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    Divider,
    IconButton,
    InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormButton from '../../common/FormButton';
import FormInput from '../../common/FormInput';
import { __postApiData } from '../../../utils/api';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from 'react-toastify';

const AddLogin = ({
    openModal,
    handleCloseModal,
    editId,
    formData,
    updateData,
    LoginAssetId,
    LoginAssetRef,
    LoginAssetType,
    refreshList,

}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    // ===================== Submit handle function ===================== \\
    const handleAddLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (editId) {
                // Edit mode: Only Name and PhoneNumber are required
                if (!formData?.Name || !formData?.PhoneNumber) {
                    toast.error("Please fill all the required fields: Name and Phone number");
                    return;
                }
            } else {
                // Add mode: All three fields are required
                if (!formData?.Name || !formData?.PhoneNumber || !formData?.Password) {
                    toast.error("Please fill all the required fields: Name, Phone number, and Password");
                    return;
                }
            }
            if (isNaN(formData?.PhoneNumber)) {
                toast.error("Please enter a valid phone number");
                return;
            }
            const res = await __postApiData("/api/v1/admin/SaveNewZatraLogin", { ...formData, _id: editId || null, LoginAssetId: LoginAssetId, LoginAssetType, LoginAssetRef });
            if (res?.response?.response_code === '200') {
                refreshList();
                handleCloseModal();
                toast.success(editId ? "Login updated successfully" : "Login added successfully");
            } else {
                console.log('Error:', res?.response?.message);
                toast.error(res?.response?.message || "Failed to add login");
            }
        } catch (err) {
            toast.error("Failed to add login");
            console.error('Error saving login:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    return (
        <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
            <DialogTitle className="flex justify-between items-center">
                <span className="text-md font-semibold md:text-2xl">
                    {editId ? 'Update Login' : 'Add Login'}
                </span>
                <IconButton onClick={handleCloseModal} size="small" color="error">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider />

            <form
                onSubmit={handleAddLogin}
                className="flex flex-col gap-4  rounded-md mx-4 my-4 p-3"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <FormInput
                        label="Name"
                        name="Name"
                        placeholder="Enter Name"
                        value={formData.Name}
                        onChange={updateData}
                    />

                    <FormInput
                        label="Email Address"
                        name="Email"
                        value={formData.Email}
                        onChange={updateData}
                        placeholder="Enter Email Address"
                    />

                    <FormInput
                        label="Address"
                        name="Address"
                        placeholder="Enter Address"
                        multiline
                        rows={3}
                        value={formData.Address}
                        onChange={updateData}
                    />

                    <FormInput
                        label="Phone number"
                        name="PhoneNumber"
                        inputMode={"numeric"}
                        placeholder="Enter Phone number"
                        value={formData.PhoneNumber}
                        onChange={updateData}
                    />

                    {!editId && <FormInput
                        label="Password"
                        name="Password"
                        placeholder="Enter Password"
                        type={showPassword ? "text" : "password"}
                        value={formData.Password}
                        onChange={updateData}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />}
                </div>

                <div className="mt-4 mb-4">
                    <FormButton disable={isLoading}>
                        {isLoading
                            ? editId
                                ? 'Updating...'
                                : 'Adding...'
                            : editId
                                ? 'Update'
                                : 'Save'}
                    </FormButton>
                </div>
            </form>
        </Dialog>
    );
};

export default AddLogin;
