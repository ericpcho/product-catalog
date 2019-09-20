import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions.js'
import './search.css'

export class Search extends React.Component {

    constructor(props) {
        super(props);
    }

    onSubmit(event) {
        event.preventDefault();
        const value = this.searched.value.toLowerCase();
        console.log(value);
        const filteredData = this.props.data.filter((product) => {
            if (product.upc == value) {
                return product.upc == value
            }
            else if (product.isbn == value) {
                return product.isbn == value
            }
            else if (product.title) {
                return product.title.toLowerCase().includes(value)
            }
        })
        this.props.dispatch(actions.saveFilteredData(filteredData))
    }

    clearSearch(event) {
        event.preventDefault();
        this.props.dispatch(actions.clearFilter())
    }

    saveMonth1(event) {
        event.preventDefault()
        const value = event.currentTarget.value
        this.props.dispatch(actions.saveMonth1(value))
    }

    saveYear1(event) {
        event.preventDefault()
        const value = event.currentTarget.value
        this.props.dispatch(actions.saveYear1(value))
    }

    saveMonth2(event) {
        event.preventDefault()
        const value = event.currentTarget.value
        this.props.dispatch(actions.saveMonth2(value))
    }

    saveYear2(event) {
        event.preventDefault()
        const value = event.currentTarget.value
        this.props.dispatch(actions.saveYear2(value))
    }


    onDateSubmit(event, month1, year1, month2, year2) {
        event.preventDefault();
        const date1 = year1 + month1
        const date2 = year2 + month2
        const filteredData = this.props.data.filter((product) => {
            if ((product.pub_date)) {
                const oldPubDate = product.pub_date
                const newPubDate = oldPubDate.replace(/T.*/, "").replace(/(\d{4})\-(\d{2})\-(\d{2})/, '$1$2')
                console.log(date1, date2, newPubDate)
                if ((date1 <= newPubDate) && (newPubDate <= date2)) {
                    return newPubDate
                }
            }
        })
        this.props.dispatch(actions.saveFilteredData(filteredData))
    }

    render() {

        let button;

        if (this.props.filteredData != null){
        button = <button className="clear-search" type="submit" onClick={(e) => this.clearSearch(e)}>Clear Search X</button>
        }

        return (
            <section>
            <div className="search-container">
                <form className="search-form">
                    <span> Search By UPC, ISBN, Or Keyword:</span>
                    <input className="search-field" ref={searchTerm => this.searched = searchTerm} type="text" placeholder="Search by..." name="search" />
                    <button type="submit" onClick={(e) => this.onSubmit(e)}>Search</button>
                </form>
                </div>
                <div className="date-container">
                <span> Search By Date Range:</span>
            <form>
                    <select className="month1" id="month" onChange={(event) => this.saveMonth1(event)}>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                    <select className="year1" id="year" onChange={(event) => this.saveYear1(event)}>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                    </select>
                </form>
                to
                <form>
                    <select className="month2" id="month" onChange={(event) => this.saveMonth2(event)}>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                    <select className="year2" id="year" onChange={(event) => this.saveYear2(event)}>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                    </select>
                    <button type="submit" onClick={(e) => this.onDateSubmit(e, this.props.month1, this.props.year1, this.props.month2, this.props.year2)}>Search</button>
                </form>
            </div>
            <div className="clear-div">
            {button}
            </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data,
    month1: state.month1,
    year1: state.year1,
    month2: state.month2,
    year2: state.year2,
    filteredData: state.filteredData
})

export default connect(mapStateToProps)(Search);