import React,{Component} from 'react';
import Table from "./TableAd"
import './Home.css'
import SearchForm from './SearchForm'
import Menu from './Menu'
class Home extends Component{
    constructor(props){
        super(props);
        this.getAds = this.getAds.bind(this);
        const data = this.getAds();
        this.componenta = <Table ads={data.ads}/>
    }

    async getAds(){
        let result = await fetch(`http://livinir.herokuapp.com/getAds`).catch(error=>console.log(error));
        if (result && result.ok)
            return await result.json();
        console.log('error');
    }

    render() {
     return(<div>
             <Menu></Menu>
             <div className='Home'>
                 <h1>Livinir</h1>
                 <SearchForm/>
                 {this.componenta}
             </div>
     </div>
     )
    }
}
export default Home;