import React,{Component} from 'react';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import './Sign.css'

const namesForm = ['email','password'];

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        };
        this.sentData = this.sentData.bind(this);
        this.returnMain = this.returnMain.bind(this);
    }

    getDataForm(e){
        const form = document.querySelector('.Sign');
        const cur_data = {};
        for (const name of namesForm)
            cur_data[name] = e.target[name].value
        return cur_data
    }

    sentFetch(e){
        console.log(this.getDataForm(e));
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
        // cookie.save('userLog','sad', { path: '/'});
        if (response && response.ok) {
            const payload = await response.json();//жду jwt token и login пользователя
            cookie.save('userLog', payload.login, { path: '/'});
            this.setState({redirect: true});
        }else {
            if (response)
                [status, statusText] = [response.status, response.statusText] ;
            else
                [status, statusText] = ['not connection', ' '];
        }
        this.setState({ redirect: `Response failed: ${status} ${statusText}`});
    }

    returnMain(_){
        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect === true)
            return <Redirect to='/'/>;
        if (this.state.redirect) {
            return (<div className='ParentSign'><div className='Sign'><p className='Fail'>{this.state.redirect}<br/>
                <br/>Sorry, please try later.</p><button className='Fail' onClick={this.returnMain}>Ok</button></div></div>);
        };
        return(<div className='ParentSign'>
            <form onSubmit={this.sentData} className='Sign SignIn'>
                <input type='email' name='email' placeholder='Enter your email' defaultValue='test@gmail.com'/>
                <input type='password' name='password' placeholder='Enter your password' defaultValue='123456'/>
                <button >Sign In</button>
            </form>
        </div>)
    }
}
export default SignIn