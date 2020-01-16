import React, {Component} from 'react';
import Ad from "./Ad";
import './TableAd.css'
class TableAd extends Component{

    constructor(props){
        super(props)
        // this.state = {ads: ads};
    }

    render() {
        const ads = this.props.ads.map((item, index)=> <li key={index}><Ad ad={item}/></li> )
        return(<div className="Table">
            <ul>
                {ads}
            </ul>
        </div>);
    }
}
export default TableAd;