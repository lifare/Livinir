import React,{Component} from 'react';
import {Redirect, Route} from 'react-router';
import './Sign.css';

const namesForm = ['email', 'login', 'firstName', 'lastName', 'password', 'dateOfBirth', 'Sex'];

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
        this.sentData = this.sentData.bind(this);
        this.returnMain = this.returnMain.bind(this);
    }

    returnMain(_){
        this.setState({ redirect: true });
    }
    getDataForm(e){
        const form = document.querySelector('.Sign');
        const cur_data = {};
        for (const name of namesForm)
            cur_data[name] = e.target[name].value
        return cur_data
    }

    sentFetch(e){
        return fetch("http://livinir.herokuapp.com/api/auth/signup", {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(this.getDataForm(e))
        }).catch(reason => console.log('Server not available. Please try sing up later.'))
    }

    async sentData(e) {
        let {status, statusText} = ['', ''];
        e.preventDefault();
        const response = await this.sentFetch(e);
        if (response && response.ok)
            this.setState({ redirect: true });
        else {
            if (response)
                [status, statusText] = [response.status, response.statusText] ;
            else
                [status, statusText] = ['not connection', ' '];
        }
        this.setState({ redirect: `Response failed: ${status} ${statusText}`});
    }

    render() {
        if (this.state.redirect === true)
            return <Redirect to={'/'}/>;
        if (this.state.redirect) {
            return (<div className='ParentSign'><div className='Sign'><p className='Fail'>{this.state.redirect}<br/>
            <br/>Sorry, please try later.</p><button className='Fail' onClick={this.returnMain}>Ok</button></div></div>);
        }
        return (<div className='ParentSign'>
            <form onSubmit={this.sentData} className='Sign'>
                <input type='email' name='email' placeholder='Enter your email' defaultValue='test@gmail.com'/>
                <input type='text' name='login' placeholder='Enter your login' defaultValue='user'/>
                <input type='text' name='firstName' placeholder='Enter your First Name' defaultValue='user'/>
                <input type='text' name='lastName' placeholder='Enter your Last Name' defaultValue='user'/>
                <input type='password' name='password' placeholder='Enter password' defaultValue='123456'/>
                <input type='date' name='dateOfBirth' placeholder='Enter your birthday' defaultValue='2019-01-19'/>
                <p> Your gender:
                    <input type="radio" name="Sex" value='male' defaultChecked={true}/> Male
                    <input type="radio" name="Sex" value='female'/> Female
                </p>
                <button>Sign Up</button>
            </form>
        </div>);
    }
}
export default SignUp