import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { __postApiData } from '../../../utils/api'
import { __getCommenApiDataList } from '../../../utils/api/commonApi'
import { useAuth } from '../../../context/AuthContext'
import { DataGrid } from '@mui/x-data-grid'
import DatagridRowAction from '../../../components/common/DatagridRowAction'
import * as Yup from 'yup';

const validationSchema = Yup.object({
    ContactPersonName: Yup.string().required('Contact Person Name is required'),
    HelplineNumber: Yup.string().required('Helpline Number is required'),
    Email: Yup.string().email('Invalid email').required('Email is required'),
    AddressLine1: Yup.string().nullable(),
    AddressLine2: Yup.string().nullable(),
    PostalCode: Yup.string().nullable(),
});

const TouristHelpline = () => {
    const { userDetails } = useAuth();
    const [list, setList] = useState({ data: [], loading: false });
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [isLoading, setIsLoading] = useState(false);

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
            field: "ContactPersonName",
            headerName: "Contact Person Name",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.ContactPersonName || "N/A"}</span>,
        },
        {
            field: "HelplineNumber",
            headerName: "Helpline Number",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.HelplineNumber || "N/A"}</span>,
        },
        {
            field: "Email",
            headerName: "Email",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.Email || "N/A"}</span>,
        },
        {
            field: "AddressLine1",
            headerName: "Address Line 1",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.AddressLine1 || "N/A"}</span>,
        },
        {
            field: "AddressLine2",
            headerName: "Address Line 2",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.AddressLine2 || "N/A"}</span>,
        },
        {
            field: "PostalCode",
            headerName: "Postal Code",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.PostalCode || "N/A"}</span>,
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
            renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => console.log(params.row)}   // ✅ Pass handler
                onDelete={() => console.log(params.row)} />,
        }
    ];

    const formik = useFormik({
        initialValues: {
            ContactPersonName: "",
            HelplineNumber: "",
            Email: "",
            AddressLine1: "",
            AddressLine2: "",
            PostalCode: ""
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const payload = { ...values, CityId: userDetails?.StationId };
            try {
                setIsLoading(true);
                const res = await __postApiData("/api/v1/admin/SaveHelpline", payload);
                if (res.response && res.response.response_code === "200") {
                    toast.success("Helpline Number added successfully");
                    resetForm();
                    getStationIndicator();
                } else {
                    toast.error(res.response.response_message || "Failed to add Helpline Number");
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to submit:", error);
                setIsLoading(false);
            }
        }
    })

    const getStationIndicator = async () => {
        try {
            setList((prev) => ({ ...prev, loading: true }));
            const response = await __postApiData("/api/v1/app/HelplineList", { CityId: userDetails?.StationId });
            setList({
                loading: false,
                data: response.data?.list || [], // assuming API response has a 'data' field
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setList({
                loading: false,
                data: [],
            });
        }
    };

    useEffect(() => {
        getStationIndicator()
    }, []);
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Tourist Helpline"
                description="Add or update the required details for the tourist helpline to keep records accurate and complete."
            />
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4 mt-8 shadow-card rounded-md p-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <FormInput
                        label="Contact Person Name"
                        name="ContactPersonName"
                        placeholder="Enter Contact Person Name"
                        value={formik.values?.ContactPersonName}
                        onChange={formik.handleChange}
                        error={formik.touched?.ContactPersonName && formik.errors?.ContactPersonName}
                        helperText={formik.touched?.ContactPersonName && formik.errors?.ContactPersonName}
                    />
                    <FormInput
                        label="Helpline Number"
                        name="HelplineNumber"
                        placeholder="Enter Helpline Number"
                        value={formik.values?.HelplineNumber}
                        onChange={formik.handleChange}
                        error={formik.touched?.HelplineNumber && formik.errors?.HelplineNumber}
                        helperText={formik.touched?.HelplineNumber && formik.errors?.HelplineNumber}
                        inputMode={"numeric"}
                    />
                    <FormInput
                        label="Email"
                        name="Email"
                        placeholder="Enter email"
                        value={formik.values?.Email}
                        onChange={formik.handleChange}
                        error={formik.touched?.Email && formik.errors?.Email}
                        helperText={formik.touched?.Email && formik.errors?.Email}
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
                        inputMode={"numeric"}
                        placeholder="Enter Postal Code"
                        value={formik.values?.PostalCode}
                        onChange={formik.handleChange}
                        error={formik.touched?.PostalCode && formik.errors?.PostalCode}
                        helperText={formik.touched?.PostalCode && formik.errors?.PostalCode}
                    />

                </div>
                <div className="mt-4">
                    <FormButton disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
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
                    getRowId={(row) => row._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </div>
    )
}

export default TouristHelpline
