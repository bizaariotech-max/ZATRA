import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'
import {Checkbox, Chip, Stack,} from '@mui/material'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { __postApiData } from '../../../utils/api'
import { __getCommenApiDataList } from '../../../utils/api/commonApi'
import { useAuth } from '../../../context/AuthContext'
import { DataGrid } from '@mui/x-data-grid'
import DatagridRowAction from '../../../components/common/DatagridRowAction'
import { __formatDate } from '../../../utils/api/constantfun'


const Destination = () => {
    const { userDetails } = useAuth();
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [editId, setEditId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dataList, setDataList] = useState({
        panchtatvaList: [],
        panchtatvaSubList: [],
        panchtatvaSubSubList: [],
        establishmentList: [],
    });
    const [list, setList] = useState({ data: [], loading: false });
    const { panchtatvaList, panchtatvaSubList, panchtatvaSubSubList, establishmentList } = dataList;
    const filterData = editId ? list?.data.filter((item) => item._id !== editId) : list?.data;
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
            field: "AssetName",
            headerName: "Assets Name",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            align: "center",
            renderCell: (params) => <span className='px-1 py-4'>{params.row?.AssetName || "N/A"}</span>,
        },
        {
            field: "NearbyAssetIds",
            headerName: "Nearby Assets/Destinations",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            align: "center",
             renderCell: (params) => (
                            Array.isArray(params.row?.NearbyAssetIds) && params.row.NearbyAssetIds.length > 0 ? (
                                <Stack direction="row" flexWrap="wrap" gap={1}>
                                    {params.row.NearbyAssetIds?.map((item, index) => (
                                        <Chip
                                            key={index}
                                            label={item?.name}
                                            color="success"
                                            size="small"
                                            variant="filled"
                                        />
                                    ))}
                                </Stack>
                            ) : (
                                <span>N/A</span>
                            )
                        ),
            // renderCell: (params) => <span className='px-1 py-4'>{params.row?.NearbyAssetIds.length > 0 ? params.row?.NearbyAssetIds?.map((item) => item.AssetName).join(", ") : "N/A"}</span>,
        },
        {
            field: "PanchtatvaCategoryLevel1_Id",
            headerName: "Panchtatva Category Level 1",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            align: "center",
            renderCell: (params) => <span className='px-1 py-4'>{params.row?.PanchtatvaCategoryLevel1_Id?.lookup_value || "N/A"}</span>,
        },
        {
            field: "PanchtatvaCategoryLevel2_Id",
            headerName: "Panchtatva Category Level 2",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span className='px-1 py-4'>{params.row?.PanchtatvaCategoryLevel2_Id?.lookup_value || "N/A"}</span>,
        },
        {
            field: "PanchtatvaCategoryLevel3_Id",
            headerName: "Panchtatva Category Level 3",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span className='px-1 py-4'>{params.row?.PanchtatvaCategoryLevel3_Id?.lookup_value || "N/A"}</span>,
        },
        {
            field: "EstablishmentId",
            headerName: "Establishment Type",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span className='px-1 py-4'>{params.row?.EstablishmentId?.lookup_value || "N/A"}</span>,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            minWidth: 150,
            headerClassName: "health-table-header-style",
            headerAlign: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            align: "center",
            renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => handleEdit(params.row)}
                onDelete={() => console.log(params.row)} />,
        }
    ]

    const formik = useFormik({
        initialValues: {
            AssetName: "",
            NearbyAssetIds: [],
            PanchtatvaCategoryLevel1_Id: "",
            PanchtatvaCategoryLevel2_Id: "",
            PanchtatvaCategoryLevel3_Id: "",
            EstablishmentId: "",
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const payload = { ...values, AssetId: editId || null, IsDestination: true };
                setIsLoading(true);
                const res = await __postApiData("/api/v1/admin/AddEditNewAsset", payload);
                if (res.response && res.response.response_code === "200") {
                    toast.success(editId ? "Data updated successfully" : "Data added successfully");
                    resetForm();
                    setEditId(null);
                    getDestinationList();
                } else {
                    console.log(res);
                    toast.error(res.response?.response_message || res.response?.response_message?.error || "Failed to add Data");
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to submit:", error);
                setIsLoading(false);
            }
        }
    })

    //========== function to update state dataList ============\\
    const updateState = (data) => setDataList((prevState) => ({ ...prevState, ...data }));

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
    ///========== function to get the list of destination ============\\
    const getDestinationList = async () => {
        try {
            setList((prev) => ({ ...prev, loading: true }));
            const response = await __postApiData("/api/v1/admin/GetAssetList", {
                page: paginationModel.page + 1,
                CityId: userDetails?.StationId,
                IsDestination: true
            });
            setList({
                loading: false,
                data: response.data?.list || [],
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setList({
                loading: false,
                data: [],
            });
        }
    }
    useEffect(() => {
        fetchData(["panchtatva_category"], "panchtatvaList");
        fetchData(["establishment_type"], "establishmentList");
        getDestinationList()
    }, []);
    useEffect(() => {
        if (formik.values.PanchtatvaCategoryLevel1_Id) {
            fetchData(["panchtatva_sub_category"], "panchtatvaSubList", formik.values.PanchtatvaCategoryLevel1_Id);
        }
    }, [formik.values.PanchtatvaCategoryLevel1_Id]);
    useEffect(() => {
        if (formik.values.PanchtatvaCategoryLevel2_Id) {
            fetchData(["panchtatva_sub_sub_category"], "panchtatvaSubSubList", formik.values.PanchtatvaCategoryLevel2_Id);
        }
    }, [formik.values.PanchtatvaCategoryLevel2_Id]);

    ///========== function to handle edit action ============\\
    const handleEdit = (row) => {
        setEditId(row._id);
        formik.setValues({
            AssetName: row?.AssetName,
            NearbyAssetIds: row.NearbyAssetIds.length>0  ? row.NearbyAssetIds?.map((item) =>  item?.id) : [],
            PanchtatvaCategoryLevel1_Id: row?.PanchtatvaCategoryLevel1_Id?._id,
            PanchtatvaCategoryLevel2_Id: row?.PanchtatvaCategoryLevel2_Id?._id,
            PanchtatvaCategoryLevel3_Id: row?.PanchtatvaCategoryLevel3_Id?._id,
            EstablishmentId: row?.EstablishmentId?._id,
        });
    }

    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Destinations"
                description="Add or update the required details for the destinations to keep records accurate and complete."
            />
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4 mt-8 shadow-card rounded-md p-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Asset / Destination Name"
                        name="AssetName"
                        placeholder={"Enter Assst / Destination Name"}
                        value={formik.values?.AssetName}
                        onChange={formik.handleChange}
                        error={formik.touched.AssetName && formik.errors.AssetName}
                        helperText={formik.touched.AssetName && formik.errors.AssetName}
                    />
                </div>
                {/* Approval Status */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Nearby Assets/Destinations</label>
                    <div className="flex gap-2 flex-wrap">
                        {filterData?.map((item) => {
                            const checkboxId = `approval-${item._id}`;

                            return (
                                <div key={item._id} className="flex items-center gap-2">
                                    <Checkbox
                                        id={checkboxId}
                                        checked={formik.values?.NearbyAssetIds.includes(item._id)}
                                        onChange={(e) => {
                                            const updatedStatus = e.target.checked
                                                ? [...formik.values.NearbyAssetIds, item._id]
                                                : formik.values.NearbyAssetIds.filter((id) => id !== item._id);

                                            formik.setFieldValue("NearbyAssetIds", updatedStatus);
                                        }}
                                    />
                                    <label
                                        htmlFor={checkboxId}
                                        className="cursor-pointer select-none"
                                    >
                                        {item?.AssetName}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Panchtatva Category Level 1"
                        name="PanchtatvaCategoryLevel1_Id"
                        type='select'
                        placeholder="Select a option"
                        options={panchtatvaList}
                        value={formik.values?.PanchtatvaCategoryLevel1_Id}
                        onChange={formik.handleChange}
                        error={formik.touched.PanchtatvaCategoryLevel1_Id && formik.errors.PanchtatvaCategoryLevel1_Id}
                        helperText={formik.touched.PanchtatvaCategoryLevel1_Id && formik.errors.PanchtatvaCategoryLevel1_Id}
                    />
                    <FormInput
                        label="Panchtatva Category Level 2"
                        name="PanchtatvaCategoryLevel2_Id"
                        type='select'
                        placeholder="Select a option"
                        options={panchtatvaSubList}
                        value={formik.values?.PanchtatvaCategoryLevel2_Id}
                        onChange={formik.handleChange}
                        error={formik.touched.PanchtatvaCategoryLevel2_Id && formik.errors.PanchtatvaCategoryLevel2_Id}
                        helperText={formik.touched.PanchtatvaCategoryLevel2_Id && formik.errors.PanchtatvaCategoryLevel2_Id}
                    />
                    <FormInput
                        label="Panchtatva Category Level 3"
                        name="PanchtatvaCategoryLevel3_Id"
                        type='select'
                        placeholder="Select a option"
                        options={panchtatvaSubSubList}
                        value={formik.values?.PanchtatvaCategoryLevel3_Id}
                        onChange={formik.handleChange}
                        error={formik.touched.PanchtatvaCategoryLevel3_Id && formik.errors.PanchtatvaCategoryLevel3_Id}
                        helperText={formik.touched.PanchtatvaCategoryLevel3_Id && formik.errors.PanchtatvaCategoryLevel3_Id}
                    />
                    <FormInput
                        label="Establishment Type"
                        name="EstablishmentId"
                        type='select'
                        placeholder="Select a option"
                        options={establishmentList}
                        value={formik.values?.EstablishmentId}
                        onChange={formik.handleChange}
                        error={formik.touched.EstablishmentId && formik.errors.EstablishmentId}
                        helperText={formik.touched.EstablishmentId && formik.errors.EstablishmentId}
                    />
                </div>
                <div className="mt-4">
                    <FormButton disabled={isLoading}>
                        {isLoading ? (editId ? "Updating..." : "Saving...") : editId ? "Update" : "Save"}
                    </FormButton>
                </div>
            </form>
            <div className="bg-white pb-2 rounded-xl my-16 ">
                <DataGrid
                    rows={list?.data}
                    columns={columns}
                    loading={list?.loading}
                    autoHeight
                    pagination
                    getRowHeight={() => "auto"}
                    getRowId={(row) => row._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10]}
                    sx={{
                        "& .MuiDataGrid-cell": {
                            lineHeight: "2rem",
                            paddingBottom: "10px",
                            paddingTop: "8px",
                        },
                    }}
                />
            </div>

        </div>
    )
}

export default Destination
