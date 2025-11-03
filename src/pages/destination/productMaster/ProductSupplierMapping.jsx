import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import FormInput from "../../../components/common/FormInput";
import FormButton from "../../../components/common/FormButton";
import SectionHeader from "../../../components/common/SectionHeader";
import { __getCommenApiDataList } from "../../../utils/api/commonApi";
import { __postApiData } from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";
import { Popup } from "../../../components/common/Popup";

const ProductSupplierMapping = () => {
    const [editId, setEditId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mappingList, setMappingList] = useState({ data: [], loading: false });
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const { userDetails } = useAuth();
    const [stationList, setStationList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [variantList, setVariantList] = useState([]);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [menuRowId, setMenuRowId] = useState(null);
    const [supplierId, setSupplierId] = useState("");
    const [availableStock, setAvailableStock] = useState("");
    const [inventoryDetails, setInventoryDetails] = useState({});
    const [openGallery, setOpenGallery] = useState(false);

    const handleMenuOpen = (event, rowId) => {
        setMenuAnchorEl(event.currentTarget);
        setMenuRowId(rowId);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
        setMenuRowId(null);
    };

    const handleCloseGallery = () => setOpenGallery(false);

    const formik = useFormik({
        initialValues: {
            StationId: "",
            ProductId: "",
            ProductVariantId: "",
            IsActive: true,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            StationId: Yup.string().required("Station is required"),
            ProductId: Yup.string().required("Product is required"),
            ProductVariantId: Yup.string().required("Product Variant is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                setIsLoading(true);
                const payload = { ...values, _id: editId || null, AssetId: userDetails?.LoginAssetId };
                const res = await __postApiData("/api/v1/admin/SaveProductSupplierMapping", payload);
                if (res?.response?.response_code === "200") {
                    toast.success(editId ? "Updated successfully" : "Added successfully");
                    resetForm();
                    setEditId(null);
                    getProductSupplierMappingList();
                } else toast.error(res?.response?.response_message || "Failed to save");
            } catch {
                toast.error("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        },
    });

    const { values, errors, touched, setFieldValue, handleSubmit } = formik;

    const getProductSupplierMappingList = async () => {
        try {
            setMappingList((p) => ({ ...p, loading: true }));
            const res = await __postApiData("/api/v1/admin/listProductSupplierMapping");
            setMappingList({ loading: false, data: res?.data?.list || [] });
        } catch {
            toast.error("Failed to fetch data");
            setMappingList({ loading: false, data: [] });
        }
    };

    const getProductList = async () => {
        try {
            const res = await __postApiData("/api/v1/admin/listProducts");
            setProductList(
                res.data?.list?.map((i) => ({ _id: i._id, lookup_value: `${i.ProductName} - ${i.ProductSKU}` })) || []
            );
        } catch {
            setProductList([]);
        }
    };

    const getProductVariantList = async () => {
        try {
            const res = await __postApiData("/api/v1/admin/listProductVariants", {
                ProductId: formik.values.ProductId,
            });
            setVariantList(
                res.data?.list?.map((i) => ({ _id: i._id, lookup_value: `${i.Color} - ${i.Size}` })) || []
            );
        } catch {
            setVariantList([]);
        }
    };

    const fetchStations = async () => {
        try {
            const data = await __getCommenApiDataList({ lookup_type: "station" });
            setStationList(data);
        } catch {
            setStationList([]);
        }
    };

    useEffect(() => {
        getProductSupplierMappingList();
        fetchStations();
        getProductList();
    }, []);

    useEffect(() => {
        if (formik.values.ProductId) getProductVariantList();
    }, [formik.values.ProductId]);

    const handleEdit = (item) => {
        setEditId(item._id);
        setFieldValue("StationId", item?.StationId?._id);
        setFieldValue("ProductId", item?.ProductId?._id);
        setFieldValue("ProductVariantId", item?.ProductVariantId?._id);
        setFieldValue("IsActive", item?.IsActive);
    };

    const handleDelete = async (row) => {
        const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
        if (result.isConfirmed) {
            const res = await __postApiData("/api/v1/admin/deleteProductSupplierMapping", {
                ProductSupplierMappingId: row?._id,
            });
            if (res?.response?.response_code === "200") {
                toast.success("Deleted successfully");
                getProductSupplierMappingList();
            } else toast.error(res?.response?.response_message || "Failed to delete");
        }
    };

    const handleAddAvailableStock = async (e) => {
        e.preventDefault();
        try {
            const res = await __postApiData("/api/v1/admin/SaveInventory", {
                ProductSupplierMappingId: supplierId,
                _id: inventoryDetails?._id || null,
                AvailableStock: availableStock,
            });
            if (res?.response?.response_code === "200") {
                toast.success("Inventory added successfully");
                setAvailableStock("");
                setOpenGallery(false);
                getProductSupplierMappingList();
            } else toast.error(res?.response?.response_message || "Failed to add inventory");
        } catch {
            toast.error("Something went wrong while saving inventory");
        }
    };

    const getInventoryDetails = async (id) => {
        try {
            const res = await __postApiData("/api/v1/admin/GetInventory", { ProductSupplierMappingId: id });
            const data = res?.data || {};
            setInventoryDetails(data);
            setAvailableStock(data?.AvailableStock || "");
        } catch {
            setInventoryDetails({});
            setAvailableStock("");
        }
    };

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
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        {
            field: "StationId",
            headerName: "Station",
            flex: 1,
            minWidth: 150,
            headerClassName: "health-table-header-style",
            renderCell: (p) => p.row?.StationId?.lookup_value || "N/A",
        },
        {
            field: "ProductId",
            headerName: "Product",
            flex: 1,
            minWidth: 180,
            headerClassName: "health-table-header-style",
            renderCell: (p) => p.row?.ProductId?.ProductName || "N/A",
        },
        {
            field: "ProductVariantId",
            headerName: "Variant",
            flex: 1,
            minWidth: 180,
            headerClassName: "health-table-header-style",
            renderCell: (p) =>
                p.row?.ProductVariantId ? `${p.row?.ProductVariantId?.Color || ""} / ${p.row?.ProductVariantId?.Size || ""}` : "N/A",
        },
        {
            field: "IsActive",
            headerName: "Active",
            minWidth: 100,
            headerClassName: "health-table-header-style",
            renderCell: (p) => (p.row?.IsActive ? "✅" : "❌"),
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
                <>
                    <IconButton onClick={(e) => handleMenuOpen(e, params.row._id)}>
                        <MoreVertIcon sx={{ color: "gray" }} />
                    </IconButton>

                    <Menu
                        anchorEl={menuAnchorEl}
                        open={menuRowId === params.row._id}
                        onClose={handleMenuClose}
                        PaperProps={{
                            sx: {
                                borderRadius: "12px",
                                boxShadow:
                                    "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
                            },
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                handleEdit(params.row);
                                handleMenuClose();
                            }}
                        >
                            Edit
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleDelete(params.row);
                                handleMenuClose();
                            }}
                        >
                            Delete
                        </MenuItem>
                        <MenuItem
                            onClick={async () => {
                                setSupplierId(params.row._id);
                                await getInventoryDetails(params.row._id);
                                setOpenGallery(true);
                                handleMenuClose();
                            }}
                        >
                            Add Inventory
                        </MenuItem>
                    </Menu>
                </>
            ),
        },
    ];

    return (
        <div className="p-4 bg-white">
            <SectionHeader title="Product Supplier Mapping" description="Map station, product, and product variant together." />

            <form onSubmit={handleSubmit} className="shadow-card p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Station"
                        type="select"
                        name="StationId"
                        value={values.StationId}
                        options={stationList}
                        onChange={(e) => setFieldValue("StationId", e.target.value)}
                        error={touched.StationId && Boolean(errors.StationId)}
                        helperText={touched.StationId && errors.StationId}
                    />

                    <FormInput
                        label="Product"
                        type="select"
                        name="ProductId"
                        value={values.ProductId}
                        options={productList}
                        onChange={(e) => setFieldValue("ProductId", e.target.value)}
                        error={touched.ProductId && Boolean(errors.ProductId)}
                        helperText={touched.ProductId && errors.ProductId}
                    />

                    <FormInput
                        label="Product Variant"
                        type="select"
                        name="ProductVariantId"
                        value={values.ProductVariantId}
                        options={variantList}
                        onChange={(e) => setFieldValue("ProductVariantId", e.target.value)}
                        error={touched.ProductVariantId && Boolean(errors.ProductVariantId)}
                        helperText={touched.ProductVariantId && errors.ProductVariantId}
                    />

                    <div className="flex items-center gap-2 mt-3">
                        <input
                            id="isActive"
                            type="checkbox"
                            checked={values.IsActive}
                            onChange={(e) => setFieldValue("IsActive", e.target.checked)}
                        />
                        <label htmlFor="isActive" className="font-semibold">
                            Is Active
                        </label>
                    </div>
                </div>

                <div className="col-span-2 mt-4">
                    <FormButton disabled={isLoading}>{isLoading ? "Saving..." : editId ? "Update" : "Save"}</FormButton>
                </div>
            </form>

            <div className="bg-white pb-2 rounded-xl my-16">
                <DataGrid
                    rows={mappingList.data}
                    columns={columns}
                    loading={mappingList.loading}
                    autoHeight
                    pagination
                    getRowId={(row) => row._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10]}
                />
            </div>

            <Dialog open={openGallery} onClose={handleCloseGallery} maxWidth="md" fullWidth>
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Add Available Stock</span>
                    <IconButton onClick={handleCloseGallery}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <Divider />

                <DialogContent>
                    <form onSubmit={handleAddAvailableStock}>
                        <FormInput
                            label="Available Stock"
                            name="AvailableStock"
                            placeholder="Enter Available Stock"
                            value={availableStock}
                            onChange={(e) => setAvailableStock(e.target.value)}
                            inputMode="numeric"
                        />
                        <div className="mt-4">
                            <FormButton type="submit">Save</FormButton>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProductSupplierMapping;
