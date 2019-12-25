import React, {Component} from 'react';
import Ad from "./Ad";
import './TableAd.css'
class TableAd extends Component{

    constructor(props){
        super(props)
        const ads = this.props.ads.map((item, index)=> <li key={index}><Ad ad={item}/></li> )
        this.state = {ads: ads};
    }

    render() {
        return(<div className="Table">
            <ul>
                {this.state.ads}
            </ul>
        </div>);
    }
}
export default TableAd;