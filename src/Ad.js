import React, {Component} from 'react';
import './Ad.css';
class Ad extends Component{

    constructor(props){
        super(props);
        // this.state={
        //     owner: 'Login',
        //     city: 'Ekb',
        //     area: 'Botanika',
        //     lease_date:'02.10.2010',
        //     address: 'address',
        //     description: 'я люблю кошек у меня куча домашних питомцев есть крокодил черепаха волк и вообще, ' +
        //         'ывыыфвыоорлфроылфдвыдфоДВжлджв жцдлыаждыфдоф цыфлвдлыоаылдво фдыжвоуыфоавджоыфВдж ' +
        //         'вцфдж ьцуджф ьвфдвовуцдоа уцджоыф ьвцлдтвлдцфтвдлцту лтдуцд твуцфдэтв авдцфт а' +
        //         'цлфтуаэдфлатулатфыjfdhgjkhdjsf;kdhf;krehskfhalkjkjsd asghjbdrjekhtkerjklwjkljewrkakjrehrkejwr kshdj ' +
        //         'erkljfawkesj ;waelale;krjgjkslwaew leksad',
        //     email: 'email',
        //     name: 'name',
        //     open: false
        // }
        this.state={
            owner: this.props.ad.owner,
            city: this.props.ad.city,
            area: this.props.ad.area,
            lease_date: this.props.ad.lease_date,
            address: this.props.ad.address,
            description: this.props.ad.description,
            email: this.props.user.email,
            name: this.props.user.name,
            open: false
        }
        this.OpenAd = this.OpenAd.bind(this);
        this.CloseAd= this.CloseAd.bind(this);
    }
    OpenAd(_){
        this.setState({open: true});
    }

    CloseAd(_){
        this.setState({open: false});
    }

    render() {
        if (this.state.open === true)
            return (<div className="AdDetailed">
                    <h3> {this.state.owner} </h3>
                    {this.state.name}<br/>
                    {this.state.email}<br/>
                    {this.state.city} <br/>
                    {this.state.area}<br/>
                    {this.state.lease_date}<br/>
                    {this.state.address}<br/>
                    <br/>
                    <div className='Content'>{this.state.description}</div><br/>
                    <button className="CloseDetailed " onClick={this.CloseAd}>close detailed</button>
            </div>
            );
        return ( <div className="Ad">
            <h3> {this.state.owner} </h3>
            {this.state.city} <br/>
            {this.state.area}<br/>
            {this.state.lease_date}
            <button className="detailed" onClick={this.OpenAd}>more detailed</button>
        </div>
        );
    }
}
export default Ad;