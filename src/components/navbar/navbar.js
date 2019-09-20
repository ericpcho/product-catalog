import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions.js'
import './navbar.css'
import logo from './InsightEditions.png'

export class NavBar extends React.Component {

    constructor(props) {
        super(props);
    }

uploadCSV(){
    this.props.dispatch(actions.changeView("uploadCSV"))
}

viewCatalog(){
    this.props.dispatch(actions.changeView("externalCatalog"))
}

goHome(){
    this.props.dispatch(actions.changeView("home"))
}

    render() {
        
        let navbar;
        let count;

        if (this.props.view === "home"){
            count = `(${this.props.externalCatalog.length})`
            navbar = <nav>
            <img className="logo-image" src={logo}/>
            <ul className="nav-buttons">
            <a className="invisible-item">Invisible Item</a>
            <a className="home-focused" onClick={event => this.goHome(event)} >Home</a>
            <a className="view-catalog" onClick={event => this.viewCatalog(event)} >View Catalog{count}</a>
            <a className="import" onClick={event => this.uploadCSV(event)} >Import CSV</a>
            </ul>
        </nav>
        }

        if (this.props.view !== 'sharedCatalog') {
          count = `(${this.props.externalCatalog.length})`
        }
        else {
          count = ''
        }

        if (this.props.view === "sharedCatalog"){
            navbar = <nav>
                <img className="logo-image" src={logo}/>
            </nav>

        }

        else if (this.props.view === "externalCatalog") {
            navbar = <nav>
                <img className="logo-image" src={logo}/>
                <ul className="nav-buttons">
                <a className="invisible-item">Invisible Item</a>
                <a className="home" onClick={event => this.goHome(event)} >Home</a>
                <a className="catalog-focused" onClick={event => this.viewCatalog(event)} >View Catalog{count}</a>
                <a className="import" onClick={event => this.uploadCSV(event)} >Import CSV</a>
                </ul>
            </nav>
        }

        return (
            <header className="header">
            {navbar}
            </header>
        );
    }
}

const mapStateToProps = state => ({
    view: state.view,
    data: state.data,
    externalCatalog: state.externalCatalog
})

export default connect(mapStateToProps)(NavBar);