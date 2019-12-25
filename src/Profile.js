import Menu from "./Menu";
import React, {Component} from "react";
import './Profile.css'
import cookie from "react-cookies";
import {Redirect} from "react-router";
import './Sign.css'

const namesForm = ['owner', 'city', 'area', 'address', 'lease_date', 'description'];

class Profile extends Component{
    constructor(props){
        super(props)
        const cur_cook = cookie.load('userLog');
        this.getUserData = this.getUserData.bind(this);
        this.returnMain = this.returnMain.bind(this);
        this.sentFetch = this.sentFetch.bind(this);
        this.sentData = this.sentData.bind(this);
        if (cur_cook) {
            const data = this.getUserData(cookie);
            this.state = {
                userLog: cur_cook, redirect: false, email: data.email, login: data.login,
                firstName: data.firstName, lastName: data.lastName, birthday: data.birthday, gender: data.gender
            }
        } else
            this.state = { userLog: cur_cook, redirect: false};
    }

    returnMain(e){
        this.setState({redirect: true});
    }
    getDataForm(e){
        const form = document.querySelector('.Sign');
        const cur_data = {};
        for (const name of namesForm)
            cur_data[name] = e.target[name].value
        return cur_data
    }

    async sentData(e) {
        let {status, statusText} = ['', ''];
        e.preventDefault();
        const response = await this.sentFetch(e);
        console.log(response.ok);
    }

    sentFetch(e){
        return fetch("http://livinir.herokuapp.com/add-announcement", {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(this.getDataForm(e))
        }).catch(reason => console.log('Server not available. Please try sing up later.'))
    }

    async getUserData(login){
        let result = await fetch(`http://livinir.herokuapp.com/profile?login=${login}`).catch(error=>console.log(error));
        if (result.ok)
            return await result.json();
        console.log('error');
    }

    render() {
        if (this.state.redirect === true)
            return <Redirect to={'/'}/>;
        if(!this.state.userLog)
            return (<div className='ParentSign'><div className='Sign'><p className='Fail'>Please, login!</p><button className='Fail' onClick={this.returnMain}>Ok</button></div></div>);
        return(<div>
                <Menu></Menu>
                <div className='Profile'>
                    <div className='DataProfile'>
                        <h3>Data_user</h3>
                        <p>Email: {this.state.email}</p>
                        <p>Login: {this.state.login}</p>
                        <p>FirstName: {this.state.firstName}</p>
                        <p>LastName: {this.state.lastName}</p>
                        <p>Date of birthday: {this.state.birthday}</p>
                        <p>Gender: {this.state.gender}</p>
                    </div>
                    <form onSubmit={this.sentData} className='DataAd'>
                        <h3>Create_Ad</h3>
                        <input type='text' name='owner' placeholder='Enter your login' defaultValue={this.state.login}/>
                        <input type='text' name='city' placeholder='Enter your city' defaultValue='Екатеринбург'/>
                        <input type='text' name='area' placeholder='Enter your area' defaultValue='Ботаника'/>
                        <input type='text' name='address' placeholder='Enter your address' defaultValue='Крестинского 40'/>
                        <input type='date' name='lease_date' placeholder='Enter your lease_date' defaultValue='2020-01-19'/>
                        <br/>
                        <textarea name="description" placeholder='Enter description'></textarea>
                        <br/>
                        <button>Create</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Profile;