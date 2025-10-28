import React, { useEffect, useState } from 'react'
import MappingSection from './MappingSection'
import { __getCommenApiDataList } from '../../utils/api/commonApi';

const MedicalSpecialties = ({ initialMedicalSpecialties, onChange }) => {
    const [bussinessMap, setBussinessMap] = useState({
        MedicalSpecialities: initialMedicalSpecialties
    })
    const [brandsList, setBrandsList] = useState([]);

    const handleChange = (field, updatedList) => {
        const updatedData = {
            ...bussinessMap,
            [field]: updatedList,
        };
        setBussinessMap(updatedData);
        onChange(updatedData);
    };
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
        fetchData(['medical_speciality'],);
    }, []);
    return (
        <div className="flex flex-col gap-4">
            <MappingSection
                tag="MedicalSpecialities"
                label="Medical Specialties"
                list={brandsList}
                selected={bussinessMap?.MedicalSpecialities || []}
                onChange={(updated) => handleChange("MedicalSpecialities", updated)}
            />
        </div>
    )
}

export default MedicalSpecialties
