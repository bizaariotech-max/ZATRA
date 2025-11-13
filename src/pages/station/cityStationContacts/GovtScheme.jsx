import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'
import { TextField, } from '@mui/material'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { __postApiData, BASE_URL } from '../../../utils/api'
import { __getCommenApiDataList } from '../../../utils/api/commonApi'
import { useAuth } from '../../../context/AuthContext'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import DatagridRowAction from '../../../components/common/DatagridRowAction'
import MyEditor from '../../../components/textEditor/MyEditor'

const GovtScheme = () => {
    const { userDetails } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [sortInfo, setSortInfo] = useState('');
    const [infotxt, setInfoTxt] = useState('');
    const [list, setList] = useState({ data: [], loading: false });
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
        { field: "PolicyTitle", headerName: "Policy Title", flex: 1, minWidth: 180, headerClassName: "health-table-header-style" },
        { field: "Eligibility", headerName: "Eligibility", flex: 1, minWidth: 180, headerClassName: "health-table-header-style" },
        {
            field: "ShortDesc", headerName: "Short Description", flex: 1, minWidth: 180, headerClassName: "health-table-header-style",
            renderCell: (params) => {
                const ShortDesc = params.value;
                const maxLength = 200;
                const displayText = (typeof ShortDesc === 'string' && ShortDesc.length > maxLength) ? ShortDesc.slice(0, maxLength) + '...' : ShortDesc;

                if (!displayText) {
                    return 'N/A';
                }

                return (
                    <div dangerouslySetInnerHTML={{ __html: displayText }} />
                );
            },
        },
        {
            field: "LongDesc",
            headerName: "Long Description",
            minWidth: 220,
            headerClassName: "health-table-header-style",
            renderCell: (params) => {
                const longDesc = params.value;
                const maxLength = 400;
                const displayText = (typeof longDesc === 'string' && longDesc.length > maxLength) ? longDesc.slice(0, maxLength) + '...' : longDesc;

                if (!displayText) {
                    return 'N/A';
                }

                return (
                    <div dangerouslySetInnerHTML={{ __html: displayText }} />
                );
            },
        },
        { field: "GovernmentAuthority", headerName: "Government Authority", flex: 1, minWidth: 180, headerClassName: "health-table-header-style" },
        {
            field: "PolicyImage",
            headerName: "Image",
            flex: 1,
            minWidth: 180,
            headerClassName: "health-table-header-style",
            renderCell: (params) => {
                return params.row?.PolicyImage ? (
                    <img
                        src={params.row?.PolicyImage}
                        alt="Image"
                        className="w-16 h-16 object-cover border rounded-md"
                    />
                ) : (
                    <span>No Image</span>
                );
            },
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
            renderCell: (params) => {
                return (
                    <DatagridRowAction row={params.row}
                        onEdit={() => console.log(params.row)}
                        onDelete={() => console.log(params.row)}
                    />
                )
            }
        },
    ];
    const formik = useFormik({
        initialValues: {
            PolicyTitle: "",
            PolicyImage: "",
            Eligibility: "",
            ShortDesc: "",
            LongDesc: "",
            GovernmentAuthority: "",
            PolicyDocument: "",
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const payload = { ...values, CityId: userDetails?.StationId };
                setIsLoading(true);
                const res = await __postApiData("/api/v1/admin/SaveGovtPolicy", payload);
                if (res.response && res.response.response_code === "200") {
                    toast.success("Data added successfully");
                    resetForm();
                    getStationIndicator();
                    setInfoTxt("");
                    setSortInfo('');
                } else {
                    toast.error(res.response.response_message || "Failed to add Data");
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to submit:", error);
                setIsLoading(false);
            }
        },
    });

    const getStationIndicator = async () => {
        try {
            setList((prev) => ({ ...prev, loading: true }));
            const response = await __postApiData("/api/v1/admin/GovtPolicyList", { CityId: userDetails?.StationId });
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
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const fieldName = e.target.name; // <--- detect which input triggered it
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
                const fileUrl = response.data?.data[0]?.full_URL || "";
                formik.setFieldValue(fieldName, fileUrl);
            } else {
                toast.error(
                    response?.data?.response?.response_message || "File upload failed"
                );
            }
        } catch (error) {
            console.error("File upload failed:", error);
            toast.error("Error uploading file");
        }
    };

    useEffect(() => {
        getStationIndicator()
    }, []);
    useEffect(() => {
        formik.setFieldValue('ShortDesc', sortInfo);
    }, [sortInfo]);
    useEffect(() => {
        formik.setFieldValue('LongDesc', infotxt);
    }, [infotxt]);
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Government Schemes & Policies"
                description="Add or update the required details for the Government Schemes & Policies to keep records accurate and complete."
            />
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4 mt-8 shadow-card rounded-md p-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <FormInput
                        label="Policy Title"
                        name="PolicyTitle"
                        placeholder="Enter Policy Title"
                        value={formik.values?.PolicyTitle}
                        onChange={formik.handleChange}
                        error={formik.touched?.PolicyTitle && formik.errors?.PolicyTitle}
                        helperText={formik.touched?.PolicyTitle && formik.errors?.PolicyTitle}
                    />
                    <FormInput
                        label="Eligibility"
                        name="Eligibility"
                        placeholder="Enter Eligibility"
                        value={formik.values?.Eligibility}
                        onChange={formik.handleChange}
                        error={formik.touched?.Eligibility && formik.errors?.Eligibility}
                        helperText={formik.touched?.Eligibility && formik.errors?.Eligibility}
                        inputMode={"numeric"}
                    />
                    <div className='flex gap-2 flex-col'>
                        <label className="text-base font-semibold">Short Description</label>
                        <MyEditor
                            content={sortInfo}
                            setContent={setSortInfo} // Only update the infotxt state here
                            desHeight={"120px"}
                        />
                        {formik.errors.ShortDesc && formik.touched.ShortDesc ? (
                            <span className="text-danger">{formik.errors.ShortDesc}</span>
                        ) : null}
                    </div>
                    {/* <FormInput
                        label="Long Description"
                        name="LongDesc"
                        placeholder="Enter Long Description"
                        multiline
                        rows={3}
                        value={formik.values?.LongDesc}
                        onChange={formik.handleChange}
                        error={formik.touched?.LongDesc && formik.errors?.LongDesc}
                        helperText={formik.touched?.LongDesc && formik.errors?.LongDesc}
                    /> */}
                    <div className='flex gap-2 flex-col'>
                        <label className="text-base font-semibold">Long Description</label>
                        <MyEditor
                            content={infotxt}
                            setContent={setInfoTxt} // Only update the infotxt state here
                            desHeight={"120px"}
                        />
                        {formik.errors.LongDesc && formik.touched.LongDesc ? (
                            <span className="text-danger">{formik.errors.LongDesc}</span>
                        ) : null}
                    </div>
                    <FormInput
                        label="Government Authority"
                        name="GovernmentAuthority"
                        placeholder="Enter Government Authority"
                        value={formik.values?.GovernmentAuthority}
                        onChange={formik.handleChange}
                        error={formik.touched?.GovernmentAuthority && formik.errors?.GovernmentAuthority}
                        helperText={formik.touched?.GovernmentAuthority && formik.errors?.GovernmentAuthority}
                    />

                    <div className="flex flex-col gap-2">
                        <label htmlFor="PolicyImage" className="text-base font-semibold">
                            Policy Image
                        </label>
                        <TextField
                            fullWidth
                            id="PolicyImage"
                            name="PolicyImage"
                            placeholder="Upload an image"
                            size="small"
                            type="file"
                            className="custom-input"
                            inputProps={{ accept: "image/*" }}
                            onChange={handleFileUpload}
                            error={formik.touched?.PolicyImage && Boolean(formik.errors?.PolicyImage)}
                            helperText={formik.touched?.PolicyImage && formik.errors?.PolicyImage}
                        />
                        {formik.values?.PolicyImage && (
                            <div className="mt-2">
                                <img
                                    src={formik.values?.PolicyImage}
                                    alt="Logo Preview"
                                    className="w-32 h-32 object-cover border rounded-md"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="PolicyDocument" className="text-base font-semibold">
                            Policy Document
                        </label>
                        <TextField
                            fullWidth
                            id="PolicyDocument"
                            name="PolicyDocument"
                            placeholder="Upload a document"
                            size="small"
                            type="file"
                            className="custom-input"
                            inputProps={{ accept: ".pdf" }}
                            onChange={handleFileUpload}
                            error={
                                formik.touched?.PolicyDocument && Boolean(formik.errors?.PolicyDocument)
                            }
                            helperText={formik.touched?.PolicyDocument && formik.errors?.PolicyDocument}
                        />
                        {formik.values?.PolicyDocument && (
                            <div className="mt-2">
                                <a
                                    href={formik.values?.PolicyDocument}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    View Uploaded Document
                                </a>
                            </div>
                        )}
                    </div>


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
                    sx={{
                        '& .MuiDataGrid-cell': {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            padding: '8px',
                        },
                        '& .MuiDataGrid-columnHeaderTitleContainer': {
                            justifyContent: 'center',
                            padding: '8px',
                        }
                    }}
                    getRowHeight={() => "auto"}
                    getRowId={(row) => row._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </div>
    )
}

export default GovtScheme
