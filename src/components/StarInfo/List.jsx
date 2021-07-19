import React from 'react';
import Loading from '../Loading';


class List extends React.Component{

    state = {
        itemsList: [],
        loading: true,
    }

    componentDidMount(){
        this.onListLoaded();
    }

    onListLoaded = () => {
        const {getData} = this.props;
        getData()
            .then(itemsList => {
                this.setState({
                    itemsList,
                    loading: false,
                })
            });
    }

    renderItems = (arr) => {
        const {onSelectItem, renderItem} = this.props;
        return arr.map(item => {
            const label = renderItem(item);
            return (
                <li className = "List__list-item"
                    key = {item.id}
                    onClick = {() => onSelectItem(item.id, item.url)}>
                    {label}
                </li>
            )
        })
    }

    render(){
        const {renderItems} = this;
        const {itemsList, loading} = this.state;
        const loadComponent = loading ? <Loading/> : null;
        const listItems = renderItems(itemsList);
        return (
            <div className = "List">
                {loadComponent}
                <ul className = "List__list">
                    {listItems}
                </ul>
            </div>
        )
    }
}

export default List;