import React from 'react';

const ErrorComponent = () => {
    const ERROR_TEXT = "Something has gone wrong... But we sent droids already to fix it!";
    return (
        <div className = "ErrorComponent">
            {ERROR_TEXT}
        </div>
    )
}

export default ErrorComponent;