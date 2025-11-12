import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'
import {
    Button, IconButton, TextField, Dialog,
    DialogTitle,
    DialogContent,
    Divider,
} from '@mui/material'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import DeleteIcon from "@mui/icons-material/Delete";
import { __postApiData, BASE_URL } from '../../../utils/api'
import { __getCommenApiDataList } from '../../../utils/api/commonApi'
import { useAuth } from '../../../context/AuthContext'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import CloseIcon from "@mui/icons-material/Close";
import CollectionsIcon from '@mui/icons-material/Collections';
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DatagridRowAction from '../../../components/common/DatagridRowAction'
import MyEditor from '../../../components/textEditor/MyEditor'
const StationSpecialities = () => {
    const { userDetails } = useAuth();
    const [editId, setEditId] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const [categoryList, setCategoryList] = React.useState([])
    const [infotxt, setInfoTxt] = useState('');
    const [stationSpecialities, setStationSpecialities] = React.useState({
        loading: false,
        data: [],
    })
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [openGallery, setOpenGallery] = useState(false);
    const [galleryData, setGalleryData] = useState({ images: [], videos: [] });

    const handleOpenGallery = (row, type) => {
        if (type === "image") {
            setGalleryData({ images: row?.PictureGallery || [], videos: [] });
        } else if (type === "video") {
            setGalleryData({ images: [], videos: row?.VideoGallery || [] });
        }
        setOpenGallery(true);
    };

    const handleCloseGallery = () => {
        setOpenGallery(false);
        setGalleryData({ images: [], videos: [] });
    };

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
            field: "StationSpecialityTypeId",
            headerName: "Speciality Type",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.StationSpecialityTypeId?.lookup_value || "N/A"}</span>,
        },
        {
            field: "CityId",
            headerName: "City/Station",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.CityId?.lookup_value || "N/A"}</span>,
        },
        {
            field: "Name",
            headerName: "Name",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.Name || "N/A"}</span>,
        },
        {
            field: "ShortDescription",
            headerName: "ShortDescription",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => <span>{params.row?.ShortDescription || "N/A"}</span>,
        },
        {
            field: "LongDescription",
            headerName: "LongDescription",
            headerClassName: "health-table-header-style",
            minWidth: 180,
            flex: 1,
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
        {
            field: "PictureGallery",
            headerName: "Images",
            minWidth: 180,
            headerClassName: "health-table-header-style",
            align: "center",
            renderCell: (params) => {
                const images = params.row?.PictureGallery || [];
                return images.length > 0 ? (
                    <div className="flex gap-1 justify-center">
                        <IconButton color="primary" onClick={() => handleOpenGallery(params.row, "image")}>
                            <CollectionsIcon />
                        </IconButton>
                    </div>
                ) : (
                    "N/A"
                );
            },
        },
        {
            field: "VideoGallery",
            headerName: "Videos",
            minWidth: 150,
            headerClassName: "health-table-header-style",
            align: "center",
            renderCell: (params) => {
                const videos = params.row?.VideoGallery || [];
                return videos?.length > 0 ? (
                    <div className="flex gap-1 items-center">
                        <IconButton color="primary" onClick={() => handleOpenGallery(params.row, "video")}>
                            <PlayCircleIcon />
                        </IconButton>
                    </div>
                ) : (
                    "N/A"
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
            renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => console.log(params.row)}   // ✅ Pass handler
                onDelete={() => console.log(params.row)} />,
        }
    ];
    const formik = useFormik({
        initialValues: {
            StationSpecialityTypeId: "",
            Name: "",
            ShortDescription: "",
            LongDescription: "",
            PictureGallery: [null],
            VideoGallery: [null],
            URL: [""]
        },
        onSubmit: async (values, { resetForm }) => {
            const payload = { ...values, CityId: userDetails?.StationId, _id: editId || null };
            try {
                setIsLoading(true);
                const res = await __postApiData("/api/v1/admin/SaveODOP", payload);
                if (res.response && res.response.response_code === "200") {
                    toast.success("Station Speciality added successfully");
                    resetForm();
                    getStationIndicator();
                    setInfoTxt("")
                } else {
                    toast.error(res.response.response_message || "Failed to add Station Speciality");
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to submit:", error);
                setIsLoading(false);
            }
        }
    })
    ///========== fetch data from api ============\\
    const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
        try {
            const data = await __getCommenApiDataList({
                lookup_type: lookupTypes,
                parent_lookup_id: parent_lookup_id || null,
            })
            // console.log(data);
            setCategoryList(data);
        } catch (error) {
            console.error(`Error fetching ${stateKey}:`, error);
        }
    }
    const getStationIndicator = async () => {
        try {
            setStationSpecialities((prev) => ({ ...prev, loading: true }));

            // ✅ Call your API (replace URL with your actual endpoint)
            const response = await __postApiData("/api/v1/admin/ODOPList");
            // console.log("API Response:", response);
            // ✅ Update state with API data
            setStationSpecialities({
                loading: false,
                data: response.data?.list || [], // assuming API response has a 'data' field
            });
        } catch (error) {
            console.error("Error fetching station indicators:", error);
            setStationSpecialities({
                loading: false,
                data: [],
            });
        }
    };
    useEffect(() => {
        fetchData(['station_specialty_type'],);
        getStationIndicator()
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
    useEffect(() => {
        formik.setFieldValue('LongDescription', infotxt);
    }, [infotxt]);
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="City/Station Specialities"
                description="Add or update the required details for the city/station specialities to keep records accurate and complete."
            />
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4 mt-8 shadow-card rounded-md p-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Zatra Name */}
                    <FormInput
                        label="Station Speciality Type"
                        name="StationSpecialityTypeId"
                        type='select'
                        placeholder="Select a option"
                        options={categoryList}
                        value={formik.values?.StationSpecialityTypeId}
                        onChange={formik.handleChange}
                        error={formik.touched.StationSpecialityTypeId && formik.errors.StationSpecialityTypeId}
                        helperText={formik.touched.StationSpecialityTypeId && formik.errors.StationSpecialityTypeId}
                    />
                    <FormInput
                        label="Name / Title"
                        name="Name"
                        placeholder="Enter Name / Title"
                        value={formik.values?.Name}
                        onChange={formik.handleChange}
                        error={formik.touched?.Name && formik.errors?.Name}
                        helperText={formik.touched?.Name && formik.errors?.Name}
                    />
                    <FormInput
                        label="Short Description"
                        name="ShortDescription"
                        placeholder="Enter Short Description"
                        multiline
                        rows={3}
                        value={formik.values?.ShortDescription}
                        onChange={formik.handleChange}
                        error={formik.touched?.ShortDescription && formik.errors?.ShortDescription}
                        helperText={formik.touched?.ShortDescription && formik.errors?.ShortDescription}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-base font-semibold">Long Description</label>
                    <MyEditor
                        content={infotxt}
                        setContent={setInfoTxt}
                        desHeight={"120px"}
                    />
                    {formik.errors.LongDescription && formik.touched.LongDescription ? (
                        <span className="text-danger">{formik.errors.LongDescription}</span>
                    ) : null}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Picture Gallery */}
                    <div className="">
                        <label className="font-semibold">Picture Gallery</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formik.values?.PictureGallery?.map((img, index) => (
                                <div key={index} className="relative rounded-md py-2">
                                    {!img ? (
                                        <TextField
                                            size="small"
                                            type="file"
                                            fullWidth
                                            className='custom-input'
                                            inputProps={{ accept: "image/*" }}
                                            onChange={(e) =>
                                                handleFileUpload(e, "PictureGallery", index)
                                            }
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                    padding: '8px 12px',
                                                    height: 'auto',
                                                },
                                            }}
                                        />
                                    ) : (
                                        <>
                                            <img
                                                src={img}
                                                alt={`gallery-${index}`}
                                                className="w-full h-32 object-contain rounded mb-2 border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile("PictureGallery", index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                                            >
                                                ✕
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="contained"
                            size="small"
                            color='success'
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

                    {/* 🎥 Video Gallery (multi-video support) */}
                    <div className="">
                        <label className="font-semibold">Video Gallery</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formik.values?.VideoGallery?.map((video, index) => (
                                <div key={index} className="relative rounded-md py-2 w-full">
                                    {!video ? (
                                        <TextField
                                            size="small"
                                            fullWidth
                                            type="file"
                                            className='custom-input'
                                            inputProps={{ accept: "video/*" }}
                                            onChange={(e) => handleFileUpload(e, "VideoGallery", index)}
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                    padding: '8px 12px',
                                                    height: 'auto',
                                                },
                                            }}
                                        />
                                    ) : (
                                        <>
                                            <video
                                                controls
                                                className="w-full h-32 object-contain rounded mb-2 border"
                                            >
                                                <source src={video} type="video/mp4" />
                                            </video>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile("VideoGallery", index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                                            >
                                                ✕
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="contained"
                            size="small"
                            color='success'
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
                </div>

                <div>
                    <label className="font-semibold">Product Video URLs</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {formik.values.URL.map((url, index) => (
                            <div
                                key={index}
                                className="flex items-center relative space-x-2 mb-2 border border-gray-300 px-2 py-3 rounded-md"
                            >
                                <FormInput
                                    label={`URL`}
                                    name={`URL[${index}]`}
                                    placeholder="Enter video URL"
                                    value={url}
                                    onChange={formik.handleChange}
                                    error={formik.touched.URL && formik.errors.URL?.[index]}
                                />

                                {formik.values.URL.length > 1 && (
                                    <IconButton
                                        className='absolute top-3'
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
                <div className="mt-4">
                    <FormButton disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                    </FormButton>
                </div>
            </form>
            <div className="bg-white pb-2 rounded-xl my-16 ">
                <DataGrid
                    rows={stationSpecialities?.data}
                    columns={columns}
                    loading={stationSpecialities?.loading}
                    autoHeight
                    pagination
                    getRowId={(row) => row._id}
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
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10]}
                />
            </div>
            {/* ✅ Gallery Modal */}
          <Dialog open={openGallery} onClose={handleCloseGallery} maxWidth="md" fullWidth>
  <DialogTitle
    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
  >
    <span>
      {galleryData.images?.length > 0
        ? "Image Gallery"
        : galleryData.videos?.length > 0
        ? "Video Gallery"
        : "Gallery"}
    </span>
    <IconButton onClick={handleCloseGallery}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <Divider />

  <DialogContent>
    <div className="container gap-2">
      {/* ✅ Image Gallery */}
      {galleryData.images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {galleryData.images.map((img, i) => (
            <div key={i}>
              <img
                src={img}
                alt={`pic-${i}`}
                className="w-full h-32 object-cover rounded border"
              />
            </div>
          ))}
        </div>
      )}

      {/* ✅ Video Gallery (supports both MP4 & YouTube links) */}
      {galleryData?.videos?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
          {galleryData.videos.map((video, i) => {
            const isYouTube =
              video?.includes("youtube.com") || video?.includes("youtu.be");

            // ✅ Convert YouTube URL to embed format
            const embedUrl = isYouTube
              ? video
                  .replace("watch?v=", "embed/")
                  .replace("youtu.be/", "www.youtube.com/embed/")
              : video;

            return (
              <div key={i} className="rounded border overflow-hidden">
                {isYouTube ? (
                  <iframe
                    width="100%"
                    height="180"
                    src={embedUrl}
                    title={`youtube-video-${i}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    controls
                    className="w-full h-32 object-cover rounded border"
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  </DialogContent>
</Dialog>

        </div>
    )
}

export default StationSpecialities