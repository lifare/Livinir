import logotype from "./image/Home.png";
import {Link, Redirect} from "react-router-dom";
import React,{Component} from 'react';
import cookie from 'react-cookies';
import './Menu.css'

class Menu extends Component{
    constructor(props){
        super(props)
        this.deleteCookie = this.deleteCookie.bind(this);
        this.state = { userLog: cookie.load('userLog'), redirect: false}
    }


    deleteCookie(e){
        cookie.remove('userLog', { path: '/' });
        this.setState({userLog: cookie.load('userLog'), redirect:true});
    }
        render(){
            if (this.state.userLog){
                return(<div className='Menu'>
                    <img src={logotype} alt='logotype' height='90' width='100'/>
                    <ul className='nav'>
                        <li><Link to='/'>Home</Link></li>
                        <button className='Logout' onClick={this.deleteCookie}>Logout</button>
                        <li><Link to='/profile'>Profile</Link></li>
                        <li><Link to='/chat'>Chat</Link></li>
                    </ul>
                </div>)
            }
            if (this.state.redirect === true)
                return <Redirect to={'/'}/>
            return(<div className='Menu'>
            <img src={logotype} alt='logotype' height='90' width='100'/>
            <ul className='nav'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/signUp'>Sign up</Link></li>
                <li><Link to='/signIn'>Sign in</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/chat'>Chat</Link></li>
            </ul>
            </div>)
    }
}
export default Menu;
