import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import FormInput from "../../../components/common/FormInput";
import FormButton from "../../../components/common/FormButton";
import { DataGrid } from "@mui/x-data-grid";
import DatagridRowAction from "../../../components/common/DatagridRowAction";
import { Popup } from "../../../components/common/Popup";
import SectionHeader from "../../../components/common/SectionHeader";
import { __getCommenApiDataList } from "../../../utils/api/commonApi";
import { __postApiData } from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";

const ProductSupplierMapping = () => {
    const [editId, setEditId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mappingList, setMappingList] = useState({ data: [], loading: false });
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const { userDetails } = useAuth();
    const [stationList, setStationList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [variantList, setVariantList] = useState([]);
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
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        {
            field: "StationId",
            headerName: "Station",
            flex: 1,
            minWidth: 150,
            headerClassName: "health-table-header-style",
            renderCell: (params) => <span>{params.row?.StationId?.lookup_value || "N/A"}</span>,
        },
        {
            field: "ProductId",
            headerName: "Product",
            flex: 1,
            minWidth: 180,
            headerClassName: "health-table-header-style",
            renderCell: (params) => <span>{params.row?.ProductId?.ProductName || "N/A"}</span>,
        },
        {
            field: "ProductIdSKU",
            headerName: "Product SKU",
            flex: 1,
            minWidth: 180,
            headerClassName: "health-table-header-style",
            renderCell: (params) => <span>{params.row?.ProductVariantId?.VariantSKU || "N/A"}</span>,
        },
        {
            field: "ProductVariantId",
            headerName: "Variant",
            flex: 1,
            minWidth: 180,
            headerClassName: "health-table-header-style",
            renderCell: (params) => (
                <span>{params.row?.ProductVariantId ? `${params.row?.ProductVariantId?.Color || ""} / ${params.row?.ProductVariantId?.Size || ""}` : "N/A"}</span>
            ),
        },
        {
            field: "IsActive",
            headerName: "Active",
            minWidth: 100,
            headerClassName: "health-table-header-style",
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
    // ✅ Formik
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
                } else {
                    toast.error(res?.response?.response_message || "Failed to save");
                }
            } catch (err) {
                toast.error("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        },
    });

    ///========== fetch data from api ============\\
    const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
        try {
            const data = await __getCommenApiDataList({
                lookup_type: lookupTypes,
                parent_lookup_id: parent_lookup_id || null,
            })
            setStationList(data);
        } catch (error) {
            console.error(`Error fetching ${stateKey}:`, error);
        }
    }

    // ======== Get Product List  =========== 
    const getProductList = async () => {
        try {
            const response = await __postApiData("/api/v1/admin/listProducts");
            setProductList(
                response.data?.list?.map((item) => ({
                    _id: item._id,
                    lookup_value: item.ProductName + " - " + item.ProductSKU,
                })) || [],
            );
        } catch (error) {
            console.error("Error fetching data:", error);
            setProductList([]);
        }
    };

    // ========  Get Product Variant List =========
    const getProductVariantList = async () => {
        try {
            const response = await __postApiData("/api/v1/admin/listProductVariants", {
                ProductId: formik.values.ProductId
            });
            setVariantList(
                response.data?.list?.map((item) => ({
                    _id: item._id,
                    lookup_value: item.Color + " - " + item.Size,
                })))

        } catch (error) {
            console.error("Error fetching data:", error);
            setVariantList([]);
        }
    };
    useEffect(() => {
        if (formik.values.ProductId) {
            getProductVariantList();
        }
    }, [formik.values.ProductId]);
    // ✅ Fetch list
    const getProductSupplierMappingList = async () => {
        try {
            setMappingList((p) => ({ ...p, loading: true }));
            const res = await __postApiData("/api/v1/admin/listProductSupplierMapping");
            setMappingList({
                loading: false,
                data: res?.data?.list || [],
            });
        } catch (err) {
            toast.error("Failed to fetch data");
            setMappingList({ loading: false, data: [] });
        }
    };

    useEffect(() => {
        getProductSupplierMappingList();
        fetchData(['station']);
        getProductList();
    }, []);

    const { values, errors, touched, setFieldValue, handleSubmit } = formik;

    // ✅ Edit handler
    const handleEdit = (item) => {
        setEditId(item._id);
        setFieldValue("StationId", item?.StationId?._id);
        setFieldValue("ProductId", item?.ProductId?._id);
        setFieldValue("ProductVariantId", item?.ProductVariantId?._id);
        setFieldValue("IsActive", item?.IsActive);
    };

    // ✅ Delete handler
    const handleDelete = async (row) => {
        const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
        if (result.isConfirmed) {
            const res = await __postApiData("/api/v1/admin/deleteProductSupplierMapping", { ProductSupplierMappingId: row?._id });
            if (res?.response?.response_code === "200") {
                toast.success("Deleted successfully");
                getProductSupplierMappingList();
            } else {
                toast.error(res?.response?.response_message || "Failed to delete");
            }
        }
    };

    return (
        <div className="p-4 bg-white">
            <SectionHeader title="Product Supplier Mapping" description="Map station, product, and product variant together." />

            {/* ✅ Form Section */}
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

                    {/* Is Active */}
                    <div className="flex items-center gap-2 mt-3">
                        <input
                            id="isActive"
                            type="checkbox"
                            checked={values.IsActive}
                            onChange={(e) => setFieldValue("IsActive", e.target.checked)}
                        />
                        <label htmlFor="isActive" className="font-semibold">Is Active</label>
                    </div>
                </div>

                <div className="col-span-2 mt-4">
                    <FormButton disabled={isLoading}>
                        {isLoading ? "Saving..." : editId ? "Update" : "Save"}
                    </FormButton>
                </div>
            </form>

            {/* ✅ Table Section */}
            <div className="bg-white pb-2 rounded-xl my-16">
                <DataGrid
                    rows={mappingList?.data}
                    columns={columns}
                    loading={mappingList?.loading}
                    autoHeight
                    pagination
                    getRowId={(row) => row._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </div>
    );
};

export default ProductSupplierMapping;
