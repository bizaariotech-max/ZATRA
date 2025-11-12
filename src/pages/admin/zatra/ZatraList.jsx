import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import SectionHeader from "../../../components/common/SectionHeader";
import FormInput from "../../../components/common/FormInput";
import FormButton from "../../../components/common/FormButton";
import { __getCommenApiDataList } from "../../../utils/api/commonApi";
import { __postApiData, BASE_URL } from "../../../utils/api";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { __formatDate2 } from "../../../utils/api/constantfun";
import ZatraDetails from "../../../components/admin/zatra/ZatraDetails";
import Enroute from "../../../components/admin/zatra/Enroute";
import Organizer from "../../../components/admin/zatra/Organizer";
import SocialMedia from "../../../components/admin/zatra/SocialMedia";
import RegistrationFee from "../../../components/admin/zatra/RegistrationFee";
import LoginListModal from "../../../components/admin/common/LoginListModal";
import MyEditor from "../../../components/textEditor/MyEditor";
const ZatraList = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [zatraList, setZatraList] = React.useState([]);
    const [zatraDetails, setZatraDetails] = useState(null);
    const [categoryList, setCategoryList] = React.useState([]);
    const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 10 });
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [infotxt, setInfoTxt] = useState('');
    const [menuRowId, setMenuRowId] = useState(null);
    const [openModal, setOpenModal] = useState({
        type: null, // "zatra" or "enroute"
        isOpen: false,
    });
    // ✅ Common open function
    const handleOpenModal = (type) => {
        setOpenModal({ type, isOpen: true });
    };

    // ✅ Common close function
    const handleCloseModal = () => {
        setOpenModal({ type: null, isOpen: false });
    };

    const handleMenuOpen = (event, rowId) => {
        setMenuAnchorEl(event.currentTarget);
        setMenuRowId(rowId);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
        setMenuRowId(null)
    };

    const columns = [
        {
            field: "_id", headerName: "Sr. No", minWidth: 90, headerClassName: "health-table-header-style", headerAlign: "center",
            align: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        { field: "Name", headerName: "Zatra Name", headerClassName: "health-table-header-style", minWidth: 150, renderCell: (params) => <span>{params.row?.Name || "N/A"}</span>, },
        { field: "ZatraTypeId", headerName: "Zatra Type", headerClassName: "health-table-header-style", minWidth: 150, renderCell: (params) => <span>{params.row?.ZatraTypeId?.lookup_value || "N/A"}</span>, },
        { field: "ShortDescription", headerName: "Short Description", headerClassName: "health-table-header-style", minWidth: 150, renderCell: (params) => <span>{params.row?.ShortDescription || "N/A"}</span>, },
        { field: "LongDescription", headerName: "Long Description", headerClassName: "health-table-header-style", minWidth: 150, renderCell: (params) => <span>{params.row?.LongDescription || "N/A"}</span>, },
        { field: "StartDate", headerName: "Start Date", headerClassName: "health-table-header-style", minWidth: 150, renderCell: (params) => <span>{__formatDate2(params.row?.StartDate) || "N/A"}</span>, },
        { field: "EndDate", headerName: "End Date", headerClassName: "health-table-header-style", minWidth: 150, renderCell: (params) => <span>{__formatDate2(params.row?.EndDate) || "N/A"}</span>, },
        {
            field: "Logo", headerName: "Logo", headerClassName: "health-table-header-style", minWidth: 150, renderCell: (params) => (
                params?.value ? <img src={params?.value} alt="Logo" className="w-12 h-12 object-cover rounded" /> : 'N/A'
            )
        },
        { field: "IsOngoing", headerName: "Is Ongoing", headerClassName: "health-table-header-style", minWidth: 150, renderCell: (params) => <span>{params.row?.IsOngoing ? "Yes" : "No"}</span>, },
        {
            field: "action",
            headerName: "Action",
            headerClassName: "health-table-header-style",
            minWidth: 150,
            renderCell: (params) => (
                <>
                    <IconButton
                        aria-controls={menuAnchorEl ? "actions-menu" : undefined}
                        aria-haspopup="true"
                        onClick={(e) => handleMenuOpen(e, params.row._id)}
                    >
                        <MoreVertIcon sx={{ color: "gray" }} />
                    </IconButton>

                    <Menu
                        id="actions-menu"
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
                                setZatraDetails(params.row);
                                handleOpenModal("zatra");
                                handleMenuClose();
                            }}
                        >
                            Zatra Details
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                                setZatraDetails(params.row);
                                handleOpenModal("enroute");
                                handleMenuClose();
                            }}
                        >
                            Enroute Station
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setZatraDetails(params.row);
                                handleOpenModal("organizer");
                                handleMenuClose();
                            }}
                        >
                            Organizer
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setZatraDetails(params.row);
                                handleOpenModal("sponsor");
                                handleMenuClose();
                            }}
                        >
                            Sponsors
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setZatraDetails(params.row);
                                handleOpenModal("social");
                                handleMenuClose();
                            }}
                        >
                            Social Media
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setZatraDetails(params.row);
                                handleOpenModal("registration");
                                handleMenuClose();
                            }}
                        >
                            Registration Fees
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setZatraDetails(params.row);
                                handleOpenModal("admin");
                                handleMenuClose();
                            }}
                        >
                            Admin Login
                        </MenuItem>
                    </Menu>
                </>
            ),
        }

    ];

    // ============= Yup validation schema ============\\   
    const validationSchema = Yup.object({
        Name: Yup.string().required("Zatra name is required"),
        ZatraTypeId: Yup.string().required("Zatra type is required"),
        ShortDescription: Yup.string().required("Short description is required"),
        LongDescription: Yup.string().required("Long description is required"),
        StartDate: Yup.date().required("Start date is required"),
        EndDate: Yup.date()
            .required("End date is required")
            .min(Yup.ref("StartDate"), "End date cannot be before start date"),
        Logo: Yup.string().required("Logo is required"),
        IsOngoing: Yup.boolean().required("Please select ongoing status"),
    });
    ///========== Fetch data from API ============\\
    const fetchData = async (lookupTypes) => {
        try {
            const data = await __getCommenApiDataList({
                lookup_type: lookupTypes,
            });
            setCategoryList(data);
        } catch (error) {
            console.error(`Error fetching data:`, error);
        }
    };

    const fetchZatraList = async () => {
        try {
            setIsLoading(true);
            const res = await __postApiData('/api/v1/admin/ZatraList');
            if (res.response && res.response.response_code === "200") {
                setZatraList(res?.data?.list || []);
            } else {
                toast.error(res.response ? res.response?.response_message : "Failed to fetch data");
            }

        } catch (err) {
            toast.error("Failed to fetch data");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData(["zatra_type"]);
        fetchZatraList();
    }, []);
    // ============ Formik setup ===============\\
    const formik = useFormik({
        initialValues: {
            Name: "",
            ZatraTypeId: "",
            ShortDescription: "",
            LongDescription: "",
            Logo: "",
            IsOngoing: false,
            StartDate: "",
            EndDate: "",
        },
        // validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setIsLoading(true);

                const res = await __postApiData('/api/v1/admin/SaveZatra', values);
                if (res.response && res.response.response_code === "200") {
                    toast.success("Zatra added successfully");
                    fetchZatraList();
                    resetForm();
                    setInfoTxt("")
                } else {
                    toast.error(res.response.response_message || "Failed to add Zatra");
                }
                setIsLoading(false);
            } catch (err) {
                console.log(err?.response?.data?.message || "Failed to add Zatra");
                toast.error("Failed to add Zatra");
                setIsLoading(false);
            }
        },
    });
    useEffect(() => {
        formik.setFieldValue('LongDescription', infotxt);
    }, [infotxt]);

    useEffect(() => {
        if (formik.values.IsOngoing === true) {
            formik.setFieldValue("StartDate", "");
            formik.setFieldValue("EndDate", "");
        }
    }, [formik.values.IsOngoing]);

    // ✅ File upload handler
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
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
                formik.setFieldValue("Logo", response.data?.data[0]?.full_URL || "");
            } else {
                toast.error(response?.data?.response?.response_message || "File upload failed");
            }
        } catch (error) {
            console.error("File upload failed:", error);
            toast.error("Error uploading file");
        }
    };

    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Zatra Admin List"
                description="Add or update the required details for the Zatra admin to keep records accurate and complete."
            />

            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4 mt-8 shadow-card rounded-md p-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Zatra Name */}
                    <FormInput
                        label="Zatra Name"
                        name="Name"
                        placeholder="Enter Zatra Name"
                        value={formik.values.Name}
                        onChange={formik.handleChange}
                        error={formik.touched.Name && formik.errors.Name}
                        helperText={formik.touched.Name && formik.errors.Name}
                    />

                    {/* Zatra Type */}
                    <FormInput
                        label="Zatra Type"
                        name="ZatraTypeId"
                        placeholder="Select a zatra type"
                        type="select"
                        options={categoryList}
                        value={formik.values.ZatraTypeId}
                        onChange={formik.handleChange}
                        error={formik.touched.ZatraTypeId && formik.errors.ZatraTypeId}
                        helperText={formik.touched.ZatraTypeId && formik.errors.ZatraTypeId}
                    />

                    {/* Short Description */}
                    <FormInput
                        label="Short Description"
                        name="ShortDescription"
                        placeholder="Enter short description"
                        multiline
                        rows={3}
                        value={formik.values.ShortDescription}
                        onChange={formik.handleChange}
                        error={formik.touched.ShortDescription && formik.errors.ShortDescription}
                        helperText={formik.touched.ShortDescription && formik.errors.ShortDescription}
                    />


                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-base font-semibold">Long Description</label>
                    <MyEditor
                        content={infotxt}
                        setContent={setInfoTxt} // Only update the infotxt state here
                        desHeight={"120px"}
                    />
                    {formik.errors.LongDescription && formik.touched.LongDescription ? (
                        <span className="text-danger">{formik.errors.LongDescription}</span>
                    ) : null}
                </div>

                {/* Logo Upload */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="Logo" className="text-base font-semibold">
                        Zatra Logo
                    </label>
                    <TextField
                        fullWidth
                        id="Logo"
                        name="Logo"
                        placeholder="Upload an image"
                        size="small"
                        type="file"
                        className="custom-input"
                        inputProps={{ accept: "image/*" }}
                        onChange={handleFileUpload}
                        error={formik.touched.Logo && Boolean(formik.errors.Logo)}
                        helperText={formik.touched.Logo && formik.errors.Logo}
                    />
                    {formik.values.Logo && (
                        <div className="mt-2">
                            <img
                                src={formik.values.Logo}
                                alt="Logo Preview"
                                className="w-32 h-32 object-cover border rounded-md"
                            />
                        </div>
                    )}
                </div>

                {/* Is Ongoing */}
                <div className="flex gap-2 flex-col">
                    <label className="text-base font-semibold">Is Ongoing Zatra</label>
                    <div className="flex gap-4">
                        {[
                            { _id: 1, type: true, lookup_value: "Yes" },
                            { _id: 2, type: false, lookup_value: "No" },
                        ].map((level) => (
                            <label key={level._id} className="flex items-center cursor-pointer gap-2">
                                <input
                                    type="radio"
                                    name="IsOngoing"
                                    value={String(level.type)}
                                    checked={formik.values.IsOngoing === level.type}
                                    onChange={() => formik.setFieldValue("IsOngoing", level.type)}
                                />
                                <span>{level.lookup_value}</span>
                            </label>
                        ))}
                    </div>
                    {formik.touched.IsOngoing && formik.errors.IsOngoing && (
                        <span className="text-red-500 text-sm">{formik.errors.IsOngoing}</span>
                    )}
                </div>
                {formik.values.IsOngoing === false && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            label="Start Date"
                            type="date"
                            name="StartDate"
                            value={formik.values.StartDate}
                            onChange={formik.handleChange}
                            error={formik.touched.StartDate && formik.errors.StartDate}
                            helperText={formik.touched.StartDate && formik.errors.StartDate}
                        />

                        <FormInput
                            label="End Date"
                            type="date"
                            name="EndDate"
                            value={formik.values.EndDate}
                            onChange={formik.handleChange}
                            error={formik.touched.EndDate && formik.errors.EndDate}
                            helperText={formik.touched.EndDate && formik.errors.EndDate}
                        />
                    </div>
                )}

                {/* Submit Button */}
                <div className="mt-4">
                    <FormButton disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                    </FormButton>
                </div>
            </form>

            <div className="bg-white pb-2 rounded-xl my-16 ">
                <DataGrid
                    rows={zatraList}
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
            {/* ✅ Conditionally render modals */}
            {openModal.type === "zatra" && (
                <ZatraDetails
                    open={openModal.isOpen}
                    onClose={handleCloseModal}
                    setZatraDetails={setZatraDetails}
                    zatraDetails={zatraDetails}
                    reload={fetchZatraList}
                />
            )}

            {openModal.type === "enroute" && (
                <Enroute
                    open={openModal.isOpen}
                    onClose={handleCloseModal}
                    setZatraDetails={setZatraDetails}
                    zatraDetails={zatraDetails}
                    reload={fetchZatraList}
                />
            )}
            {openModal.type === "organizer" && (
                <Organizer
                    open={openModal.isOpen}
                    onClose={handleCloseModal}
                    setZatraDetails={setZatraDetails}
                    zatraDetails={zatraDetails}
                    reload={fetchZatraList}
                    openModal={openModal}
                />
            )}
            {openModal.type === "sponsor" && (
                <Organizer
                    open={openModal.isOpen}
                    onClose={handleCloseModal}
                    setZatraDetails={setZatraDetails}
                    zatraDetails={zatraDetails}
                    reload={fetchZatraList}
                    openModal={openModal}
                />
            )}
            {openModal.type === "social" && (
                <SocialMedia
                    open={openModal.isOpen}
                    onClose={handleCloseModal}
                    setZatraDetails={setZatraDetails}
                    zatraDetails={zatraDetails}
                    reload={fetchZatraList}
                    openModal={openModal}
                />
            )}
            {openModal.type === "registration" && (
                <RegistrationFee
                    open={openModal.isOpen}
                    onClose={handleCloseModal}
                    setZatraDetails={setZatraDetails}
                    zatraDetails={zatraDetails}
                    reload={fetchZatraList}
                    openModal={openModal}
                />
            )}
            {openModal.type === "admin" && (
                <LoginListModal
                    open={openModal.isOpen}
                    handleClose={handleCloseModal}
                    setZatraDetails={setZatraDetails}
                    zatraDetails={zatraDetails}
                    reload={fetchZatraList}
                    openModalLogin={openModal}
                    title={"Admin Login"}
                    LoginAssetId={zatraDetails?._id}
                />
            )}
        </div>
    );
};

export default ZatraList;
