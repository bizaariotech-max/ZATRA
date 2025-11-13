import React, { useEffect, useState } from 'react'
import FormInput from '../common/FormInput'
import MappingSection from './MappingSection'
import MyEditor from '../textEditor/MyEditor'
import { __getCommenApiDataList } from '../../utils/api/commonApi'

const ScheduleForm = ({ initialSchedule, onChange }) => {
    const [scheduleDetails, setScheduleDetails] = useState({
        BtvFrom: initialSchedule.BtvFrom,
        BtvTo: initialSchedule.BtvTo,
        WeeklyOff: initialSchedule.WeeklyOff,
        OpeningTime: initialSchedule.OpeningTime,
        ClosingTime: initialSchedule.ClosingTime,
        MbtFrom: initialSchedule.MbtFrom,
        MbtTo: initialSchedule.MbtTo,
        SpecialDarshansName: initialSchedule.SpecialDarshansName,
        SpecialDarshansTime: initialSchedule.SpecialDarshansTime,
        Insturctions: initialSchedule.Insturctions,
        NoOfVisitors: initialSchedule.NoOfVisitors,
        Advisory: initialSchedule.Advisory,
    })
    const [instructionsEditor, setInstructionsEditor] = useState(initialSchedule.Insturctions || "");
    const [brandsList, setBrandsList] = useState([]);
    const handleChangeChecked = (field, updatedList) => {
        const updatedData = {
            ...scheduleDetails,
            [field]: updatedList,
        };
        setScheduleDetails(updatedData);
        onChange(updatedData);
    };
    useEffect(() => {
        onChange(scheduleDetails);
    }, [scheduleDetails]);

    // Sync instructions editor to form state
    useEffect(() => {
        setScheduleDetails((prev) => ({
            ...prev,
            Insturctions: instructionsEditor,
        }));
    }, [instructionsEditor]);

    ///========== fetch data from api ============\\
    const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
        try {
            const data = await __getCommenApiDataList({
                lookup_type: lookupTypes,
                parent_lookup_id: parent_lookup_id || null,
            })
            setBrandsList(data);
        } catch (error) {
            console.error(`Error fetching ${stateKey}:`, error);
        }
    }

    useEffect(() => {
        fetchData(['advisory_type'],);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScheduleDetails((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <div className="flex flex-col gap-4">
            <div>
                <label className="text-base font-semibold">
                    Best Time to Visit
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 border border-gray-200 p-4 rounded-md">
                    <FormInput
                        type='date'
                        name={"BtvFrom"}
                        label={"From"}
                        value={scheduleDetails.BtvFrom}
                        onChange={handleChange}
                    />
                    <FormInput
                        type='date'
                        name={"BtvTo"}
                        label={"To"}
                        value={scheduleDetails.BtvTo}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <MappingSection
                    tag="Weekoff"
                    label="Weekly Off"
                    list={[{ _id: "monday", lookup_value: "Monday" }, { _id: "tuesday", lookup_value: "Tuesday" }, { _id: "wednesday", lookup_value: "Wednesday" }, { _id: "thursday", lookup_value: "Thursday" }, { _id: "friday", lookup_value: "Friday" }, { _id: "saturday", lookup_value: "Saturday" }, { _id: "sunday", lookup_value: "Sunday" }]}
                    selected={scheduleDetails?.WeeklyOff || []}
                    onChange={(updated) => handleChangeChecked("WeeklyOff", updated)}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <FormInput
                    type='time'
                    name={"OpeningTime"}
                    label={"Opening Time"}
                    value={scheduleDetails.OpeningTime}
                    onChange={handleChange}
                />
                <FormInput
                    type='time'
                    name={"ClosingTime"}
                    label={"Closing Time"}
                    value={scheduleDetails.ClosingTime}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="text-base font-semibold">
                    Midday Break Time
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 border border-gray-200 p-4 rounded-md">
                    <FormInput
                        type='time'
                        name={"MbtFrom"}
                        label={"From"}
                        value={scheduleDetails.MbtFrom}
                        onChange={handleChange}
                    />
                    <FormInput
                        type='time'
                        name={"MbtTo"}
                        label={"To"}
                        value={scheduleDetails.MbtTo}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div>
                <label className="text-base font-semibold">
                    Special Darshans / Visits in a Day
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 border border-gray-200 p-4 rounded-md">
                    <FormInput
                        name={"SpecialDarshansName"}
                        label={"Special Darshans Name"}
                        placeholder={"Enter Special Darshan name"}
                        value={scheduleDetails.SpecialDarshansName}
                        onChange={handleChange}
                    />
                    <FormInput
                        type='time'
                        name={"SpecialDarshansTime"}
                        label={"Time"}
                        value={scheduleDetails.SpecialDarshansTime}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-base font-semibold">Instructions for users</label>
                <MyEditor
                    content={instructionsEditor}
                    setContent={setInstructionsEditor}
                    desHeight={"120px"}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <FormInput
                    name={"NoOfVisitors"}
                    label={"No. of Visitors per day"}
                    placeholder={"Enter Number of visitor's"}
                    value={scheduleDetails.NoOfVisitors}
                    onChange={handleChange}
                />
                <FormInput
                    type='select'
                    name={"Advisory"}
                    label={"Advisory"}
                    options={brandsList}
                    value={scheduleDetails.Advisory}
                    onChange={handleChange}
                />
            </div>

        </div>
    )
}

export default ScheduleForm