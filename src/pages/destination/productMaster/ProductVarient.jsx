import React, { useEffect, useState } from "react";
import {
    Button,
    IconButton,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import FormInput from "../../../components/common/FormInput";
import { __postApiData, BASE_URL } from "../../../utils/api";
import FormButton from "../../../components/common/FormButton";
import { useParams } from "react-router-dom";
import DatagridRowAction from "../../../components/common/DatagridRowAction";
import { DataGrid } from "@mui/x-data-grid";
import CollectionsIcon from '@mui/icons-material/Collections';
import { Popup } from "../../../components/common/Popup";
import SectionHeader from "../../../components/common/SectionHeader";

const ProductVarient = () => {
    const [editId, setEditId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [list, setList] = useState({ data: [], loading: false });
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [productVarientList, setProductVarientList] = useState({ data: [], loading: false });
    const { id } = useParams();

    // 🔍 Gallery Modal State
    const [openGallery, setOpenGallery] = useState(false);
    const [galleryData, setGalleryData] = useState({ images: [], videos: [] });

    const handleOpenGallery = (row, type) => {
        if (type === "image") {
            setGalleryData({ images: row?.PictureGallery || [], videos: [] });
        } else if (type === "video") {
            setGalleryData({ images: [], videos: row?.VideoGallery || [] });
        }
        setOpenGallery(true);
    };

    const handleCloseGallery = () => {
        setOpenGallery(false);
        setGalleryData({ images: [], videos: [] });
    };


    // ========== Columns for DataGrid ==========
    const columns = [
        {
            field: "_id",
            headerName: "Sr. No",
            minWidth: 90,
            headerClassName: "health-table-header-style",
            headerAlign: "center",
            align: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        {
            field: "ProductId",
            headerName: "Product Name",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.ProductId?.ProductName || "N/A"}</span>,
        },
        { 
            field: "ProductSKU", 
            headerName: "Product SKU", 
            headerClassName: "health-table-header-style", 
            minWidth: 200, 
            renderCell: (params) => <span>{params.row?.ProductId?.ProductSKU || "N/A"}</span>, 
        },
        {
            field: "Color",
            headerName: "Color",
            minWidth: 150,
            headerClassName: "health-table-header-style",
            renderCell: (params) => <span>{params.row?.Color || "N/A"}</span>,
        },
        {
            field: "Size",
            headerName: "Size",
            minWidth: 120,
            headerClassName: "health-table-header-style",
            renderCell: (params) => <span>{params.row?.Size || "N/A"}</span>,
        },
        {
            field: "PictureGallery",
            headerName: "Images",
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
            field: "VideoGallery",
            headerName: "Videos",
            minWidth: 150,
            headerClassName: "health-table-header-style",
            align: "center",
            renderCell: (params) => {
                const videos = params.row?.VideoGallery || [];
                return videos?.length > 0 ? (
                    <div className="flex gap-1 items-center">
                        <IconButton color="primary" onClick={() => handleOpenGallery(params.row, "video")}>
                            <PlayCircleIcon />
                        </IconButton>
                    </div>
                ) : (
                    "N/A"
                );
            },
        },
        {
            field: "IsActive",
            headerName: "Active",
            headerClassName: "health-table-header-style",
            minWidth: 100,
            renderCell: (params) => (params.row?.IsActive ? "✅" : "❌"),
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

    // ==================  Formik setup ============ 
    const formik = useFormik({
        initialValues: {
            ProductId: id ? id : "",
            Color: "",
            Size: "",
            PictureGallery: [null],
            VideoGallery: [null],
            IsActive: true,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            ProductId: Yup.string().required("Product is required"),
            Color: Yup.string().required("Color is required"),
            Size: Yup.string().required("Size is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                setIsLoading(true);
                const payload = { ...values, _id: editId || null };
                const res = await __postApiData("/api/v1/admin/SaveProductVariant", payload);
                if (res.response && res.response.response_code === "200") {
                    toast.success(editId ? "Data updated successfully" : "Data added successfully");
                    resetForm();
                    setEditId(null);
                    getProductVariantList();
                } else {
                    toast.error(res.response?.response_message || "Failed to add data");
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to submit:", error);
                setIsLoading(false);
            }
        },
    });

    const { values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit } = formik;

    // ======== Get Product List  =========== 
    const getProductList = async () => {
        try {
            setList((prev) => ({ ...prev, loading: true }));
            const response = await __postApiData("/api/v1/admin/listProducts");
            setList({
                loading: false,
                data:
                    response.data?.list?.map((item) => ({
                        _id: item._id,
                        lookup_value: item.ProductName + " - " + item.ProductSKU,
                    })) || [],
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setList({ loading: false, data: [] });
        }
    };

    // ========  Get Product Variant List =========
    const getProductVariantList = async () => {
        try {
            setProductVarientList((prev) => ({ ...prev, loading: true }));
            const response = await __postApiData("/api/v1/admin/listProductVariants");
            setProductVarientList({
                loading: false,
                data: response.data?.list || [],
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setProductVarientList({ loading: false, data: [] });
        }
    };

    useEffect(() => {
        getProductList();
        getProductVariantList();
    }, []);

    //  =========== File upload handler ==============
    const handleFileUpload = async (e, key, index) => {
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
                const updatedFiles = [...values[key]];
                updatedFiles[index] = fileUrl;
                setFieldValue(key, updatedFiles);
                toast.success("File uploaded successfully");
            } else {
                toast.error(response?.data?.response?.response_message || "File upload failed");
            }
        } catch (error) {
            console.error("File upload failed:", error);
            toast.error("Error uploading file");
        }
    };

    //  =================  Add more file input ============== 
    const handleAddMore = (key) => {
        const updated = [...values[key], null];
        setFieldValue(key, updated);
    };

    // ===============  Remove file ====================== 
    const handleRemoveFile = (key, index) => {
        const updated = [...values[key]];
        updated.splice(index, 1);
        setFieldValue(key, updated);
    };

    ///========== Function to handle Edit =========== 
    const handleEdit = (item) => {
        setEditId(item._id);
        setFieldValue("ProductId", item.ProductId?._id);
        setFieldValue("Color", item.Color);
        setFieldValue("Size", item.Size);
        setFieldValue("PictureGallery", item.PictureGallery);
        setFieldValue("VideoGallery", item.VideoGallery);
        setFieldValue("IsActive", item.IsActive);
    };

    //============ function to handle Delete ===========
    const handleDelete = async (row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {

                const res = await __postApiData(`/api/v1/admin/deleteProductVariant`, { ProductVariantId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Product deleted successfully");
                    getProductVariantList();
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Product Variant"
                description="Add or update product variant details and manage media galleries."
            />

            {/* Form */}
            <form onSubmit={handleSubmit} className="shadow-card p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Product Name"
                        type="select"
                        name="ProductId"
                        readOnly={id}
                        value={values.ProductId}
                        options={list?.data}
                        onChange={(e) => setFieldValue("ProductId", e.target.value)}
                        onBlur={handleBlur}
                        error={touched.ProductId && Boolean(errors.ProductId)}
                        helperText={touched.ProductId && errors.ProductId}
                    />

                    <FormInput
                        label="Color"
                        name="Color"
                        placeholder="Enter Color"
                        value={values.Color}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.Color && Boolean(errors.Color)}
                        helperText={touched.Color && errors.Color}
                    />

                    <FormInput
                        label="Size"
                        placeholder="Enter Size"
                        name="Size"
                        value={values.Size}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.Size && Boolean(errors.Size)}
                        helperText={touched.Size && errors.Size}
                    />
                </div>

                {/* Picture Gallery */}
                <div className="mt-4">
                    <label className="font-semibold">Picture Gallery</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {values.PictureGallery.map((img, index) => (
                            <div key={index} className="relative rounded-md py-2">
                                {!img ? (
                                    <div className="flex items-center gap-2">
                                        <TextField
                                            size="small"
                                            type="file"
                                            fullWidth
                                            className="custom-input"
                                            inputProps={{ accept: "image/*" }}
                                            sx={{ "& .MuiInputBase-input": { padding: "8px 12px", height: "auto", }, }}
                                            onChange={(e) => handleFileUpload(e, "PictureGallery", index)}
                                        />
                                        {values.PictureGallery.length > 1 && (
                                            <IconButton color="error" size="small" onClick={() => handleRemoveFile("PictureGallery", index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <img src={img} alt={`gallery-${index}`} className="w-full h-32 object-contain rounded mb-2 border" />
                                        <IconButton color="error" size="small" onClick={() => handleRemoveFile("PictureGallery", index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <Button variant="contained" size="small" color="success" className="mt-2" onClick={() => handleAddMore("PictureGallery")}>
                        + Add More
                    </Button>
                </div>

                {/* Video Gallery */}
                <div className="mt-4">
                    <label className="font-semibold">Video Gallery</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {values.VideoGallery.map((video, index) => (
                            <div key={index} className="relative rounded-md py-2">
                                {!video ? (
                                    <div className="flex items-center gap-2">
                                        <TextField
                                            size="small"
                                            type="file"
                                            fullWidth
                                            className="custom-input"
                                            inputProps={{ accept: "video/*" }}
                                            sx={{ "& .MuiInputBase-input": { padding: "8px 12px", height: "auto", }, }}
                                            onChange={(e) => handleFileUpload(e, "VideoGallery", index)}
                                        />
                                        {values.VideoGallery.length > 1 && (
                                            <IconButton color="error" size="small" onClick={() => handleRemoveFile("VideoGallery", index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <video controls className="w-full h-32 object-contain rounded mb-2 border">
                                            <source src={video} type="video/mp4" />
                                        </video>
                                        <IconButton color="error" size="small" onClick={() => handleRemoveFile("VideoGallery", index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <Button variant="contained" size="small" color="success" className="mt-2" onClick={() => handleAddMore("VideoGallery")}>
                        + Add More
                    </Button>
                </div>

                {/* Active checkbox */}
                <div className="flex items-center gap-2 mt-3">
                    <input
                        id="productAct"
                        type="checkbox"
                        checked={values.IsActive}
                        onChange={(e) => setFieldValue("IsActive", e.target.checked)}
                    />
                    <label htmlFor="productAct" className="font-semibold">
                        Is Active
                    </label>
                </div>

                <div className="mt-4">
                    <FormButton disabled={isLoading}>{isLoading ? "Saving..." : editId ? "Update" : "Save"}</FormButton>
                </div>
            </form>

            {/* ✅ Data Table */}
            <div className="bg-white pb-2 rounded-xl my-16 ">
                <DataGrid
                    rows={productVarientList?.data}
                    columns={columns}
                    loading={productVarientList?.loading}
                    autoHeight
                    pagination
                    getRowId={(row) => row._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10]}
                />
            </div>

            {/* ✅ Gallery Modal */}
            <Dialog open={openGallery} onClose={() => handleCloseGallery()} maxWidth="md" fullWidth>
                <DialogTitle
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                    <span>{galleryData.images.length > 0 ? "Image Gallery" : "Video Gallery"}</span>
                    <IconButton onClick={handleCloseGallery}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <Divider />

                <DialogContent>
                    <div className="container gap-2">
                        {galleryData.images.length > 0 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {galleryData.images.map((img, i) => (
                                        <div key={i}>
                                            <img src={img} alt={`pic-${i}`} className="w-full h-32 object-cover rounded border" />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        {galleryData?.videos?.length > 0 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {galleryData.videos.map((video, i) => (
                                        <div key={i}>
                                            <video controls className="w-full h-32 object-cover rounded border">
                                                <source src={video} type="video/mp4" />
                                            </video>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProductVarient;
