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
        let result =  await fetch("https://livinir.herokuapp.com/getAdsParams",{
            headers:{
                'Authorization': 'Bearer ' + cookie.load('token')
            }
        }).catch(error=>console.log(error));
        if (result.ok) {
            const data = await result.json();
            this.setState({ads: result});
        }
    }

    async sentData(e) {
        if (e.target.id !== 'id1')
            return
        let {status, statusText} = ['', ''];
        e.preventDefault();
        const response = await this.sentFetch(e);
        console.log(response.ok);
    }

    async getAds(){
        let result = await fetch(`https://livinir.herokuapp.com/getAds`).catch(error=>console.log(error));
        if (result && result.ok) {
            console.log(result)
            result = await result.json();
            this.setState({ads : result})
        }
        else
            console.log('error');
    }

    render() {
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