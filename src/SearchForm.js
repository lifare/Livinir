import React, {Component} from 'react';
import './SearchForm.css'
class SearchForm extends Component{
    sentData(){
        return;
    }
    ///getAdsParams
    render() {
        return (<form onSubmit={this.sentData} className='SearchForm'>
            <div className='SearchData'>
                <input type='text' name='area' placeholder='Enter area' defaultValue='Ботаника'/>
                <input type='text' name='city' placeholder='Enter city' defaultValue='Екатеринбург'/>
                <input type='date' name='lease_date' placeholder='Enter lease date' defaultValue='2020-01-19'/>
                <p> neighbor's gender:
                    <input type="radio" name="Sex" value='male'/> Male
                    <input type="radio" name="Sex" value='female'/> Female
                    <input type="radio" name="Sex" value='all'/> All
                </p>
            </div>
            <button>Search</button>
        </form>);
    }
}
export default SearchForm;