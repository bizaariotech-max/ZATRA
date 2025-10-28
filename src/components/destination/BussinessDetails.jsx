import React, { useEffect, useState } from 'react'
import FormInput from '../common/FormInput'
import { __getCommenApiDataList } from '../../utils/api/commonApi';

const BussinessDetails = ({ initialBusinessDetails, onChange }) => {
    const [bussinessDetails, setBussinessDetails] = useState(initialBusinessDetails);
    const [dataList, setDataList] = useState({
        IndustrySectorList: [],
        SubIndustrySectorList: [],
        AssetTypeList: [],
    });
    const { IndustrySectorList, SubIndustrySectorList, AssetTypeList } = dataList;
    // Sync changes to parent
    useEffect(() => {
        onChange(bussinessDetails);
    }, [bussinessDetails]);

    // ✅ Handle text field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBussinessDetails((prev) => ({ ...prev, [name]: value }));
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
        fetchData(["industry_sector"], "IndustrySectorList", null);
        fetchData(["asset_type"], "AssetTypeList", null);
    }, [])
    useEffect(() => {
        if (bussinessDetails.IndustrySectorId) {
            fetchData(["industry_sub_sector"], "SubIndustrySectorList", bussinessDetails?.IndustrySectorId);
        }

    }, [bussinessDetails.IndustrySectorId])


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-2">
                <FormInput
                    type='select'
                    name="IndustrySectorId"
                    label={"Industry / Sector"}
                    value={bussinessDetails.IndustrySectorId}
                    onChange={handleChange}
                    options={IndustrySectorList}
                />
                <FormInput
                    type='select'
                    name="SubIndustrySectorId"
                    onChange={handleChange}
                    label={"Sub Industry / Sub Sector"}
                    value={bussinessDetails.SubIndustrySectorId}
                    options={SubIndustrySectorList}
                />
                <FormInput
                    type='select'
                    name="AssetType"
                    onChange={handleChange}
                    label={"Asset Type"}
                    value={bussinessDetails.AssetType}
                    options={AssetTypeList}
                />
                <FormInput
                    name="MinInvestments"
                    label={"Minimumm Investments (In Lacs)"}
                    inputMode={"numeric"}
                    value={bussinessDetails.MinInvestments}
                    onChange={handleChange}
                    placeholder={"₹ 0"}
                />
                <FormInput
                    name="AssuredRois"
                    label={"Assured ROIs (In %)"}
                    inputMode={"numeric"}
                    value={bussinessDetails.AssuredRois}
                    onChange={handleChange}
                    placeholder={"0"}
                />
            </div>

        </>
    )
}

export default BussinessDetails
