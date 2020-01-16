import React,{Component} from 'react';
import Table from "./TableAd"
import './Home.css'
import SearchForm from './SearchForm'
import Menu from './Menu'
import cookie from "react-cookies";

const namesForm = ['area','city','lease_date','sex']

class Home extends Component{
    constructor(props){
        super(props);
        this.getAds = this.getAds.bind(this);
        this.sentData = this.sentData.bind(this);
        this.state = {ads: null};
        if (!this.state.ads)
            this.getAds();
    }
    getDataForm(e){
        const cur_data = {};
        for (const name of namesForm)
            cur_data[name] = e.target[name].value
        return cur_data
    }

    async sentFetch(e){
        const res = this.getDataForm(e);
        let result =  await fetch(`https://livinir.herokuapp.com/getAdsParams?area=${res['area']}&city=${res['city']}&lease_date=${res['lease_date']}&sex=${res['sex']}`,{
            headers:{
                'Authorization': 'Bearer ' + cookie.load('token')
            }
        }).catch(error=>console.log(error));
        if (result.ok) {
            const data = await result.json();
            return data.ads
        }
    }

    async sentData(e) {
        if (e.target.id !== 'id1')
            return
        let {status, statusText} = ['', ''];
        e.preventDefault();
        const result = await this.sentFetch(e);
        console.log(result)
        this.setState({ads: result});
    }

    async getAds(){
        let result = await fetch(`https://livinir.herokuapp.com/getAds`).catch(error=>console.log(error));
        if (result && result.ok) {
            console.log(result)
            result = await result.json();
            this.setState({ads : result.ads.slice(0,12)})
        }
        else
            console.log('error');
    }

    render() {
        console.log(this.state.ads)
        if (this.state.ads) {
            return (<div>
                    <Menu></Menu>
                    <div onSubmit={this.sentData} className='Home'>
                        <h1>Livinir</h1>
                        <SearchForm/>
                        <Table ads={this.state.ads}/>
                    </div>
                </div>
            )
        }
        return (<div><Menu></Menu></div>)
    }
}
export default Home;
