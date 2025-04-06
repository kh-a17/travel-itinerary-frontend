import './InputBox.css';
import { useState, useEffect } from 'react';

const InputBox = ({ placeholder, className, sendDataToParent }) => {
    const [data, setData] = useState("");

    // Automatically send data to parent whenever `data` changes
    useEffect(() => {
        if (sendDataToParent && typeof sendDataToParent === 'function') {
            sendDataToParent(data);
        }
    }, [data, sendDataToParent]); // Run whenever `data` changes

    return (
        <input
            className={`input-wrapper ${className}`}
            placeholder={`${placeholder}`}
            value={data}
            onChange={(e) => setData(e.target.value)}
        />
        
    );
}

export default InputBox;
 