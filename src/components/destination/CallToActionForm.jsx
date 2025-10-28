import React, { useState, useEffect } from "react";
import { IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FormInput from "../common/FormInput"; // assuming you already have this component
import { __getCommenApiDataList } from "../../utils/api/commonApi";

const CallToActionForm = ({ initialCallToAction, onChange }) => {
    const [callFormData, setCallFormData] = useState(
        initialCallToAction?.length > 0 ?
            initialCallToAction?.map((item) => ({ ...item, CallToActionType: item?.CallToActionType, }))
            : [{ CallToActionType: null, URL: "", Name: "", ContactNumber: "", EmailAddress: "" }]
    );
    const [callActionList, setCallActionList] = useState([]);

    // ✅ Fetch amenities options
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await __getCommenApiDataList({
                    lookup_type: ["call_action_type"],
                });
                setCallActionList(
                    Array.isArray(data)
                        ? data
                        : data?.data || data?.list || []
                );
            } catch (error) {
                console.error("Error fetching amenities:", error);
            }
        };
        fetchData();
    }, []);


    // handle field change
    const handleInputChange = (index, name, value) => {
        const updatedData = [...callFormData];
        updatedData[index][name] = value;
        setCallFormData(updatedData);
        onChange && onChange(updatedData);
    };

    // add new CallToAction
    const handleAdd = () => {
        setCallFormData([
            ...callFormData,
            {
                CallToActionType: null,
                URL: "",
                Name: "",
                ContactNumber: "",
                EmailAddress: "",
            },
        ]);
    };

    // remove CallToAction
    const handleRemove = (index) => {
        const updatedData = callFormData.filter((_, i) => i !== index);
        setCallFormData(updatedData);
        onChange && onChange(updatedData);
    };

    return (
        <>
            {callFormData.map((item, index) => (
                <div
                    key={index}
                    className="border p-4 rounded-lg mb-4 relative bg-gray-50"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            label="Call To Action Type"
                            name="CallToActionType"
                            type="select"
                            //   placeholder="Enter Call To Action Type"
                            value={item.CallToActionType || ""}
                            onChange={(e) =>
                                handleInputChange(index, "CallToActionType", e.target.value)
                            }
                            options={callActionList}
                        />
                        <FormInput
                            label="URL"
                            name="URL"
                            placeholder="Enter URL"
                            value={item.URL}
                            onChange={(e) =>
                                handleInputChange(index, "URL", e.target.value)
                            }
                        />
                        <FormInput
                            label="Name"
                            name="Name"
                            placeholder="Enter Name"
                            value={item.Name}
                            onChange={(e) =>
                                handleInputChange(index, "Name", e.target.value)
                            }
                        />
                        <FormInput
                            label="Contact Number"
                            name="ContactNumber"
                            placeholder="Enter Contact Number"
                            value={item.ContactNumber}
                            onChange={(e) =>
                                handleInputChange(index, "ContactNumber", e.target.value)
                            }
                        />
                        <FormInput
                            label="Email Address"
                            name="EmailAddress"
                            placeholder="Enter Email Address"
                            value={item.EmailAddress}
                            onChange={(e) =>
                                handleInputChange(index, "EmailAddress", e.target.value)
                            }
                        />
                    </div>

                    {/* remove button */}
                    {callFormData.length > 1 && (
                        <IconButton
                            color="error"
                            onClick={() => handleRemove(index)}
                            style={{ position: "absolute", top: 5, right: 5 }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </div>
            ))}

            <Button
                variant="outlined"
                color="success"
                startIcon={<AddIcon />}
                onClick={handleAdd}
                size="small"
            >
                Add More
            </Button>
        </>
    );
};

export default CallToActionForm;
