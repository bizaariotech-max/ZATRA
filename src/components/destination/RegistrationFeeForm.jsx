import React, { useEffect, useState } from 'react'
import FormInput from '../common/FormInput';
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { __getCommenApiDataList } from '../../utils/api/commonApi';

const RegistrationFeeForm = ({ initialFee, onChange }) => {
    const [feeDetails, setFeeDetails] = useState({
        RegistrationFeeCategoryAmount: initialFee.RegistrationFeeCategoryAmount,
        FeeCollectionLink: initialFee.FeeCollectionLink,
        AccountName: initialFee.AccountName,
        BankName: initialFee.BankName,
        IFSCcode: initialFee.IFSCcode,
        AccountNumber: initialFee.AccountNumber,
    });
    const [datalist, setDataList] = useState({
        registrationCategoryList: [],
        bankList: [],
    });
    const { registrationCategoryList, bankList } = datalist;
    const handleInputChange = (field, value) => {
        setFeeDetails((prev) => ({ ...prev, [field]: value }));
    };
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
        fetchData(["registration_fee_category"], "registrationCategoryList", null);
        fetchData(["banks"], "bankList", null);
    }, [])
    useEffect(() => {
        onChange(feeDetails);
    }, [feeDetails]);

    // 🔹 Handle change for dynamic fee category list
    const handleFeeChange = (index, field, value) => {
        const updated = [...feeDetails.RegistrationFeeCategoryAmount];
        updated[index][field] = value;
        setFeeDetails((prev) => ({ ...prev, RegistrationFeeCategoryAmount: updated }));
    };

    const handleAddFee = () => {
        setFeeDetails((prev) => ({
            ...prev,
            RegistrationFeeCategoryAmount: [
                ...prev.RegistrationFeeCategoryAmount,
                { FeeCategory: null, Amount: "" },
            ],
        }));
    };

    const handleRemoveFee = (index) => {
        const updated = feeDetails.RegistrationFeeCategoryAmount.filter(
            (_, i) => i !== index
        );
        setFeeDetails((prev) => ({
            ...prev,
            RegistrationFeeCategoryAmount:
                updated.length > 0
                    ? updated
                    : [{ FeeCategory: null, Amount: "" }],
        }));
    };
    return (
        <>
            <div className="space-y-6">

                {feeDetails?.RegistrationFeeCategoryAmount?.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 border p-3 rounded-md bg-gray-50"
                    >
                        <FormInput
                            label="Fee Category"
                            name={`FeeCategory-${index}`}
                            type="select"
                            value={item.FeeCategory}
                            onChange={(e) =>
                                handleFeeChange(index, "FeeCategory", e.target.value)
                            }
                            options={registrationCategoryList}
                        />

                        <FormInput
                            label="Amount"
                            name={`Amount-${index}`}
                            inputMode={"numeric"}
                            placeholder={"Enter Amount"}
                            value={item.Amount}
                            onChange={(e) =>
                                handleFeeChange(index, "Amount", e.target.value)
                            }

                        />

                        <div className="flex items-center">
                            {feeDetails.RegistrationFeeCategoryAmount.length > 1 && (
                                <IconButton color="error" onClick={() => handleRemoveFee(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </div>
                    </div>
                ))}
                <div className="flex justify-start">
                    <Button variant="outlined" color="success" onClick={handleAddFee}>
                        + Add More
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <FormInput
                        label="Fee Collection Link"
                        name="FeeCollectionLink"
                        value={feeDetails.FeeCollectionLink}
                        onChange={(e) =>
                            handleInputChange("FeeCollectionLink", e.target.value)
                        }
                        placeholder="Enter Fee Collection Link"
                    />

                    <FormInput
                        label="Payment or Code"
                        name="PaymentOrCode"
                        value={feeDetails.PaymentOrCode}
                        onChange={(e) => handleInputChange("PaymentOrCode", e.target.value)}
                        placeholder={"Enter Payment or code"}
                    />

                    <FormInput
                        label="Account Name"
                        name="AccountName"
                        placeholder={"Enter Account Name"}
                        value={feeDetails.AccountName}
                        onChange={(e) => handleInputChange("AccountName", e.target.value)}

                    />

                    <FormInput
                        label="Bank Name"
                        name="BankName"
                        type='select'
                        value={feeDetails.BankName}
                        options={bankList}
                        onChange={(e) => handleInputChange("BankName", e.target.value)}
                    />

                    <FormInput
                        label="IFSC Code"
                        name="IFSCcode"
                        value={feeDetails.IFSCcode}
                        onChange={(e) => handleInputChange("IFSCcode", e.target.value)}
                        placeholder={"Enter IFSC Code"}
                    />

                    <FormInput
                        label="Account Number"
                        name="AccountNumber"
                        placeholder={"Enter Account Number"}
                        value={feeDetails.AccountNumber}
                        onChange={(e) => handleInputChange("AccountNumber", e.target.value)}

                    />
                </div>
            </div>

        </>
    )
}

export default RegistrationFeeForm
