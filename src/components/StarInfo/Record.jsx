import React from 'react';

const Record = ({item, field, label}) => {
    return (
        <div className = "ItemDetails__description-list-item block__descr-list-item">
            <span>{label}: </span>
            <span>{item[field]}</span>
        </div>
    )
}

export default Record;