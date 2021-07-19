import React from 'react';
import ItemDetails from './ItemDetails';
import List from './List';

const StarInfo = (props) => {
    const {selectItem, selectedItem, getData, renderItem, getItemDetail, getImage, type, children} = props;
    return (
        <div className = "StarInfo StarInfo__pos">
            <List
            renderItem = {renderItem}
            onSelectItem = {selectItem}
            getData = {getData}/>
            
            <ItemDetails
                selectedItem = {selectedItem} 
                getData = {getItemDetail}
                getImage = {getImage}
                imageType = {type}>
                    {children}
            </ItemDetails>  
            
        </div>
    )
}


export default StarInfo;