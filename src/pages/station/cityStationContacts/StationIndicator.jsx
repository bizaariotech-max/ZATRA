import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'
import { useFormik } from 'formik'
import { __getCommenApiDataList } from '../../../utils/api/commonApi'
import { useAuth } from '../../../context/AuthContext'
import { toast } from 'react-toastify'
import DatagridRowAction from '../../../components/common/DatagridRowAction'
import { DataGrid } from '@mui/x-data-grid'
import { __postApiData } from '../../../utils/api'

const StationIndicator = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [indicatorTypeList, setIndicatorTypeList] = useState([]);
    const [stationIndicator, setStationIndicator] = useState({
        loading: false,
        data: [],
    });
    const { userDetails } = useAuth();
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
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
            field: "IndicatorType",
            headerName: "Indicator Type",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.lookup_value || "N/A"}</span>,
        },
        {
            field: "UnitValue",
            headerName: "Value Unit",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.UnitValue || "N/A"}</span>,
        },
        {
            field: "Value",
            headerName: "Value",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.Value || "N/A"}</span>,
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
            renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => console.log(params.row)}   // ✅ Pass handler
                onDelete={() => console.log(params.row)} />,
        }
    ];
    const formik = useFormik({
        initialValues: {
            IndicatorType: "",
            UnitValue: "",
            Value: ""
        },
        onSubmit: async (values, { resetForm }) => {
            const payload = { ...values, StationId: userDetails?.StationId };
            try {
                setIsLoading(true);
                const res = await __postApiData("/api/v1/admin/SaveCityIndicator", payload);
                if (res.response && res.response.response_code === "200") {
                    toast.success("Station Indicator added successfully");
                    resetForm();
                } else {
                    toast.error(res.response.response_message || "Failed to add Station Indicator");
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to submit:", error);
                setIsLoading(false);
            }
        },
    })

    ///========== fetch data from api ============\\
    const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
        try {
            const data = await __getCommenApiDataList({
                lookup_type: lookupTypes,
                parent_lookup_id: parent_lookup_id || null,
            })
            setIndicatorTypeList(data);
        } catch (error) {
            console.error(`Error fetching ${stateKey}:`, error);
        }
    }
    // const getStationIndicator = async () => {
    //     try {
    //         setStationIndicator((prev) => ({ ...prev, loading: true }));

    //         // ✅ Call your API (replace URL with your actual endpoint)
    //         const response = await axios.get("/api/v1/admin/getStationIndicatorList");
    //         console.log("API Response:", response);
    //         // ✅ Update state with API data
    //         setStationIndicator({
    //             loading: false,
    //             data: response.data?.data || [], // assuming API response has a 'data' field
    //         });
    //     } catch (error) {
    //         console.error("Error fetching station indicators:", error);
    //         setStationIndicator({
    //             loading: false,
    //             data: [],
    //         });
    //     }
    // };


    useEffect(() => {
        fetchData(['station_indicator_type'],);
        // getStationIndicator()
    }, []);
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="City/Station Indicator"
                description="Add or update the required details for the city/station indicator to keep records accurate and complete."
            />
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4 mt-8 shadow-card rounded-md p-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Zatra Name */}
                    <FormInput
                        label="Indicator Type"
                        name="IndicatorType"
                        type='select'
                        placeholder="Select a option"
                        options={indicatorTypeList}
                        value={formik.values?.IndicatorType}
                        onChange={(e) => {
                            formik.setFieldValue("IndicatorType", e.target.value);
                            const selected = indicatorTypeList.find((opt) => opt._id === e.target.value);
                            if (selected) {
                                formik.setFieldValue("UnitValue", selected?.lookup_value?.split("(")[1]?.replace(")", ""));
                            }
                        }}
                        error={formik.touched.IndicatorType && formik.errors.IndicatorType}
                        helperText={formik.touched.IndicatorType && formik.errors.IndicatorType}
                    />
                    <FormInput
                        label="Value Unit"
                        name="UnitValue"
                        placeholder="Auto Filled Based on Indicator Type"
                        readOnly
                        value={formik.values?.UnitValue}
                        onChange={formik.handleChange}
                        error={formik.touched?.UnitValue && formik.errors?.UnitValue}
                        helperText={formik.touched?.UnitValue && formik.errors?.UnitValue}
                    />
                    <FormInput
                        label="Value"
                        name="Value"
                        placeholder="Enter Value"
                        inputMode={"numeric"}
                        value={formik.values?.Value}
                        onChange={formik.handleChange}
                        error={formik.touched?.Value && formik.errors?.Value}
                        helperText={formik.touched?.Value && formik.errors?.Value}
                    />

                </div>
                <div className="mt-4">
                    <FormButton disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                    </FormButton>
                </div>
            </form>
            {/* <div className="bg-white pb-2 rounded-xl my-16 ">
                <DataGrid
                    rows={indicatorList}
                    columns={columns}
                    loading={isLoading}
                    autoHeight
                    pagination
                    getRowId={(row) => row._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10]}
                />
            </div> */}
        </div>
    )
}

export default StationIndicator