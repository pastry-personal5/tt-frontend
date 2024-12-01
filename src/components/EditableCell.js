import React, { useState, useEffect } from 'react';

const EditableCell = ({ value: initialValue, row, columnId, updateRow }) => {
    const [value, setValue] = useState(initialValue || '');

    // Sync state with prop changes
    useEffect(() => {
        setValue(initialValue || '');
    }, [initialValue]);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleBlur = () => {
        if (value !== initialValue) {
            updateRow({ ...row, [columnId]: value });
        }
    };

    return <input value={value} onChange={handleChange} onBlur={handleBlur} />;
};

export default EditableCell;
