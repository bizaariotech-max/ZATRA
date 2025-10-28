import React, { useEffect, useState } from 'react'
import FormInput from '../common/FormInput';

const ContactForm = ({ initialContact, onChange }) => {
    const [formData, setFormData] = useState({
        ContactName: initialContact?.ContactName || "",
        ContactPhoneNumber: initialContact?.ContactPhoneNumber || "",
        ContactEmailAddress: initialContact?.ContactEmailAddress || "",
    });
    // sync local state with parent
    useEffect(() => {
        onChange(formData);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                    label="Contact Name"
                    name="ContactName"
                    placeholder="Enter Contact Name"
                    value={formData?.ContactName}
                    onChange={handleChange}
                />
                <FormInput
                    label="Contact Phone Number"
                    name="ContactPhoneNumber"
                    inputMode={"numeric"}
                    placeholder="Enter Contact Phone Number"
                    value={formData.ContactPhoneNumber}
                    onChange={handleChange}
                />
                <FormInput
                    label="Contact Email Address"
                    name="ContactEmailAddress"
                    placeholder={"Enter Email Address"}
                    value={formData.ContactEmailAddress}
                    onChange={handleChange}
                />
            </div>
        </>
    )
}

export default ContactForm
