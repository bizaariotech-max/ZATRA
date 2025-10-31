import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { __postApiData, BASE_URL } from "../../../utils/api";
import { Popup } from "../../../components/common/Popup";
import FormInput from "../../../components/common/FormInput";
import FormButton from "../../../components/common/FormButton";
import DatagridRowAction from "../../../components/common/DatagridRowAction";
import SectionHeader from "../../../components/common/SectionHeader";
import { Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import CollectionsIcon from '@mui/icons-material/Collections';
import { useAuth } from "../../../context/AuthContext";

const BrandMaster = () => {
    const { userDetails } = useAuth();
    const [editId, setEditId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [brandList, setBrandList] = useState({ data: [], loading: false });
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    // 🔍 Gallery Modal State
    const [openGallery, setOpenGallery] = useState(false);
    const [galleryData, setGalleryData] = useState([]);

    const handleOpenGallery = (row) => {
        setGalleryData(row?.PictureGallery);
        setOpenGallery(true);
    };
    const handleCloseGallery = () => {
        setOpenGallery(false);
        setGalleryData([]);
    };

    // ✅ Fetch brand list
    const getBrandList = async () => {
        try {
            setBrandList((p) => ({ ...p, loading: true }));
            const res = await __postApiData("/api/v1/admin/listBrands", { AssetId: userDetails?.LoginAssetId });
            setBrandList({
                loading: false,
                data: res?.data?.list || [],
            });
        } catch (err) {
            toast.error("Failed to fetch brands");
            setBrandList({ loading: false, data: [] });
        }
    };

    useEffect(() => {
        getBrandList();
    }, []);

    // ✅ Columns for DataGrid
    const columns = [
        {
            field: "_id",
            headerName: "Sr. No",
            minWidth: 90,
            headerClassName: "health-table-header-style",
            headerAlign: "center",
            align: "center",
            sortable: false,
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
            field: "BrandName",
            headerName: "Brand Name",
            flex: 1,
            headerClassName: "health-table-header-style",
            minWidth: 150,
        },
        {
            field: "Logo",
            headerName: "Logo",
            flex: 1,
            minWidth: 150,
            headerClassName: "health-table-header-style",
            renderCell: (params) =>
                params.row?.Logo ? (
                    <img
                        src={params.row.Logo}
                        alt="logo"
                        style={{ width: 40, height: 40, borderRadius: "8px" }}
                    />
                ) : (
                    "N/A"
                ),
        },
        {
            field: "PictureGallery",
            headerName: "Picture Gallery",
            minWidth: 180,
            headerClassName: "health-table-header-style",
            align: "center",
            renderCell: (params) => {
                const images = params.row?.PictureGallery || [];
                return images.length > 0 ? (
                    <div className="flex gap-1 justify-center">
                        <IconButton color="primary" onClick={() => handleOpenGallery(params.row, "image")}>
                            <CollectionsIcon />
                        </IconButton>
                    </div>
                ) : (
                    "N/A"
                );
            },
        },
        {
            field: "Wordmark",
            headerName: "Wordmark",
            headerClassName: "health-table-header-style",
            flex: 1,
            minWidth: 150,
            renderCell: (params) => params.row?.Wordmark || "N/A",
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            headerClassName: "health-table-header-style",
            headerAlign: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            align: "center",
            renderCell: (params) => (
                <DatagridRowAction
                    row={params.row}
                    onEdit={() => handleEdit(params.row)}
                    onDelete={() => handleDelete(params.row)}
                />
            ),
        },
    ];

    // ✅ Formik setup
    const formik = useFormik({
        initialValues: {
            BrandName: "",
            Logo: "",
            Wordmark: "",
            PictureGallery: [""],
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            BrandName: Yup.string().required("Brand name is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                setIsLoading(true);
                const payload = { ...values, _id: editId || null, AssetId: userDetails?.LoginAssetId };
                const res = await __postApiData("/api/v1/admin/SaveBrand", payload);

                if (res?.response?.response_code === "200") {
                    toast.success(editId ? "Brand updated successfully" : "Brand added successfully");
                    resetForm();
                    setEditId(null);
                    getBrandList();
                } else {
                    toast.error(res?.response?.response_message || "Failed to save brand");
                }
            } catch (err) {
                toast.error("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        },
    });

    const { values, errors, touched, setFieldValue, handleSubmit } = formik;

    // ✅ Edit handler
    const handleEdit = (item) => {
        setEditId(item._id);
        setFieldValue("BrandName", item.BrandName || "");
        setFieldValue("Logo", item.Logo || "");
        setFieldValue("Wordmark", item.Wordmark || "");
        setFieldValue("PictureGallery", item.PictureGallery || [""]);
    };

    // ✅ Delete handler
    const handleDelete = async (row) => {
        const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
        if (result.isConfirmed) {
            const res = await __postApiData("/api/v1/admin/deleteBrand", {
                BrandId: row?._id,
            });
            if (res?.response?.response_code === "200") {
                toast.success("Deleted successfully");
                getBrandList();
            } else {
                toast.error(res?.response?.response_message || "Failed to delete");
            }
        }
    };

    // ✅ Upload Logo via API
    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return toast.error("Please select a file first");
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(`${BASE_URL}/api/v1/common/AddImage`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response?.data?.response?.response_code === "200") {
                const uploadedUrl = response.data?.data[0]?.full_URL || "";
                setFieldValue("Logo", uploadedUrl);
                toast.success("Logo uploaded successfully");
            } else {
                toast.error(response?.data?.response?.response_message || "Upload failed");
            }
        } catch (err) {
            toast.error("Error uploading logo");
        }
    };

    // ✅ Upload Picture Gallery
    const handleFileUploadGallery = async (e, index) => {
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
                const updatedGallery = [...values.PictureGallery];
                updatedGallery[index] = fileUrl;
                setFieldValue("PictureGallery", updatedGallery);
                toast.success("File uploaded successfully");
            } else {
                toast.error(response?.data?.response?.response_message || "Upload failed");
            }
        } catch (error) {
            toast.error("Error uploading image");
        }
    };

    const handleRemoveFile = (index) => {
        const updatedGallery = [...values.PictureGallery];
        updatedGallery.splice(index, 1);
        setFieldValue("PictureGallery", updatedGallery);
    };

    return (
        <div className="p-4 bg-white">
            <SectionHeader title="Brand Master" description="Manage brand details, logos, and gallery images." />

            {/* ✅ Form Section */}
            <form
                onSubmit={handleSubmit}
                className="shadow-card p-4 rounded-md"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Brand Name"
                        name="BrandName"
                        placeholder={"Enter the brand name"}
                        value={values.BrandName}
                        onChange={(e) => setFieldValue("BrandName", e.target.value)}
                        error={touched.BrandName && Boolean(errors.BrandName)}
                        helperText={touched.BrandName && errors.BrandName}
                    />

                    {/* ✅ Logo Upload */}
                    <div>
                        <label className="font-semibold block mb-2">Logo</label>
                        <TextField
                            size="small"
                            type="file"
                            fullWidth
                            inputProps={{ accept: "image/*" }}
                            onChange={handleLogoUpload}
                            className="custom-input"
                        // sx={{ "& .MuiInputBase-input": { padding: "8px 12px", height: "auto", }, }}
                        />
                        {values.Logo && (
                            <img
                                src={values.Logo}
                                alt="logo"
                                className="mt-2 w-20 h-20 object-cover rounded-md border"
                            />
                        )}
                    </div>

                    {/* ✅ Wordmark Text */}
                    <FormInput
                        label="Wordmark"
                        name="Wordmark"
                        placeholder={"Enter the wordmark text"}
                        value={values.Wordmark}
                        onChange={(e) => setFieldValue("Wordmark", e.target.value)}
                    />
                </div>

                {/* ✅ Picture Gallery */}
                <div className="col-span-2">
                    <label className="font-semibold block my-2">Picture Gallery</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        {values.PictureGallery.map((img, index) => (
                            <div key={index} className="flex items-center gap-2">
                                {img ? (
                                    <img src={img} alt="gallery" className="w-full h-32 object-contain rounded border p-2" />
                                ) : (
                                    <TextField
                                        size="small"
                                        type="file"
                                        fullWidth
                                        inputProps={{ accept: "image/*" }}
                                        onChange={(e) => handleFileUploadGallery(e, index)}
                                        className="custom-input"
                                        sx={{ "& .MuiInputBase-input": { padding: "8px 12px", height: "auto", }, }}
                                    />
                                )}
                                {values.PictureGallery.length > 1 && (
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => handleRemoveFile(index)}
                                    // style={{ position: "absolute", top: 5, right: 5 }}
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
                        onClick={() =>
                            setFieldValue("PictureGallery", [...values.PictureGallery, ""])
                        }
                        className="mt-2"
                    >
                        + Add More
                    </Button>
                </div>

                <div className="col-span-2 mt-4">
                    <FormButton disabled={isLoading}>
                        {isLoading ? "Saving..." : editId ? "Update" : "Save"}
                    </FormButton>
                </div>
            </form>

            {/* ✅ Table Section */}
            <div className="bg-white pb-2 rounded-xl my-10">
                <DataGrid
                    rows={brandList?.data}
                    columns={columns}
                    loading={brandList?.loading}
                    autoHeight
                    pagination
                    getRowId={(row) => row._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10]}
                />
            </div>
            <Dialog open={openGallery} onClose={() => handleCloseGallery()} maxWidth="md" fullWidth>
                <DialogTitle
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                    <span>Picture Gallery</span>
                    <IconButton onClick={handleCloseGallery}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <Divider />

                <DialogContent>
                    <div className="container gap-2">
                        {galleryData?.filter((img) => img)?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {galleryData
                                    .filter((img) => img && img.trim() !== "") 
                                    .map((img, i) => (
                                        <div key={i}>
                                            <img
                                                src={img}
                                                alt={`pic-${i}`}
                                                className="w-full h-32 object-contain rounded border"
                                            />
                                        </div>
                                    ))}
                            </div>
                        ):(
                            <div className="flex items-center justify-center h-32">
                                <p className="text-gray-500">No images found</p>    
                            </div>)}
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BrandMaster;
