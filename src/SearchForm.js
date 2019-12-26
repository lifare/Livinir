import React, {Component} from 'react';
import './SearchForm.css'

class SearchForm extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (<form className='SearchForm' id = 'id1'>
            <div className='SearchData'>
                <input type='text' name='area' placeholder='Enter area' defaultValue='Ботаника'/>
                <input type='text' name='city' placeholder='Enter city' defaultValue='Екатеринбург'/>
                <input type='date' name='lease_date' placeholder='Enter lease date' defaultValue='2020-01-19'/>
                <p> neighbor's gender:
                    <input type="radio" name="sex" value='MALE'/> Male
                    <input type="radio" name="sex" value='FEMALE'/> Female
                    <input type="radio" name="Sex" value='all'/> All
                </p>
            </div>
            <button>Search</button>
        </form>);
    }
}
export default SearchForm;