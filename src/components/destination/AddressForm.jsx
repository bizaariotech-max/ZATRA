import React, { useEffect, useState } from "react";
import FormInput from "../common/FormInput";

const AddressForm = ({ initialAddress = {}, onChange }) => {
  const [address, setAddress] = useState({
    AddressLine1: initialAddress?.AddressLine1 || "",
    AddressLine2: initialAddress?.AddressLine2 || "",
    PostalCode: initialAddress?.PostalCode || "",
    AddressGeoLocation: {
      type: "Point",
      coordinates: initialAddress?.AddressGeoLocation?.coordinates || [0, 0],
    },
    LaneFloorName: initialAddress?.LaneFloorName || "",
    LaneFloorNumber: initialAddress?.LaneFloorNumber || "",
    HallNumber: initialAddress?.HallNumber || "",
    HallName: initialAddress?.HallName || "",
    AllocationBoothNumber: initialAddress?.AllocationBoothNumber || "",
  });

  // Sync to parent whenever local state changes
  useEffect(() => {
    onChange(address);
  }, [address]);

  // Update simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Update latitude/longitude
  const handleCoordinateChange = (index, value) => {
    const updatedCoordinates = [...address.AddressGeoLocation.coordinates];
    updatedCoordinates[index] = parseFloat(value) || 0;
    setAddress((prev) => ({
      ...prev,
      AddressGeoLocation: { ...prev.AddressGeoLocation, coordinates: updatedCoordinates },
    }));
  };

  return (
    <div className="flex flex-col">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Address Line 1"
          name="AddressLine1"
          value={address.AddressLine1}
          onChange={handleChange}
          placeholder="Enter Address Line 1"
        />
        <FormInput
          label="Address Line 2"
          name="AddressLine2"
          value={address.AddressLine2}
          onChange={handleChange}
          placeholder="Enter Address Line 2"
        />
        <FormInput
          label="Postal Code"
          name="PostalCode"
          value={address.PostalCode}
          onChange={handleChange}
          placeholder="Enter Postal Code"
        />
        <FormInput
          label="Latitude"
          name="latitude"
          value={address.AddressGeoLocation.coordinates[0]}
          onChange={(e) => handleCoordinateChange(0, e.target.value)}
          placeholder="Enter Latitude"
        />
        <FormInput
          label="Longitude"
          name="longitude"
          value={address.AddressGeoLocation.coordinates[1]}
          onChange={(e) => handleCoordinateChange(1, e.target.value)}
          placeholder="Enter Longitude"
        />
        <FormInput
          label="Lane/Floor Number"
          name="LaneFloorNumber"
          value={address.LaneFloorNumber}
          onChange={handleChange}
          placeholder="Enter Lane/Floor Number"
        />
        <FormInput
          label="Lane/Floor Name"
          name="LaneFloorName"
          value={address.LaneFloorName}
          onChange={handleChange}
          placeholder="Enter Lane/Floor Name"
        />
        <FormInput
          label="Hall Number"
          name="HallNumber"
          value={address.HallNumber}
          onChange={handleChange}
          placeholder="Enter Hall Number"
        />
        <FormInput
          label="Hall Name"
          name="HallName"
          value={address.HallName}
          onChange={handleChange}
          placeholder="Enter Hall Name"
        />
        <FormInput
          label="Allocation Booth Number"
          name="AllocationBoothNumber"
          value={address.AllocationBoothNumber}
          onChange={handleChange}
          placeholder="Enter Allocation Booth Number"
        />
      </div>
    </div>
  );
};

export default AddressForm;


