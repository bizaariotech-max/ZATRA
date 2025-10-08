import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { __getCommenApiDataList } from '../../../utils/api/commonApi';
import { __postApiData } from '../../../utils/api';
import { toast } from 'react-toastify';
import DatagridRowAction from '../../../components/common/DatagridRowAction';
import { Popup } from '../../../components/common/Popup';
import SectionHeader from '../../../components/common/SectionHeader';
import FormInput from '../../../components/common/FormInput';
import FormButton from '../../../components/common/FormButton';
const ProductCategory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [categoryList, setCategoryList] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [editId, setEditId] = useState(null);
    ///========== columns for datagrid table list ============\\
    const columns = [
        {
            field: "_id", headerName: "Sr. No", width: 90, headerClassName: "health-table-header-style", headerAlign: "center",
            align: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            // renderCell: (params) => <span>{params.row?._id || "N/A"}</span>,
            renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        {
            field: "lookup_value",
            headerName: "Product Category",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.lookup_value || "N/A"}</span>,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            width: 150,
            headerClassName: "health-table-header-style",
            headerAlign: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            align: "center",
            renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => handleEdit(params.row)}   // ✅ Pass handler
                onDelete={() => handleDelete(params.row)} />,
        }
    ];

    ///========== handle edit ============\\
    const handleEdit = (row) => {
        setCategoryName(row.lookup_value);
        setEditId(row._id);
    };

    ///========== handle delete  ============\\
    const handleDelete = async (row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {

                const res = await __postApiData(`/api/v1/admin/DeleteLookup`, { LookupId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Product Category deleted successfully");
                    fetchData(['product_category']);
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };

    ///========== handle form submit ============\\
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryName?.trim() && categoryName?.length === 0) {
            toast.error("Please enter a valid Product Category");
            return;
        }
        setIsLoading(true);
        try {
            const payload = {
                "lookup_id": editId || null,
                "lookup_value": categoryName,
                "lookup_type": "product_category",
                "parent_lookup_type": "",
                "parent_lookup_id": null
            }
            const res = await __postApiData('/api/v1/admin/SaveLookup', payload);
            if (res.response && res.response.response_code === "200") {
                toast.success(editId ? "Product Category updated successfully" : "Product Category added successfully");
                setCategoryName("");
                setEditId(null);

                fetchData(['product_category']);
            } else {
                toast.error(res.response.response_message || "Failed to add Product Category");
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Error submitting form:", error);
        }

    };

    ///========== fetch data from api ============\\
    const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
        try {
            const data = await __getCommenApiDataList({
                lookup_type: lookupTypes,
                parent_lookup_id: parent_lookup_id || null,
            })
            setCategoryList(data);
        } catch (error) {
            console.error(`Error fetching ${stateKey}:`, error);
        }
    }

    useEffect(() => {
        fetchData(['product_category'],);
    }, []);
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Enter Details for Product Category"
                description="Add or update the required details for the product category to keep records accurate and complete."
            />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8 shadow-card  rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <FormInput
                        label="Product Category"
                        name="categoryName"
                        placeholder="Enter Product Category"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />

                </div>

                <div className="mt-4">
                    <FormButton disable={isLoading}> {isLoading ? (editId ? "Updating..." : "Adding...") : editId ? "Update" : "Save"}</FormButton>
                </div>
            </form>
            <div className="bg-white pb-2 rounded-xl my-16 ">
                <DataGrid
                    rows={categoryList}
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

        </div>
    )
}

export default ProductCategory