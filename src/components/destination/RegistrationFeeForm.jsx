import React, { useEffect, useState } from 'react'
import FormInput from '../common/FormInput';
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { __getCommenApiDataList } from '../../utils/api/commonApi';

const RegistrationFeeForm = ({ initialFee, onChange }) => {
    const [feeDetails, setFeeDetails] = useState({
        RegistrationFeeCategoryAmount: initialFee.RegistrationFeeCategoryAmount || [{ FeeCategory: null, Amount: "" }],
        FeeCollectionLink: initialFee.FeeCollectionLink || "",
        AccountName: initialFee.AccountName || "",
        BankName: initialFee.BankName || "",
        IFSCcode: initialFee.IFSCcode || "",
        AccountNumber: initialFee.AccountNumber || "",
        AmenitiesProvided: initialFee.AmenitiesProvided?.length ? initialFee.AmenitiesProvided : [""],
        SpecialDarshansFeeCategoryAmount: initialFee.SpecialDarshansFeeCategoryAmount || [{ FeeCategory: null, Amount: "" }],
        CameraAndShootingFeeCategoryAmount: initialFee.CameraAndShootingFeeCategoryAmount || [{ FeeCategory: null, Amount: "" }],
    });

    const [datalist, setDataList] = useState({
        registrationCategoryList: [],
        bankList: [],
    });

    const { registrationCategoryList, bankList } = datalist;

    const handleInputChange = (field, value) => {
        setFeeDetails((prev) => ({ ...prev, [field]: value }));
    };

    const updateState = (data) => setDataList((prevState) => ({ ...prevState, ...data }));

    const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
        try {
            const data = await __getCommenApiDataList({
                lookup_type: lookupTypes,
                parent_lookup_id: parent_lookup_id || null,
            });

            if (data && Array.isArray(data) && data.length > 0) {
                updateState({ [stateKey]: data });
            } else if (data?.data?.length > 0) {
                updateState({ [stateKey]: data.data });
            } else if (data?.list?.length > 0) {
                updateState({ [stateKey]: data.list });
            } else {
                updateState({ [stateKey]: [] });
            }
        } catch (error) {
            console.error(`Error fetching ${stateKey}:`, error);
        }
    };

    useEffect(() => {
        fetchData(["registration_fee_category"], "registrationCategoryList", null);
        fetchData(["banks"], "bankList", null);
    }, []);

    useEffect(() => {
        onChange(feeDetails);
    }, [feeDetails]);

    // 🔹 Generic dynamic list handler for fee sections
    const handleDynamicFeeChange = (section, index, field, value) => {
        const updated = [...feeDetails[section]];
        updated[index][field] = value;
        setFeeDetails((prev) => ({ ...prev, [section]: updated }));
    };

    const handleAddFee = (section) => {
        setFeeDetails((prev) => ({
            ...prev,
            [section]: [...prev[section], { FeeCategory: null, Amount: "" }],
        }));
    };

    const handleRemoveFee = (section, index) => {
        const updated = feeDetails[section].filter((_, i) => i !== index);
        setFeeDetails((prev) => ({
            ...prev,
            [section]: updated.length > 0 ? updated : [{ FeeCategory: null, Amount: "" }],
        }));
    };

    // 🔹 Amenities add/remove/change handler
    const handleAmenityChange = (index, value) => {
        const updated = [...feeDetails.AmenitiesProvided];
        updated[index] = value;
        setFeeDetails((prev) => ({ ...prev, AmenitiesProvided: updated }));
    };

    const handleAddAmenity = () => {
        setFeeDetails((prev) => ({
            ...prev,
            AmenitiesProvided: [...prev.AmenitiesProvided, ""],
        }));
    };

    const handleRemoveAmenity = (index) => {
        const updated = feeDetails.AmenitiesProvided.filter((_, i) => i !== index);
        setFeeDetails((prev) => ({
            ...prev,
            AmenitiesProvided: updated.length > 0 ? updated : [""],
        }));
    };

    // 🔹 Common renderer for fee category sections
    const renderFeeSection = (title, sectionKey) => (
        <div className="space-y-4">
            <h3 className="text-base font-semibold">{title}</h3>
            {feeDetails[sectionKey]?.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center flex-col md:flex-row gap-3 border p-3 rounded-md bg-gray-50"
                >
                    <FormInput
                        label="Fee Category"
                        name={`FeeCategory-${index}`}
                        type="select"
                        value={item.FeeCategory}
                        onChange={(e) =>
                            handleDynamicFeeChange(sectionKey, index, "FeeCategory", e.target.value)
                        }
                        options={registrationCategoryList}
                    />

                    <FormInput
                        label="Amount"
                        name={`Amount-${index}`}
                        inputMode="numeric"
                        placeholder="Enter Amount"
                        value={item.Amount}
                        onChange={(e) =>
                            handleDynamicFeeChange(sectionKey, index, "Amount", e.target.value)
                        }
                    />

                    {feeDetails[sectionKey].length > 1 && (
                        <IconButton
                            color="error"
                            onClick={() => handleRemoveFee(sectionKey, index)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </div>
            ))}

            <div className="flex justify-start">
                <Button variant="outlined" color="success" onClick={() => handleAddFee(sectionKey)}>
                    + Add More
                </Button>
            </div>
        </div>
    );

    // 🔹 Amenities Section Renderer
    const renderAmenitiesSection = () => (
        <div className="space-y-4">
            <h3 className="text-base font-semibold">Amenities Provided</h3>
            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
            {feeDetails.AmenitiesProvided.map((amenity, index) => (
                    <div   key={index} className="flex items-center gap-3">
                    <FormInput
                        // label={`Amenity`}
                        name={`Amenity-${index}`}
                        placeholder="Enter Amenity"
                        value={amenity}
                        onChange={(e) => handleAmenityChange(index, e.target.value)}
                    />

                    {feeDetails.AmenitiesProvided.length > 1 && (
                        <IconButton color="error" onClick={() => handleRemoveAmenity(index)}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                    </div>
            ))}
            </div>

            <div className="flex justify-start">
                <Button variant="outlined" color="success" onClick={handleAddAmenity}>
                    + Add More
                </Button>
            </div>
        </div>
    );

    return (
        <div className="space-y-3">
            {renderFeeSection("Registration Fee Details", "RegistrationFeeCategoryAmount")}
            {renderFeeSection("Special Darshans Fee Details", "SpecialDarshansFeeCategoryAmount")}
            {renderFeeSection("Camera and Shooting Fee Details", "CameraAndShootingFeeCategoryAmount")}
            {renderAmenitiesSection()}

            {/* Bank and Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <FormInput
                    label="Fee Collection Link"
                    name="FeeCollectionLink"
                    value={feeDetails.FeeCollectionLink}
                    onChange={(e) => handleInputChange("FeeCollectionLink", e.target.value)}
                    placeholder="Enter Fee Collection Link"
                />

                <FormInput
                    label="Payment or Code"
                    name="PaymentOrCode"
                    value={feeDetails.PaymentOrCode}
                    onChange={(e) => handleInputChange("PaymentOrCode", e.target.value)}
                    placeholder="Enter Payment or Code"
                />

                <FormInput
                    label="Account Name"
                    name="AccountName"
                    placeholder="Enter Account Name"
                    value={feeDetails.AccountName}
                    onChange={(e) => handleInputChange("AccountName", e.target.value)}
                />

                <FormInput
                    label="Bank Name"
                    name="BankName"
                    type="select"
                    value={feeDetails.BankName}
                    options={bankList}
                    onChange={(e) => handleInputChange("BankName", e.target.value)}
                />

                <FormInput
                    label="IFSC Code"
                    name="IFSCcode"
                    value={feeDetails.IFSCcode}
                    onChange={(e) => handleInputChange("IFSCcode", e.target.value)}
                    placeholder="Enter IFSC Code"
                />

                <FormInput
                    label="Account Number"
                    name="AccountNumber"
                    placeholder="Enter Account Number"
                    value={feeDetails.AccountNumber}
                    onChange={(e) => handleInputChange("AccountNumber", e.target.value)}
                />
            </div>
        </div>
    );
};

export default RegistrationFeeForm;
