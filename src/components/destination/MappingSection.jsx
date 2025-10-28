// components/common/MappingSection.jsx
import React from "react";
import { Checkbox } from "@mui/material";

const MappingSection = ({ tag, label, list = [], selected = [], onChange }) => {
    return (
        <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold">{label}</label>
            <div className="flex gap-2 flex-wrap border border-gray-300 rounded-md p-2">
                {list.map((item) => {
                    const checkboxId = `${tag}-${item._id}`;
                    const checked = selected?.includes(item._id);

                    return (
                        <div key={item._id} className="flex items-center gap-2">
                            <Checkbox
                                id={checkboxId}
                                checked={checked}
                                onChange={(e) => {
                                    const updated = e.target.checked
                                        ? [...selected, item._id]
                                        : selected.filter((id) => id !== item._id);
                                    onChange(updated);
                                }}
                            />
                            <label htmlFor={checkboxId} className="cursor-pointer select-none">
                                {item.lookup_value}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MappingSection;
