import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import DeleteIcon from "@mui/icons-material/Delete";
import * as Yup from 'yup';
import { __postApiData, BASE_URL } from '../../utils/api';
import FormButton from '../common/FormButton';
import FormInput from '../common/FormInput';
import { __getCommenApiDataList } from '../../utils/api/commonApi';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const ServiceProvider = ({ title, open, handleClose, LoginAssetId, zatraDetails }) => {
    const [state, setState] = useState({
        isLoading: false,
        adminList: [],
    });
    const [brandTypeList, setBrandTypeList] = useState([]);
    const { userDetails } = useAuth()
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const [editId, setEditId] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const { isLoading, adminList } = state;

    //====================== Update state helper =======================\\
    const updateState = (data) =>
        setState((prevState) => ({ ...prevState, ...data }));

    //====================== Fetch Admin List ==========================\\
    const getAdminList = async () => {
        updateState({ isLoading: true });
        try {
            const res = await __postApiData(`/api/v1/admin/ServiceProviderList`, {
                AssetId: zatraDetails?._id,
            });
            if (res?.response?.response_code === '200') {
                updateState({ adminList: res?.data?.list || [], isLoading: false });
            } else {
                updateState({ adminList: [], isLoading: false });
            }
        } catch (error) {
            updateState({ isLoading: false });
        }
    };

    useEffect(() => {
        if (LoginAssetId) getAdminList();
    }, [LoginAssetId]);

    //====================== Formik Setup ===============================\\
    const validationSchema = Yup.object({
        ServiceType: Yup.string().required('Service type is required'),
        ContactNumber: Yup.string()
            .matches(/^[0-9]+$/, 'Only numbers are allowed')
            .required('Phone number is required'),
        EmailAddress: Yup.string().email('Invalid email'),
    });

    const formik = useFormik({
        initialValues: {
            ServiceType: '',
            ServiceProvider: '',
            ProfilePicture: '',
            ContactNumber: '',
            EmailAddress: '',
            PictureGallery: [null],
            VideoGallery: [null],
            URL: [""],
            IsVerified: false,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                const mergedVideos = [
                    ...(values.VideoGallery?.filter(Boolean) || []),
                    ...(values.URL?.filter(Boolean) || []),
                ];
                const payload = {
                    ...values,
                    _id: editId || null,
                    VideoGallery: mergedVideos,
                    StationId: userDetails?.StationId,
                    AssetId: zatraDetails?._id,
                };

                const res = await __postApiData("/api/v1/admin/SaveServiceProvider", payload);
                if (res.response && res.response.response_code === "200") {
                    toast.success("Data added successfully");
                    getAdminList();
                    resetForm();
                    setOpenModal(false);
                    setEditId(null);
                } else {
                    console.log(res);
                    toast.error(res.response?.response_message || res.response?.response_message?.error || "Failed to add Data");
                }
            } catch (err) {
                console.error('Error saving data', err);
            }
        },
    });

    //====================== Edit handler ===============================\\
    const handleEdit = (row) => {
        setEditId(row._id);
        formik.setValues({
            Name: row.Name || '',
            ContactNumber: row.ContactNumber || '',
            EmailAddress: row.EmailAddress || '',
            Password: '', // keep empty for edit
        });
        setOpenModal(true);
    };

    //====================== Modal Handlers ==============================\\
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => {
        setEditId(null);
        formik.resetForm();
        setOpenModal(false);
    };

    // ====================== DataGrid columns ===========================\\
    const columns = [
        {
            field: '_id',
            headerName: 'Sr. No',
            minWidth: 90,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerClassName: 'health-table-header-style',
            renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return (
                    paginationModel.page * paginationModel.pageSize +
                    (rowIndex % paginationModel.pageSize) +
                    1
                );
            },
        },
        {
            field: 'Station',
            headerName: 'Station Name',
            minWidth: 200,
            headerClassName: 'health-table-header-style',
            renderCell: (params) => <span>{params.row?.StationId?.lookup_value || 'N/A'}</span>,
        },
        {
            field: 'ServiceType',
            headerName: 'Service Type',
            minWidth: 200,
            headerClassName: 'health-table-header-style',
            renderCell: (params) => <span>{params.row?.ServiceType?.lookup_value || 'N/A'}</span>,
        },
        {
            field: 'ServiceProvider',
            headerName: 'Service Provider',
            minWidth: 200,
            headerClassName: 'health-table-header-style',
            renderCell: (params) => <span>{params.row?.ServiceProvider || 'N/A'}</span>,
        },
        {
            field: 'ContactNumber',
            headerName: 'Phone Number',
            minWidth: 200,
            headerClassName: 'health-table-header-style',
            renderCell: (params) => <span>{params.row?.ContactNumber || 'N/A'}</span>,
        },
        {
            field: 'EmailAddress',
            headerName: 'EmailAddress',
            minWidth: 200,
            headerClassName: 'health-table-header-style',
            renderCell: (params) => <span>{params.row?.EmailAddress || 'N/A'}</span>,
        },
        {
            field: 'IsVerified',
            headerName: 'Is Verified',
            minWidth: 200,
            headerClassName: 'health-table-header-style',
            renderCell: (params) => <span>{params.row?.IsVerified===true?"Yes":"No" || 'N/A'}</span>,
        },
        {
            field: 'action',
            headerName: 'Action',
            headerClassName: 'health-table-header-style',
            minWidth: 150,
            renderCell: (params) => (
                <button
                    className="text-blue-600 underline hover:text-blue-800"
                    onClick={() => handleEdit(params.row)}
                >
                    Edit
                </button>
            ),
        },
    ];


    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
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
                formik.setFieldValue("ProfilePicture", response.data?.data[0]?.full_URL || "");
            } else {
                toast.error(response?.data?.response?.response_message || "File upload failed");
            }
        } catch (error) {
            console.error("File upload failed:", error);
            toast.error("Error uploading file");
        }
    };
    const handleFileUpload1 = async (e, key, index = null) => {
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
        fetchData(['service_type'],);
    }, []);
    return (
        <>
            {/* Main List Modal */}
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle className="flex justify-between items-center">
                    <span className="text-md font-semibold md:text-2xl">{title}</span>
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent className="flex flex-col">
                    <div className="flex justify-end">
                        <FormButton
                            type="button"
                            onClick={handleOpenModal}
                            variant="contained"
                        >
                            Add Service Provider
                        </FormButton>
                    </div>

                    <div className="w-full overflow-x-auto my-6">
                        <DataGrid
                            rows={adminList}
                            columns={columns}
                            loading={isLoading}
                            autoHeight
                            pagination
                            getRowId={(row) => row._id}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            pageSizeOptions={[5, 10]}
                        />
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add / Edit Modal */}
            <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
                <DialogTitle className="flex justify-between items-center">
                    <span className="text-lg font-semibold">
                        {editId ? 'Edit Service Provider' : 'Add Service Provider'}
                    </span>
                    <IconButton onClick={handleCloseModal} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                label="Service Type"
                                name="ServiceType"
                                type='select'
                                value={formik.values.ServiceType}
                                onChange={formik.handleChange}
                                error={formik.touched.ServiceType && Boolean(formik.errors.ServiceType)}
                                helperText={formik.touched.ServiceType && formik.errors.ServiceType}
                                options={brandTypeList}
                            />
                            <FormInput
                                label="Service Provider Name"
                                name="ServiceProvider"
                                placeholder={"Enter Service Provider Name"}
                                value={formik.values.ServiceProvider}
                                onChange={formik.handleChange}
                                error={formik.touched.ServiceProvider && Boolean(formik.errors.ServiceProvider)}
                                helperText={formik.touched.ServiceProvider && formik.errors.ServiceProvider}
                                options={[{ _id: 1, lookup_value: "option1" }, { _id: 2, lookup_value: "option 2" }]}
                            />
                            <div className="flex flex-col gap-2">
                                <label htmlFor="ProfilePicture" className="text-base font-semibold">
                                    Profile Picture
                                </label>
                                <TextField
                                    fullWidth
                                    id="ProfilePicture"
                                    name="ProfilePicture"
                                    placeholder="Upload an image"
                                    size="small"
                                    type="file"
                                    className="custom-input"
                                    inputProps={{ accept: "image/*" }}
                                    onChange={handleFileUpload}
                                    error={formik.touched.ProfilePicture && Boolean(formik.errors.ProfilePicture)}
                                    helperText={formik.touched.ProfilePicture && formik.errors.ProfilePicture}
                                />
                                {formik.values.ProfilePicture && (
                                    <div className="mt-2">
                                        <img
                                            src={formik.values.ProfilePicture}
                                            alt="Logo Preview"
                                            className="w-32 h-32 object-cover border rounded-md"
                                        />
                                    </div>
                                )}
                            </div>
                            <FormInput
                                label="Contact Number"
                                name="ContactNumber"
                                placeholder="Enter Contact Number"
                                value={formik.values.ContactNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.ContactNumber && Boolean(formik.errors.ContactNumber)}
                                helperText={formik.touched.ContactNumber && formik.errors.ContactNumber}
                            />
                            <FormInput
                                label="Email Address"
                                name="EmailAddress"
                                placeholder={"Enter email address"}
                                value={formik.values.EmailAddress}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.EmailAddress && Boolean(formik.errors.EmailAddress)
                                }
                                helperText={formik.touched.EmailAddress && formik.errors.EmailAddress}
                                fullWidth
                            />

                        </div>
                        {/* 🖼 Picture Gallery */}
                        <div className="">
                            <label className="font-semibold">Picture Gallery</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {formik.values?.PictureGallery?.map((img, index) => (
                                    <div key={index} className="relative rounded-md py-2">
                                        {!img ? (
                                            <div className='relative flex items-center gap-2'>
                                                <TextField
                                                    size="small"
                                                    type="file"
                                                    fullWidth
                                                    className="custom-input"
                                                    inputProps={{ accept: "image/*" }}
                                                    onChange={(e) => handleFileUpload1(e, "PictureGallery", index)}
                                                    sx={{
                                                        "& .MuiInputBase-input": {
                                                            padding: "8px 12px",
                                                            height: "auto",
                                                        },
                                                    }}
                                                />
                                                {formik.values.PictureGallery.length > 1 && (<IconButton
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleRemoveFile("PictureGallery", index)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>)}
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
                                    formik.setFieldValue("PictureGallery", [
                                        ...formik.values.PictureGallery,
                                        null,
                                    ])
                                }
                            >
                                + Add More
                            </Button>
                        </div>

                        {/* 🎥 Video Gallery */}
                        <div className="">
                            <label className="font-semibold">Video Gallery</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {formik.values?.VideoGallery?.map((video, index) => (
                                    <div key={index} className="relative rounded-md py-2">
                                        {!video ? (
                                            <div className='relative flex items-center gap-2'>
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    type="file"
                                                    className="custom-input"
                                                    inputProps={{ accept: "video/*" }}
                                                    onChange={(e) => handleFileUpload1(e, "VideoGallery", index)}
                                                    sx={{
                                                        "& .MuiInputBase-input": {
                                                            padding: "8px 12px",
                                                            height: "auto",
                                                        },
                                                    }}
                                                />
                                                {formik.values.VideoGallery.length > 1 && (<IconButton
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleRemoveFile("VideoGallery", index)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>)}
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
                                    formik.setFieldValue("VideoGallery", [
                                        ...formik.values.VideoGallery,
                                        null,
                                    ])
                                }
                            >
                                + Add More
                            </Button>
                        </div>
                        {/* 🔗 Product Video URL */}
                        <div>
                            <label className="font-semibold">Video URL</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {formik.values.URL.map((url, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center relative space-x-2 mb-2 py-1"
                                    >
                                        <FormInput
                                            name={`URL[${index}]`}
                                            placeholder="Enter video URL"
                                            value={url}
                                            onChange={formik.handleChange}
                                            error={formik.touched.URL && formik.errors.URL?.[index]}
                                        />

                                        {formik.values.URL.length > 1 && (
                                            <IconButton
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
                        <div className="flex gap-2 flex-col">
                            <label className="text-base font-semibold">Is Verified</label>
                            <div className="flex gap-4">
                                {[
                                    { _id: 1, type: true, lookup_value: "Yes" },
                                    { _id: 2, type: false, lookup_value: "No" },
                                ].map((level) => (
                                    <label key={level._id} className="flex items-center cursor-pointer gap-2">
                                        <input
                                            type="radio"
                                            name="IsVerified"
                                            value={String(level.type)}
                                            checked={formik.values.IsVerified === level.type}
                                            onChange={() => formik.setFieldValue("IsVerified", level.type)}
                                        />
                                        <span>{level.lookup_value}</span>
                                    </label>
                                ))}
                            </div>
                            {formik.touched.IsVerified && formik.errors.IsVerified && (
                                <span className="text-red-500 text-sm">{formik.errors.IsVerified}</span>
                            )}
                        </div>
                        <div className="flex justify-end mt-4 gap-3">
                            <FormButton
                                type="button"
                                onClick={handleCloseModal}
                                variant="outlined"
                            >
                                Cancel
                            </FormButton>
                            <FormButton
                                type="submit"
                                variant="contained"
                                disabled={formik.isSubmitting}
                            >
                                {editId ? 'Update' : 'Add'}
                            </FormButton>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ServiceProvider;
