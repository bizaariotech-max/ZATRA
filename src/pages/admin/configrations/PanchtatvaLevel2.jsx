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

const PanchtatvaLevel2 = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [dataList, setDataList] = useState({
        categoryList: [],
        subCategoryList: [],
    });
    const [formData, setFormData] = useState({
        subCategoryName: '',
        categoryId: '',
    });
    const [editId, setEditId] = useState(null);
    const { categoryList, subCategoryList } = dataList;
    ///========== columns for datagrid table list ============\\
    const columns = [
        {
            field: "_id", headerName: "Sr. No", width: 90, headerClassName: "health-table-header-style", headerAlign: "center",
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
            field: "parent_lookup_name",
            headerName: "Panchtatva Level 1",
            headerClassName: "health-table-header-style",
            width: 200,
            renderCell: (params) => <span>{params.row?.parent_lookup_name || "N/A"}</span>,
        },
        {
            field: "lookup_value",
            headerName: "Panchtatva Level 2",
            headerClassName: "health-table-header-style",
            width: 200,
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
            renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => handleEdit(params.row)} onDelete={() => handleDelete(params.row)} />,
        }
    ];

    //========== function to update state dataList ============\\
    const updateState = (data) => setDataList((prevState) => ({ ...prevState, ...data }));

    //========== handle form input change ============\\
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    ///========== handle form submit ============\\
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData?.subCategoryName?.trim() && formData?.subCategoryName?.length === 0) {
            toast.error("Please enter a valid Panchtatva Level 2");
            return;
        }
        setIsLoading(true);
        try {
            const payload = {
                "lookup_id": editId || null,
                "lookup_value": formData?.subCategoryName,
                "lookup_type": "panchtatva_sub_category",
                "parent_lookup_type": "panchtatva_category",
                "parent_lookup_id": formData?.categoryId || null,
            }
            const res = await __postApiData('/api/v1/admin/SaveLookup', payload);
            if (res.response && res.response.response_code === "200") {
                toast.success(editId ? "Panchtatva Level 2 updated successfully" : "Panchtatva Level 2 added successfully");
                setFormData({
                    subCategoryName: '',
                    categoryId: '',
                });
                setEditId(null);
                setIsLoading(false);
                fetchData(['panchtatva_sub_category'], "subCategoryList");
            } else {
                toast.error(res.response.response_message || "Failed to add Panchtatva Level 2");
            }

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

            if (data && Array.isArray(data) && data.length > 0) {
                updateState({ [stateKey]: data, });
            }
            else if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
                updateState({ [stateKey]: data.data, });
            } else if (data && data.list && Array.isArray(data.list) && data.list.length > 0) {
                updateState({ [stateKey]: data.list, });
            }
            else {
                // console.warn(`No data found for ${stateKey}:`, data);
                updateState({ [stateKey]: [], });
            }
        } catch (error) {
            console.error(`Error fetching ${stateKey}:`, error);
        }
    }

    useEffect(() => {
        fetchData(['panchtatva_category'], "categoryList");
        fetchData(['panchtatva_sub_category'], "subCategoryList");
    }, []);

    ///========== handle edit ============\\
    const handleEdit = (row) => {
        setEditId(row._id);
        setFormData({
            subCategoryName: row?.lookup_value || '',
            categoryId: row?.parent_lookup_id || '',
        })
    };

    ///========== handle delete  ============\\
    const handleDelete = async (row) => {
        try {
            const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
            if (result.isConfirmed) {

                const res = await __postApiData(`/api/v1/admin/DeleteLookup`, { LookupId: row?._id });
                if (res?.response?.response_code === "200") {
                    toast.success("Panchtatva Level 2 deleted successfully");
                    fetchData(['panchtatva_sub_category'], "subCategoryList");
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Enter Details for Panchtatva Level 2"
                description="Add or update the required details for the Panchtatva Level 2 to keep records accurate and complete."
            />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8 shadow-card  rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Panchtatva Level 1"
                        name="categoryId"
                        placeholder="Select Panchtatva Level 1"
                        type="select"
                        value={formData?.categoryId}
                        onChange={handleChange}
                        options={categoryList}
                    />

                    <FormInput
                        label="Panchtatva Level 2"
                        name="subCategoryName"
                        placeholder="Enter Panchtatva Level 2"
                        value={formData?.subCategoryName}
                        onChange={handleChange}
                    />

                </div>

                <div className="mt-4">
                    <FormButton disable={isLoading}>{isLoading ? editId ? "Updating..." : "Adding..." : editId ? "Update" : "Save"}</FormButton>
                </div>
            </form>
            <div className="bg-white pb-2 rounded-xl my-16 ">
                <DataGrid
                    rows={subCategoryList}
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

export default PanchtatvaLevel2