import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions.js'
import './home.css'
import UploadCSV from '../../components/uploadCSV/uploadCSV.js';
import CatalogData from '../../components/catalogData/catalogData.js';
import NavBar from '../../components/navbar/navbar.js';
import Search from '../../components/search/search.js';
import ExternalCatalog from '../../components/externalCatalog/externalCatalog.js';
import SharedCatalog from '../../components/sharedCatalog/sharedCatalog.js';

export class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick(event) {
            this.props.dispatch(actions.setPageNumber(Number(event.target.id)))
    }

    handleNext() {
         this.props.dispatch(actions.setPageNumber(this.props.currentPage + 1))
    }

    handlePrevious() {
            this.props.dispatch(actions.setPageNumber(this.props.currentPage - 1))
    }

    componentWillMount() {
        this.props.dispatch(actions.fetchProducts())
        
    }


    render() {

        let catalogData = "";
        let uploadCSV;
        let search;
        let paginated;
        let renderPageNumbers; 
        let next;
        let previous;

        const indexOfLastData = this.props.currentPage * this.props.dataPerPage;
        const indexOfFirstData = indexOfLastData - this.props.dataPerPage;

        if ((this.props.filteredData === null) && (this.props.data != null) && (this.props.view === "home")) {
            catalogData = this.props.data.map((product, key) => (
                <CatalogData key={key} id={key} title={product.title} price={product.price} upc={product.upc} description={product.description} image_url={product.image_url} pub_date={product.pub_date} isbn={product.isbn} format={product.format} skill_level={product.skill} />
            ))
            if (catalogData.length === 0) {
                paginated = ""
            }
            else {
                paginated = catalogData.slice(indexOfFirstData, indexOfLastData);
            }
            search = <Search />
        }

        // if (this.props.searchTerm != null) {
        //     const filteredData = this.props.data.filter((product) => {
        //         return product.upc == this.props.searchTerm;
        //     })
        //     this.props.dispatch(actions.saveFilteredData(filteredData))
        // }

        if (this.props.filteredData != null) {
            console.log(this.props.filteredData)
            catalogData = this.props.filteredData.map((product, key) => (
                <CatalogData key={key} id={key} title={product.title} price={product.price} upc={product.upc} description={product.description} image_url={product.image_url} pub_date={product.pub_date} isbn={product.isbn} format={product.format} skill_level={product.skill} />
            ))
            if (catalogData.length === 0) {
                paginated = ""
            }
            else {
                paginated = catalogData.slice(indexOfFirstData, indexOfLastData);
            }
            search = <Search />
        }

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(catalogData.length / this.props.dataPerPage); i++) {
            pageNumbers.push(i);
        }

        if (this.props.view === "home"){
        next = (pageNumbers.length > this.props.currentPage) ? <i className="fa fa-arrow-circle-right pagination-navigation" onClick= {() => this.handleNext()} aria-hidden="true"></i> : null;
        previous = (this.props.currentPage > 1) ? <i className="fa fa-arrow-circle-left pagination-navigation" onClick= {() => this.handlePrevious()} aria-hidden="true"></i>: null;
                  
        if (pageNumbers.length > 1) {

        renderPageNumbers = pageNumbers.map(number => {
            let numberStyling;
            let myid;
            if(this.props.currentPage == number){
                numberStyling = number;
                myid = "myid"
            }
                return (
                    <li className={`pagination-number ${myid}${numberStyling}`} key={number} id={number} onClick={(event) => this.handleClick(event)}>
                        {number}
                    </li>
                );
            });
        }
    }

        if (this.props.view === "uploadCSV") {
            uploadCSV = <UploadCSV />
            catalogData = ""
            search = ""
        }

        if (this.props.view === "externalCatalog") {
            paginated = <ExternalCatalog />
            search = ""
        }

        if (this.props.view === "sharedCatalog") {
            return (
                <SharedCatalog />
            );
        }

        else {
            return (
                <section className="Home">
                    <NavBar />
                    {search}
                    <div>
                        {uploadCSV}
                        {paginated}
                        <ul id='page-numbers'>
                        {previous}
                        {renderPageNumbers}
                        {next}
                    </ul>
                    </div>
                </section>
            )
        }
    }
}

const mapStateToProps = state => ({
    view: state.view,
    filteredData: state.filteredData,
    searchTerm: state.searchTerm,
    data: state.data,
    externalCatalog: state.externalCatalog,
    currentPage: state.currentPage,
    dataPerPage: state.dataPerPage

})

export default connect(mapStateToProps)(Home);