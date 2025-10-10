// src/components/common/FormInput.jsx
import React from "react";
import { TextField, MenuItem } from "@mui/material";

const FormInput = ({
  label,
  name,
  placeholder,
  type = "text",
  options = [],
  inputMode,
  ...props
}) => {
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <TextField
            select
            fullWidth
            id={name}
            name={name}
            variant="outlined"
            size="small"
            className="custom-input"
            {...props}
          >
            <MenuItem value="" disabled>
              {placeholder || "Select an option"}
            </MenuItem>
            {options?.length > 0 && options?.map((opt) => (
              <MenuItem key={opt?._id} value={opt?._id}>
                {opt?.lookup_value}
              </MenuItem>
            ))}
          </TextField>
        );

      case "number":
        return (
          <TextField
            type="number"
            fullWidth
            id={name}
            name={name}
            placeholder={placeholder}
            variant="outlined"
            size="small"
            className="custom-input"
            inputProps={{
              inputMode: inputMode, // <-- pass inputMode here
            }}
            {...props}
          />
        );

      case "date":
        return (
          <TextField
            type="date"
            fullWidth
            id={name}
            name={name}
            variant="outlined"
            size="small"
            className="custom-input"
            InputLabelProps={{ shrink: true }}
            {...props}
          />
        );

      case "time":
        return (
          <TextField
            type="time"
            fullWidth
            id={name}
            name={name}
            variant="outlined"
            size="small"
            className="custom-input"
            InputLabelProps={{ shrink: true }}
            {...props}
          />
        );
      case "password":
        return (
          <TextField
            type="password"
            fullWidth
            id={name}
            name={name}
            variant="outlined"
            size="small"
            className="custom-input"
            InputLabelProps={{ shrink: true }}
            {...props}
          />
        );

      case "text":
      default:
        return (
          <TextField
            type="text"
            fullWidth
            id={name}
            name={name}
            placeholder={placeholder}
            variant="outlined"
            size="small"
            className="custom-input"
            inputProps={{
              inputMode: inputMode, // <-- pass inputMode here
            }}
            {...props}
          />
        );
    }
  };

  return (
    <div className="flex flex-col w-full gap-2">
      {label && (
        <label htmlFor={name} className="text-base font-semibold">
          {label}
        </label>
      )}
      {renderInput()}
    </div>
  );
};

export default FormInput;

