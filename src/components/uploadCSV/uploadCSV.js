import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions.js'
import './uploadCSV.css'
import * as Papa from 'papaparse'

export class UploadCSV extends React.Component {

    constructor(props){
        super(props);
    }
    

    openFile(event) {
    Papa.parse(event.target.files[0], {
        header: true,
        complete: results => {
            console.log(results.data)
            const data = results.data
            this.props.dispatch(actions.storeData(data))
        }
    });
    }

    storeData(event){
        event.preventDefault()
        console.log(this.props.data)
        this.props.dispatch(actions.postData(this.props.data))
        .then(() => this.props.dispatch(actions.fetchProducts()));
    }

    render() {

        return (
            <div className="Home">
                <form onSubmit={event => this.storeData(event)}>
                Upload CSV:
                <input type="file" name="csv-file" onChange={event => this.openFile(event)}/>
                <input type="submit" value="Submit"/>
                </form>
            </div>
                    );
                  }
                }
                
const mapStateToProps = state => ({
                data: state.data
                    })
                    
export default connect(mapStateToProps)(UploadCSV);