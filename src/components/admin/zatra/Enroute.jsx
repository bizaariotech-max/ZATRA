import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogContent,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import FormInput from "../../common/FormInput";
import { __getCommenApiDataList } from "../../../utils/api/commonApi";
import FormButton from "../../common/FormButton";
import { __postApiData } from "../../../utils/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Enroute = ({ open, onClose, zatraDetails, setZatraDetails, reload }) => {
    const [brandTypeList, setBrandTypeList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // ✅ Fetch dropdown data
    const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
        try {
            const data = await __getCommenApiDataList({
                lookup_type: lookupTypes,
                parent_lookup_id: parent_lookup_id || null,
            })
            setBrandTypeList(data);
        } catch (error) {
            console.error(`Error fetching ${stateKey}:`, error);
        }
    }
    useEffect(() => {
        fetchData(['station'],);
    }, []);

    // ✅ Formik setup
    const formik = useFormik({
        initialValues: {
            EnrouteStations:
                zatraDetails?.EnrouteStations?.length > 0
                    ? zatraDetails.EnrouteStations
                    : [
                        {
                            StateId: { _id: "", lookup_value: "" },
                            CityId: { _id: "", lookup_value: "" },
                        },
                    ],
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const payload = {
                    _id: zatraDetails?._id, // pass the ZatraId
                    EnrouteStations: values.EnrouteStations.map((station) => ({
                        StateId: station.StateId?._id,
                        CityId: station.CityId?._id,
                    })),
                };
                const res = await __postApiData("/api/v1/admin/SaveZatra",
                    payload
                );
                if (res.response && res.response.response_code === "200") {
                    toast.success("Enroute added successfully");
                    onClose();
                    reload();
                } else {
                    toast.error(res.response.response_message || "Failed to add Enroute");
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to submit:", error);
                setIsLoading(false);
            }
        },
    });

    // ✅ Add new station
    const handleAddStation = () => {
        formik.setFieldValue("EnrouteStations", [
            ...formik.values.EnrouteStations,
            {
                StateId: { _id: "", lookup_value: "" },
                CityId: { _id: "", lookup_value: "" },
            },
        ]);
    };

    // ✅ Remove a station
    const handleRemoveStation = (index) => {
        const updated = formik.values.EnrouteStations.filter((_, i) => i !== index);
        formik.setFieldValue("EnrouteStations", updated);
    };

    // ✅ When user selects a station option
    const handleStationChange = (index, value) => {
        const [parent_lookup_id, city_id] = value.split(" ");
        const selected = brandTypeList.find(
            (opt) =>
                opt.parent_lookup_id === parent_lookup_id && opt._id === city_id
        );

        if (selected) {
            const updatedStations = [...formik.values.EnrouteStations];
            updatedStations[index] = {
                StateId: {
                    _id: selected.parent_lookup_id,
                    lookup_value: selected.parent_lookup_name,
                },
                CityId: {
                    _id: selected._id,
                    lookup_value: selected.lookup_value,
                },
            };
            formik.setFieldValue("EnrouteStations", updatedStations);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => {
                onClose();
                setZatraDetails(null);
            }}
            fullWidth
            maxWidth="md"
        >
            {/* 🔝 Header */}
            <div
                className="flex justify-between items-center px-6 py-3 border-b border-gray-200"
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    backgroundColor: "#fff",
                }}
            >
                <h2 className="text-lg font-semibold">Add/Edit Enroute Stations</h2>
                <IconButton onClick={() => {
                    onClose();
                    setZatraDetails(null);
                }}>
                    <CloseIcon />
                </IconButton>
            </div>

            {/* 🧾 Form Section */}
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4">
                <DialogContent className="space-y-4">
                    <label className="block text-lg font-semibold mb-2">
                        Enroute Stations
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {formik.values?.EnrouteStations?.map((station, index) => {
                            // ✅ find current selected option
                            const selectedOption = brandTypeList.find(
                                (opt) =>
                                    opt.parent_lookup_id === station?.StateId?._id &&
                                    opt._id === station?.CityId?._id
                            );

                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 rounded-md"
                                >
                                    <FormInput
                                        type="select"
                                        name={`EnrouteStations[${index}]`}
                                        value={
                                            selectedOption
                                                ? `${selectedOption.parent_lookup_id} ${selectedOption._id}`
                                                : ""
                                        }
                                        onChange={(e) => handleStationChange(index, e.target.value)}
                                        options={brandTypeList.map((opt) => ({
                                            _id: `${opt.parent_lookup_id} ${opt._id}`,
                                            lookup_value: `${opt.parent_lookup_name} / ${opt.lookup_value}`,
                                        }))}
                                        placeholder={`Station ${index + 1}`}
                                    />

                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemoveStation(index)}
                                        disabled={formik.values.EnrouteStations.length === 1}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            );
                        })}
                    </div>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleAddStation}
                        className="mt-2"
                    >
                        + Add More
                    </Button>
                    <div>
                        <Link to={"/admin/configuration/city-station"}> <span className="text-sm text-webprimary cursor-pointer underline opacity-80 transition-opacity duration-200 delay-100 ease-in-out hover:opacity-100" >Not in list? Add New Station /city</span></Link>
                    </div>
                </DialogContent>

                <div className="flex justify-end px-6 pb-4">
                    <FormButton type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                    </FormButton>
                </div>
            </form>
        </Dialog>
    );
};

export default Enroute;
