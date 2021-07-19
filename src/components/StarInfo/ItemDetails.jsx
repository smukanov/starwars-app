import React from 'react';
import SwapiService  from '../../services/swapiService';
import Loading from '../Loading';

class ItemDetails extends React.Component{

    swapiService = new SwapiService();

    state = {
        item: null,
        loading: false,
        image: null,
        isEnabled: false,
    }

    componentDidUpdate(prevProps){
        if (prevProps.selectedItem != this.props.selectedItem){
            this.setState({
                loading: true,
            })
            const id = this.props.selectedItem;
            this.onSetItem(id);
        }
        
    }

    componentWillUnmount(){
        console.log("unmount");
    }

    onSetItem = (id) => {
        const {getData, getImage, imageType} = this.props;
        getData(id)
            .then(item => {
                this.setState({
                    item,
                    loading: false,
                    isEnabled: true,
                    image: getImage(id, imageType),
                });
            })
    }

    render(){
        if (this.state.loading){
            return <Loading/>
        }
        if (!this.state.isEnabled){
            return <span>Select item from list!</span>
        }
        const {item, image} = this.state;
        return (
            <div className = "ItemDetails block">
                <div className = "ItemDetails__img-wrapper block__img-wrapper">
                    <img className = "ItemDetails__img" 
                        src={image} alt="" />
                </div>
                <div className = "ItemDetails__description block__descr">
                    <div className = "ItemDetails__name block__name">
                        <span>{item.name}</span>
                    </div>
                    <div className = "ItemDetails__description-list block__descr-list">
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, {item})
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemDetails;