import React from 'react';
import Home from './Home'
import {Router, Route, Link} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import './App.css'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Profile from "./Profile";

const history = createBrowserHistory();
const Chat = ()=>(
    <h2>Chat</h2>
)
class App extends React.Component {
  render() {
    return (
        <Router history={history}>
            <div className='App'>
                <Route exact path='/' component={Home}/>
                <Route exact path='/signUp' component={SignUp}/>
                <Route path='/signIn' component={SignIn}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/chat' component={Chat}/>
            </div>
        </Router>
    );
  }
}

export default App;