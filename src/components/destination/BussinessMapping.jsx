import React, { useEffect, useState } from 'react'
import { __getCommenApiDataList } from '../../utils/api/commonApi';
import MappingSection from './MappingSection';

const BussinessMapping = ({ StationId, initialData, onChange }) => {
    const [bussinessMap, setBussinessMap] = useState({
        BrandsMapping: initialData.BrandsMapping,
        ODOPMapping: initialData.ODOPMapping,
        ExportsMapping: initialData.ExportsMapping,
        LocalCropsMapping: initialData.LocalCropsMapping,
        LocalProductsMapping: initialData.LocalProductsMapping,
        LocalSweetsMapping: initialData.LocalSweetsMapping,
        LocalSnacksMapping: initialData.LocalSnacksMapping,
        LocalCuisineMapping: initialData.LocalCuisineMapping,
        LocalSpicesMapping: initialData.LocalSpicesMapping,
        LocalFoodsMapping: initialData.LocalFoodsMapping,
        VocalForLocal: initialData.VocalForLocal,
    });
    const [dataList, setDataList] = useState({
        brandsList: [],
        odopList: [],
        exportsList: [],
        localcropsList: [],
        localproductsList: [],
        localsweetsList: [],
        localsnacksList: [],
        localcuisineList: [],
        localspicesList: [],
        localfoodList: [],
    });
    const { brandsList, odopList, exportsList, localcropsList, localproductsList, localsweetsList, localsnacksList, localcuisineList, localspicesList, localfoodList } = dataList;

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
        fetchData(["station_speciality_brands"], "brandsList", StationId);
        fetchData(["station_speciality_odop"], "odopList", StationId);
        fetchData(["station_speciality_exports"], "exportsList", StationId);
        fetchData(
            ["station_speciality_localcrops"],
            "localcropsList",
            StationId
        );
        fetchData(
            ["station_speciality_vocalforlocal"],
            "localproductsList",
            StationId
        );
        fetchData(
            ["station_speciality_localsweets"],
            "localsweetsList",
            StationId
        );
        fetchData(
            ["station_speciality_localsnacks"],
            "localsnacksList",
            StationId
        );
        fetchData(
            ["station_speciality_localcuisine"],
            "localcuisineList",
            StationId
        );
        fetchData(
            ["station_speciality_localspices"],
            "localspicesList",
            StationId
        );
        fetchData(
            ["station_speciality_localstreetfoods"],
            "localfoodList",
            StationId
        );
    }, [StationId]);
    const handleChange = (field, updatedList) => {
        const updatedData = {
            ...bussinessMap,
            [field]: updatedList,
        };
        setBussinessMap(updatedData);
        onChange(updatedData);
    };

    return (
        <>
            <div className="flex flex-col gap-4">
                <MappingSection
                    tag="MapBrands"
                    label="Mapping with Brands"
                    list={brandsList}
                    selected={bussinessMap?.BrandsMapping || []}
                    onChange={(updated) => handleChange("BrandsMapping", updated)}
                />

                <MappingSection
                    tag="MapODOP"
                    label="Mapping with ODOP"
                    list={odopList}
                    selected={bussinessMap?.ODOPMapping || []}
                    onChange={(updated) => handleChange("ODOPMapping", updated)}
                />

                <div className="flex gap-2 flex-col">
                    <label className="text-base font-semibold">Vocal For Local</label>
                    <div className="flex gap-4">
                        {[
                            { _id: 1, type: true, lookup_value: "Yes" },
                            { _id: 2, type: false, lookup_value: "No" },
                        ].map((level) => (
                            <label key={level._id} className="flex items-center cursor-pointer gap-2">
                                <input
                                    type="radio"
                                    name="VocalForLocal"
                                    value={String(level.type)}
                                    checked={bussinessMap?.VocalForLocal === level.type}
                                    onChange={() => handleChange("VocalForLocal", level.type)}
                                />
                                <span>{level.lookup_value}</span>
                            </label>
                        ))}
                    </div>

                </div>

                <MappingSection
                    tag="MapExports"
                    label="Mapping with Exports"
                    list={exportsList}
                    selected={bussinessMap?.ExportsMapping || []}
                    onChange={(updated) => handleChange("ExportsMapping", updated)}
                />

                <MappingSection
                    tag="MapLocalCrops"
                    label="Mapping with Local Crops"
                    list={localcropsList}
                    selected={bussinessMap?.LocalCropsMapping || []}
                    onChange={(updated) => handleChange("LocalCropsMapping", updated)}
                />

                <MappingSection
                    tag="MapLocalProducts"
                    label="Mapping with Vocal for Local Products Local Handicrafts/Handlooms"
                    list={localproductsList}
                    selected={bussinessMap?.LocalProductsMapping || []}
                    onChange={(updated) => handleChange("LocalProductsMapping", updated)}
                />

                <MappingSection
                    tag="MapLocalSweets"
                    label="Mapping with Local Sweets"
                    list={localsweetsList}
                    selected={bussinessMap?.LocalSweetsMapping || []}
                    onChange={(updated) => handleChange("LocalSweetsMapping", updated)}
                />

                <MappingSection
                    tag="MapLocalSnacks"
                    label="Mapping with Local Snacks/Namkeens"
                    list={localsnacksList}
                    selected={bussinessMap?.LocalSnacksMapping || []}
                    onChange={(updated) => handleChange("LocalSnacksMapping", updated)}
                />

                <MappingSection
                    tag="MapLocalCuisine"
                    label="Mapping with Local Cuisine"
                    list={localcuisineList}
                    selected={bussinessMap?.LocalCuisineMapping || []}
                    onChange={(updated) => handleChange("LocalCuisineMapping", updated)}
                />

                <MappingSection
                    tag="MapLocalSpices"
                    label="Mapping with Local Spices"
                    list={localspicesList}
                    selected={bussinessMap?.LocalSpicesMapping || []}
                    onChange={(updated) => handleChange("LocalSpicesMapping", updated)}
                />

                <MappingSection
                    tag="MapLocalStreetFoods"
                    label="Mapping with Local Street Foods"
                    list={localfoodList}
                    selected={bussinessMap?.LocalFoodsMapping || []}
                    onChange={(updated) => handleChange("LocalFoodsMapping", updated)}
                />
            </div>
        </>
    )
}

export default BussinessMapping
