import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'
import { Button, Checkbox, Chip, IconButton, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import DeleteIcon from "@mui/icons-material/Delete";
import { __postApiData, BASE_URL } from '../../../utils/api'
import { __getCommenApiDataList } from '../../../utils/api/commonApi'
import { useAuth } from '../../../context/AuthContext'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import DatagridRowAction from '../../../components/common/DatagridRowAction'
import { __formatDate } from '../../../utils/api/constantfun'

const InvestmentOpportunity = () => {
    const { userDetails } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [dataList, setDataList] = useState({
        prodjectTypeList: [],
        unitTypeList: [],
        approvalList: [],
        AmenitiesList: []
    });
    const { prodjectTypeList, unitTypeList, approvalList, AmenitiesList } = dataList;
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
        {
            field: "City Name",
            headerName: "City Name",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.CityId?.lookup_value || "N/A"}</span>,
        },
        {
            field: "ProjectType",
            headerName: "Project Type",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.ProjectType?.lookup_value || "N/A"}</span>,
        },
        {
            field: "ProjectName",
            headerName: "Project Name",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.ProjectName || "N/A"}</span>,
        },
        {
            field: "ProjectLocation",
            headerName: "Project Location",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.ProjectLocation || "N/A"}</span>,
        },
        {
            field: "MinimumInvestment",
            headerName: "Minimum Investment (in INR)",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.MinimumInvestment || "N/A"}</span>,
        },
        {
            field: "AssuredROI",
            headerName: "Assured ROI (in %)",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.AssuredROI || "N/A"}</span>,
        },
        {
            field: "LockinPeriod",
            headerName: "Lockin Period (in years)",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.LockinPeriod || "N/A"}</span>,
        },
        {
            field: "ProjectStartDate",
            headerName: "Project Start Date",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{__formatDate(params.row?.ProjectStartDate) || "N/A"}</span>,
        },
        {
            field: "CompletionDeadline",
            headerName: "Completion Deadline",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{__formatDate(params.row?.CompletionDeadline) || "N/A"}</span>,
        },
        {
            field: "AvailableSizes",
            headerName: "Available Sizes",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => (
                <span>
                    {Array.isArray(params.row?.AvailableSizes) && params.row.AvailableSizes.length > 0
                        ? params.row.AvailableSizes
                            .map((item) => `${item?.Size} ${item?.Unit?.lookup_value}`)
                            .join(", ")
                        : "N/A"}
                </span>
            ),
        },

        {
            field: "ApprovalStatus",
            headerName: "Approval Status",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => (
                Array.isArray(params.row?.ApprovalStatus) && params.row.ApprovalStatus.length > 0 ? (
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                        {params.row.ApprovalStatus.map((item, index) => (
                            <Chip
                                key={index}
                                label={item?.lookup_value}
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
        },
        {
            field: "ContactName",
            headerName: "Contact Name",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{(params.row?.ContactName) || "N/A"}</span>,
        },
        {
            field: "PhoneNumber",
            headerName: "Phone Number",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span >{(params.row?.PhoneNumber) || "N/A"}</span>,
        },
        {
            field: "EmailAddress",
            headerName: "Email",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            renderCell: (params) => <span >{(params.row?.EmailAddress) || "N/A"}</span>,
        },
        {
            field: "ProjectDeveloper",
            headerName: "Project Developer",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            renderCell: (params) => <span >{(params.row?.ProjectDeveloper?.map(item => `${item}`).join(", ")) || "N/A"}</span>,
        },
        {
            field: "BankingPartner",
            headerName: "Banking Partner",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            renderCell: (params) => <span >{(params.row?.BankingPartner?.map(item => `${item}`).join(", ")) || "N/A"}</span>,
        },
        {
            field: "DistancefromCity",
            headerName: "Distance from City (in km)",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            renderCell: (params) => <span >{(params.row?.DistancefromCity) || "N/A"}</span>,
        },
        {
            field: "DistancefromAirport",
            headerName: "Distance from Airport (in km)",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            renderCell: (params) => <span >{(params.row?.DistancefromAirport) || "N/A"}</span>,
        },
        {
            field: "DistancefromRailwayStation",
            headerName: "Distance from Railway Station (in km)",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            renderCell: (params) => <span >{(params.row?.DistancefromRailwayStation) || "N/A"}</span>,
        },
        {
            field: "Amenities",
            headerName: "Amenities",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            renderCell: (params) => (
                Array.isArray(params.row?.Amenities) && params.row.Amenities.length > 0 ? (
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                        {params.row.Amenities.map((item, index) => (
                            <Chip
                                key={index}
                                label={item?.lookup_value}
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
        },
        {
            field: "Comments",
            headerName: "Comments",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            renderCell: (params) => <span >{(params.row?.Comments) || "N/A"}</span>,
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
    ]

    const formik = useFormik({
        initialValues: {
            ProjectType: '',
            ProjectName: '',
            ProjectLocation: '',
            PictureGallery: [""],
            VideoGallery: [""],
            URL: [''],
            MinimumInvestment: '',
            AssuredROI: '',
            LockinPeriod: '',
            ProjectStartDate: '',
            CompletionDeadline: '',
            AvailableSizes: [{ Unit: "", Size: "" }],
            ApprovalStatus: [],
            ContactName: "",
            PhoneNumber: "",
            EmailAddress: "",
            ProjectDeveloper: [""],
            BankingPartner: [""],
            DistancefromCity: "",
            DistancefromAirport: "",
            DistancefromRailwayStation: "",
            Amenities: [],
            Comments: "",
        },
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            const mergedVideos = [
                ...(values.VideoGallery?.filter(Boolean) || []),
                ...(values.URL?.filter(Boolean) || []),
            ];
            const payload = {
                ...values,
                VideoGallery: mergedVideos,
            };
            try {

                setIsLoading(true);
                const res = await __postApiData("/api/v1/admin/SaveProject", { ...payload, CityId: userDetails?.StationId });
                if (res.response && res.response.response_code === "200") {
                    toast.success("Data added successfully");
                    resetForm();
                    getInvestmentOpportunityData();
                } else {
                    console.log(res);
                    toast.error(res.response?.response_message || res.response?.response_message?.error || "Failed to add Data");
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to submit:", error);
                setIsLoading(false);
            }
        },
    });

    //========= Function to get the Investment Opportunity data from api ==========\\
    const getInvestmentOpportunityData = async () => {
        try {
            setList((prev) => ({ ...prev, loading: true }));
            const response = await __postApiData("/api/v1/app/listProjectsOrInvestmentOpportunities", {
                page: paginationModel.page + 1,
                limit: paginationModel.pageSize,
                CityId: userDetails?.StationId,
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

    useEffect(() => {
        fetchData(['project_type'], "prodjectTypeList");
        fetchData(['unit_type'], "unitTypeList");
        fetchData(['approval_type'], "approvalList");
        fetchData(['amenities_type'], "AmenitiesList");
        getInvestmentOpportunityData();
    }, []);

    // ✅ File upload (shared for both image & video)
    const handleFileUpload = async (e, key, index = null) => {
        const file = e.target.files[0];
        if (!file) return alert("Please select a file first");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(`${BASE_URL}/api/v1/common/AddImage`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response?.data?.response?.response_code === "200") {
                const fileUrl = response.data?.data[0]?.full_URL || "";
                const updated = [...formik.values[key]];

                if (index !== null) {
                    updated[index] = fileUrl;
                } else {
                    updated.push(fileUrl);
                }
                formik.setFieldValue(key, updated);
            } else {
                toast.error(response?.data?.response?.response_message || "File upload failed");
            }
        } catch (error) {
            console.error("File upload failed:", error);
            toast.error("Error uploading file");
        }
    };

    // ✅ Remove file (for both galleries)
    const handleRemoveFile = (key, index) => {
        const updated = [...formik.values[key]];
        updated.splice(index, 1);
        formik.setFieldValue(key, updated);
    };

    // ✅ Add more URL field
    const handleAddField = () => {
        formik.setFieldValue("URL", [...formik.values.URL, ""]);
    };

    // ✅ Remove specific field
    const handleRemoveField = (index) => {
        const updated = formik.values.URL.filter((_, i) => i !== index);
        formik.setFieldValue("URL", updated);
    };
    const handleAddSizeField = () => {
        formik.setFieldValue("AvailableSizes", [...formik.values.AvailableSizes, { Unit: "", Size: "" }]);
    };

    // ✅ Remove specific field
    const handleRemoveSizeField = (index) => {
        const updated = formik.values.AvailableSizes.filter((_, i) => i !== index);
        formik.setFieldValue("AvailableSizes", updated);
    };
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Investment Opportunities"
                description="Add or update the required details for the investment opportunities to keep records accurate and complete."
            />
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4 mt-8 shadow-card rounded-md p-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Product Type"
                        name="ProjectType"
                        type='select'
                        placeholder="Select a option"
                        options={prodjectTypeList}
                        value={formik.values?.ProjectType}
                        onChange={formik.handleChange}
                        error={formik.touched.ProjectType && formik.errors.ProjectType}
                        helperText={formik.touched.ProjectType && formik.errors.ProjectType}
                    />

                    <FormInput
                        label="Product Name"
                        name="ProjectName"
                        placeholder="Enter Product Name"
                        value={formik.values?.ProjectName}
                        onChange={formik.handleChange}
                        error={formik.touched?.ProjectName && formik.errors?.ProjectName}
                        helperText={formik.touched?.ProjectName && formik.errors?.ProjectName}
                    />
                    <FormInput
                        label="Project Location"
                        name="ProjectLocation"
                        placeholder="Enter Project Location"
                        value={formik.values?.ProjectLocation}
                        onChange={formik.handleChange}
                        error={formik.touched?.ProjectLocation && formik.errors?.ProjectLocation}
                        helperText={formik.touched?.ProjectLocation && formik.errors?.ProjectLocation}
                        inputMode={"numeric"}
                    />
                </div>
                {/* 🖼 Picture Gallery */}
                <div className="">
                    <label className="font-semibold">Picture Gallery</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formik.values?.PictureGallery?.map((img, index) => (
                            <div key={index} className="relative rounded-md py-2">
                                {!img ? (
                                    <div className='relative flex items-center gap-2'>
                                        <TextField
                                            size="small"
                                            type="file"
                                            fullWidth
                                            className="custom-input"
                                            inputProps={{ accept: "image/*" }}
                                            onChange={(e) => handleFileUpload(e, "PictureGallery", index)}
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    padding: "8px 12px",
                                                    height: "auto",
                                                },
                                            }}
                                        />
                                        {formik.values.PictureGallery.length > 1 && (<IconButton
                                            color="error"
                                            size="small"
                                            onClick={() => handleRemoveFile("PictureGallery", index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>)}
                                    </div>
                                ) : (
                                    <>
                                        <img
                                            src={img}
                                            alt={`gallery-${index}`}
                                            className="w-full h-32 object-contain rounded mb-2 border"
                                        />

                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    <Button
                        variant="contained"
                        size="small"
                        color="success"
                        onClick={() =>
                            formik.setFieldValue("PictureGallery", [
                                ...formik.values.PictureGallery,
                                null,
                            ])
                        }
                    >
                        + Add More
                    </Button>
                </div>

                {/* 🎥 Video Gallery */}
                <div className="">
                    <label className="font-semibold">Video Gallery</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formik.values?.VideoGallery?.map((video, index) => (
                            <div key={index} className="relative rounded-md py-2">
                                {!video ? (
                                    <div className='relative flex items-center gap-2'>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            type="file"
                                            className="custom-input"
                                            inputProps={{ accept: "video/*" }}
                                            onChange={(e) => handleFileUpload(e, "VideoGallery", index)}
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    padding: "8px 12px",
                                                    height: "auto",
                                                },
                                            }}
                                        />
                                        {formik.values.VideoGallery.length > 1 && (<IconButton
                                            color="error"
                                            size="small"
                                            onClick={() => handleRemoveFile("VideoGallery", index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>)}
                                    </div>
                                ) : (
                                    <>
                                        <video
                                            controls
                                            className="w-full h-32 object-contain rounded mb-2 border"
                                        >
                                            <source src={video} type="video/mp4" />
                                        </video>

                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    <Button
                        variant="contained"
                        size="small"
                        color="success"
                        onClick={() =>
                            formik.setFieldValue("VideoGallery", [
                                ...formik.values.VideoGallery,
                                null,
                            ])
                        }
                    >
                        + Add More
                    </Button>
                </div>
                {/* 🔗 Product Video URL */}
                <div>
                    <label className="font-semibold">Product Video URL</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {formik.values.URL.map((url, index) => (
                            <div
                                key={index}
                                className="flex items-center relative space-x-2 mb-2 py-1"
                            >
                                <FormInput
                                    name={`URL[${index}]`}
                                    placeholder="Enter video URL"
                                    value={url}
                                    onChange={formik.handleChange}
                                    error={formik.touched.URL && formik.errors.URL?.[index]}
                                />

                                {formik.values.URL.length > 1 && (
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => handleRemoveField(index)}
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
                        onClick={handleAddField}
                    >
                        + Add More
                    </Button>
                </div>
                {/* Investment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Minimum Investment (in INR)"
                        name="MinimumInvestment"
                        placeholder="Enter Minimum Investment"
                        inputMode={"numeric"}
                        value={formik.values?.MinimumInvestment}
                        onChange={formik.handleChange}
                        error={formik.touched?.MinimumInvestment && formik.errors?.MinimumInvestment}
                        helperText={formik.touched?.MinimumInvestment && formik.errors?.MinimumInvestment}
                    />
                    <FormInput
                        label="Assured ROI (in %)"
                        name="AssuredROI"
                        placeholder="Enter Assured ROI"
                        value={formik.values?.AssuredROI}
                        onChange={formik.handleChange}
                        error={formik.touched?.AssuredROI && formik.errors?.AssuredROI}
                        helperText={formik.touched?.AssuredROI && formik.errors?.AssuredROI}
                    />
                    <FormInput
                        label="Lock in Period (in years)"
                        name="LockinPeriod"
                        placeholder="Enter Lock in Period"
                        value={formik.values?.LockinPeriod}
                        onChange={formik.handleChange}
                        error={formik.touched?.LockinPeriod && formik.errors?.LockinPeriod}
                        helperText={formik.touched?.LockinPeriod && formik.errors?.LockinPeriod}
                    />
                    <FormInput
                        label="Project Start Date"
                        name="ProjectStartDate"
                        type='date'
                        value={formik.values?.ProjectStartDate}
                        onChange={formik.handleChange}
                        error={formik.touched?.ProjectStartDate && formik.errors?.ProjectStartDate}
                        helperText={formik.touched?.ProjectStartDate && formik.errors?.ProjectStartDate}
                    />
                    <FormInput
                        label="Completion Deadline"
                        name="CompletionDeadline"
                        type='date'
                        value={formik.values?.CompletionDeadline}
                        onChange={formik.handleChange}
                        error={formik.touched?.CompletionDeadline && formik.errors?.CompletionDeadline}
                        helperText={formik.touched?.CompletionDeadline && formik.errors?.CompletionDeadline}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Available Sizes</label>
                    {formik.values?.AvailableSizes?.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <FormInput
                                type='select'
                                name={`AvailableSizes[${index}].Unit`}
                                placeholder="Select Unit"
                                value={formik.values?.AvailableSizes[index]?.Unit || ""}
                                options={unitTypeList}
                                onChange={(e) => {
                                    const updatedSizes = [...formik.values.AvailableSizes];
                                    updatedSizes[index] = { ...updatedSizes[index], Unit: e.target.value };
                                    formik.setFieldValue("AvailableSizes", updatedSizes);
                                }} />
                            <FormInput
                                name={`AvailableSizes.Size[${index}]`}
                                placeholder="Enter Size"
                                value={formik.values?.AvailableSizes[index]?.Size || ""}
                                onChange={(e) => {
                                    const updatedSizes = [...formik.values.AvailableSizes];
                                    updatedSizes[index] = { ...updatedSizes[index], Size: e.target.value };
                                    formik.setFieldValue("AvailableSizes", updatedSizes);
                                }}
                                error={formik.touched?.AvailableSizes && formik.errors?.AvailableSizes?.[index]?.Size}
                                helperText={formik.touched?.AvailableSizes && formik.errors?.AvailableSizes?.[index]?.Size}
                            />

                            {formik.values.AvailableSizes.length > 1 && (
                                <IconButton
                                    className='absolute top-3'
                                    color="error"
                                    size="small"
                                    onClick={() => handleRemoveSizeField(index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </div>
                    ))}
                    <div>

                        <Button
                            variant="contained"
                            size="small"
                            color="success"
                            onClick={handleAddSizeField}
                        >
                            + Add More
                        </Button>
                    </div>
                </div>
                {/* Approval Status */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Approval Status</label>
                    <div className="flex gap-2 flex-wrap">
                        {approvalList?.map((item) => {
                            const checkboxId = `approval-${item._id}`;

                            return (
                                <div key={item._id} className="flex items-center gap-2">
                                    <Checkbox
                                        id={checkboxId}
                                        checked={formik.values?.ApprovalStatus.includes(item._id)}
                                        onChange={(e) => {
                                            const updatedStatus = e.target.checked
                                                ? [...formik.values.ApprovalStatus, item._id]
                                                : formik.values.ApprovalStatus.filter((id) => id !== item._id);

                                            formik.setFieldValue("ApprovalStatus", updatedStatus);
                                        }}
                                    />
                                    <label
                                        htmlFor={checkboxId}
                                        className="cursor-pointer select-none"
                                    >
                                        {item.lookup_value}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Contact Name"
                        name="ContactName"
                        placeholder="Enter Contact Name"
                        value={formik.values?.ContactName}
                        onChange={formik.handleChange}
                        error={formik.touched?.ContactName && formik.errors?.ContactName}
                        helperText={formik.touched?.ContactName && formik.errors?.ContactName}
                    />
                    <FormInput
                        label="Phone Number"
                        name="PhoneNumber"
                        placeholder="Enter Phone Number"
                        value={formik.values?.PhoneNumber}
                        onChange={formik.handleChange}
                        error={formik.touched?.PhoneNumber && formik.errors?.PhoneNumber}
                        helperText={formik.touched?.PhoneNumber && formik.errors?.PhoneNumber}
                    />
                    <FormInput
                        label="Email Address"
                        name="EmailAddress"
                        placeholder="Enter Email Address"
                        value={formik.values?.EmailAddress}
                        onChange={formik.handleChange}
                        error={formik.touched?.EmailAddress && formik.errors?.EmailAddress}
                        helperText={formik.touched?.EmailAddress && formik.errors?.EmailAddress}
                    />
                </div>
                {/* Project Developer(s) */}
                <div>
                    <label className="font-semibold">Project Developer (s)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {formik.values.ProjectDeveloper.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center relative space-x-2 mb-2 py-1"
                            >
                                <FormInput

                                    name={`ProjectDeveloper[${index}]`}
                                    placeholder="Enter Project Developer"
                                    value={item}
                                    onChange={formik.handleChange}
                                    error={formik.touched.ProjectDeveloper && formik.errors.ProjectDeveloper?.[index]}
                                />

                                {formik.values.ProjectDeveloper.length > 1 && (
                                    <IconButton

                                        color="error"
                                        size="small"
                                        onClick={() => {
                                            const updated = formik.values.URL.filter((_, i) => i !== index);
                                            formik.setFieldValue("ProjectDeveloper", updated);
                                        }}
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
                        onClick={() => formik.setFieldValue("ProjectDeveloper", [...formik.values.ProjectDeveloper, ""])}
                    >
                        + Add More
                    </Button>
                </div>
                {/* Banking Partner (s) */}
                <div>
                    <label className="font-semibold">Banking Partner (s)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {formik.values?.BankingPartner?.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center relative space-x-2 mb-2 py-1"
                            >
                                <FormInput

                                    name={`BankingPartner[${index}]`}
                                    placeholder="Enter Banking Partner"
                                    value={item}
                                    onChange={formik.handleChange}
                                    error={formik.touched.BankingPartner && formik.errors.BankingPartner?.[index]}
                                />

                                {formik.values.BankingPartner?.length > 1 && (
                                    <IconButton

                                        color="error"
                                        size="small"
                                        onClick={() => {
                                            const updated = formik.values.BankingPartner.filter((_, i) => i !== index);
                                            formik.setFieldValue("BankingPartner", updated);
                                        }}
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
                        onClick={() => formik.setFieldValue("BankingPartner", [...formik.values?.BankingPartner, ""])}
                    >
                        + Add More
                    </Button>
                </div>
                {/* Distances */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Distance from City (in km)"
                        name="DistancefromCity"
                        placeholder="Enter Distance from City"
                        value={formik.values?.DistancefromCity}
                        onChange={formik.handleChange}
                        error={formik.touched?.DistancefromCity && formik.errors?.DistancefromCity}
                        helperText={formik.touched?.DistancefromCity && formik.errors?.DistancefromCity}
                    />
                    <FormInput
                        label="Distance from Airport (in km)"
                        name="DistancefromAirport"
                        placeholder="Enter Distance from Airport"
                        value={formik.values?.DistancefromAirport}
                        onChange={formik.handleChange}
                        error={formik.touched?.DistancefromAirport && formik.errors?.DistancefromAirport}
                        helperText={formik.touched?.DistancefromAirport && formik.errors?.DistancefromAirport}
                    />
                    <FormInput
                        label="Distance from Railway Station (in km)"
                        name="DistancefromRailwayStation"
                        placeholder="Enter Distance from Railway Station"
                        value={formik.values?.DistancefromRailwayStation}
                        onChange={formik.handleChange}
                        error={formik.touched?.DistancefromRailwayStation && formik.errors?.DistancefromRailwayStation}
                        helperText={formik.touched?.DistancefromRailwayStation && formik.errors?.DistancefromRailwayStation}
                    />
                </div>
                {/* Amenities */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Amenities</label>
                    <div className="flex gap-2 flex-wrap">
                        {AmenitiesList?.map((item) => {
                            const checkboxId = `checkbox-${item._id}`;

                            return (
                                <div key={item._id} className="flex items-center gap-2">
                                    <Checkbox
                                        id={checkboxId}
                                        checked={formik.values?.Amenities.includes(item._id)}
                                        onChange={(e) => {
                                            const updatedStatus = e.target.checked
                                                ? [...formik.values.Amenities, item._id]
                                                : formik.values.Amenities.filter((id) => id !== item._id);

                                            formik.setFieldValue("Amenities", updatedStatus);
                                        }}
                                    />
                                    <label
                                        htmlFor={checkboxId}
                                        className="cursor-pointer select-none"
                                    >
                                        {item?.lookup_value}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <FormInput
                    label="Comments"
                    name="Comments"
                    placeholder="Enter Comments"
                    value={formik.values?.Comments}
                    onChange={formik.handleChange}
                    error={formik.touched?.Comments && formik.errors?.Comments}
                    helperText={formik.touched?.Comments && formik.errors?.Comments}
                    multiline
                    rows={4}
                />

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

export default InvestmentOpportunity
