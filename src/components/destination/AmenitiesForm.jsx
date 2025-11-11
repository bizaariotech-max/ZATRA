import React, { useEffect, useState } from "react";
import FormInput from "../common/FormInput";
import { Button } from "@mui/material";
import { __getCommenApiDataList } from "../../utils/api/commonApi";

const AmenitiesForm = ({ initialAmenities = [], onChange }) => {
  const [amenities, setAmenities] = useState(
    initialAmenities?.length > 0
      ? initialAmenities.map((item) => ({
        AmenityId: item?.AmenityId,
        GeoLocation:
          item?.GeoLocation?.coordinates?.join(", ") ||
          item?.GeoLocation ||
          "",
      }))
      : [
        {
          AmenityId: "",
          GeoLocation: "",
        },
      ]
  );

  const [amenitiesList, setAmenitiesList] = useState([]);

  // ✅ Fetch amenities options
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await __getCommenApiDataList({
          lookup_type: ["amenities_type"],
        });
        setAmenitiesList(
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

  // ✅ Sync with parent
  useEffect(() => {
    const formatted = amenities.map((a) => ({
      AmenityId: a?.AmenityId,
      GeoLocation: {
        type: "Point",
        coordinates:
          typeof a.GeoLocation === "string" && a.GeoLocation.includes(",")
            ? a.GeoLocation.split(",").map((v) => parseFloat(v.trim()))
            : [0, 0],
      },
    }));
    console.log("Formatted Amenities:", formatted);
    console.log("Raw Amenities State:", amenities);
    onChange({ Amenities: formatted });
  }, [amenities]);

  // ✅ Handle input change
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...amenities];
    updated[index][name] = value;
    setAmenities(updated);
  };

  // ✅ Add new Amenity
  const handleAdd = () => {
    setAmenities([
      ...amenities,
      {
        AmenityId: "",
        GeoLocation: "",
      },
    ]);
  };

  // ✅ Remove Amenity
  const handleRemove = (index) => {
    const updated = amenities.filter((_, i) => i !== index);
    setAmenities(updated);
  };

  return (
    <div className="flex flex-col gap-4">
      {amenities.map((amenity, index) => (
        <div
          key={index}
          className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Amenities"
              name="AmenityId"
              type="select"
              placeholder="Select an amenity"
              value={amenity?.AmenityId}
              onChange={(e) => handleChange(index, e)}
              options={amenitiesList}
            />

            <FormInput
              label="Geo Location"
              name="GeoLocation"
              placeholder="Enter latitude,longitude (e.g. 28.6282, 77.3898)"
              value={amenity.GeoLocation}
              onChange={(e) => handleChange(index, e)}
            />
          </div>

          {/* Remove button */}
          {amenities.length > 1 && (
            <div className="flex justify-end">
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemove(index)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      ))}

      {/* Add more button */}
      <div className="flex justify-start">
        <Button variant="outlined" color="success" onClick={handleAdd}>
          + Add More
        </Button>
      </div>
    </div>
  );
};

export default AmenitiesForm;
