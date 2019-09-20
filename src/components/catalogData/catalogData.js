import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions.js'
import './catalogData.css'
import noPhoto from './no_photo_available.jpg';

export class CatalogData extends React.Component {

    constructor(props) {
        super(props);
    }

    addFromData(id) {
        this.props.dispatch(actions.saveToCatalog1(id))
    }

    addFromFiltered(id) {
        this.props.dispatch(actions.saveToCatalog2(id))
    }

    render() {
        let newDescription;
        let newTitle;
        let buttonClick;
        let newImage;
        let removeButton;
        let object = [];
        let newPubDate;
        let image1;
        let image2;
        let image3;
        let image4;
        let thumbnail1;
        let thumbnail2;
        let thumbnail3;
        let thumbnail4;

        if (this.props.filteredData === undefined) {
            buttonClick = ""
        }
        else if (this.props.filteredData != null) {
            buttonClick = <button className="catalogButton" onClick={() => this.addFromFiltered(this.props.id)}>Add to Catalog</button>
        }
        else if (this.props.filteredData == null) {
            buttonClick = <button className="catalogButton" onClick={() => this.addFromData(this.props.id)}>Add to Catalog</button>
        }

        if (this.props.externalCatalog[0]) {
            this.props.externalCatalog.forEach((product) => {
                object.push(product.title)
            })
        }

        if (this.props.externalCatalog[0] && this.props.view != "externalCatalog") {
            if (object.includes(this.props.title)) {
                buttonClick = <button className="catalogButtonClicked" type="button" disabled>Added</button>
            }
        }

        if (this.props.view == "externalCatalog") {
            removeButton = <button className="remove" onClick={() => this.props.onClick(this.props.upc)} >Remove</button>
        }

        if (this.props.description != null) {
            const oldDescription = this.props.description
            newDescription = oldDescription.replace(/<br\/>/g, " ").replace(/<\/i>/g, " ").replace(/<i>/g, " ").replace(/TM/g, "™")
                .replace(/&rsquo;/g, "'").replace(/&mdash;/g, "-").replace(/&trade;/g, "™").replace(/Skill Level.*$/g, "").replace(/<\/strong>/g, " ")
                .replace(/<strong>/g, "").replace(/&reg;/g, "®").replace(/&#8209;/g, "-").replace(/&#91;/g,"[").replace(/&#93;/g,"]").replace(/&#8217;/g, "'")
        }

        if (this.props.image_url != null) {
            const oldImage = this.props.image_url
            newImage = oldImage.split("|")
            image1 = newImage[0]
            image2 = newImage[1]
            image3 = newImage[2]
            image4 = newImage[3]
            if (newImage[0]) {
                thumbnail1 = <img className="thumbnail1" src={image1}/>
            }
            else {
                thumbnail1 = <img className="thumbnail1" src={noPhoto}/>
            }
            if (newImage[1]) {
                thumbnail2 = <img className="thumbnail2" src={image2}/>
            }
            else {
                thumbnail2 = <img className="thumbnail2"/>
            }
            if (newImage[2]) {
                thumbnail3 = <img className="thumbnail2" src={image3}/>
            }
            else {
                thumbnail3 = ""
            }
            if (newImage[3]) {
                thumbnail4 = <img className="thumbnail2" src={image4}/>
            }
            else {
                thumbnail4 = ""
            }

            // newImage = oldImage.replace(/\|.*$/, "")
        }

        if (this.props.title != null) {
            const oldTitle = this.props.title
            newTitle = oldTitle.replace(/<br\/>/g, " ").replace(/<\/i>/g, " ").replace(/<i>/g, " ")
            .replace(/&rsquo;/g, "'").replace(/&mdash;/g, "-").replace(/&trade;/g, "™").replace(/Skill Level.*$/g, "").replace(/<\/strong>/g, " ")
            .replace(/<strong>/g, "").replace(/&reg;/g, "®").replace(/&#8209;/g, "-").replace(/&#91;/g,"[").replace(/&#93;/g,"]").replace(/&#8217;/g, "'")
        }

        if (this.props.pub_date != null) {
            const oldPubDate = this.props.pub_date
            newPubDate = oldPubDate.replace(/T.*/, "").replace(/(\d{4})\-(\d{2})\-(\d{2})/, '$2/$3/$1')
        }

        if (!(this.props.title) && !(this.props.description) &&!(this.props.image_url)) {
            return ("")
        }

        else
        return (<section>
            <div className="data">
                <h1 className="titleHeader">
                    <p className="title">{newTitle}</p>
                    {buttonClick}
                    {removeButton}
                </h1>
                    <div className="mainImageContainer">{thumbnail1}</div>
                    <div className="imageContainer">{thumbnail2}</div>
                    <div className="imageContainer">{thumbnail3}</div>
                    <div className="imageContainer">{thumbnail4}</div>
                <table className="infoTable">
                <tbody className="infoTableBody">
                    <tr>
                        <td className="rowItem"> <h4>Price:</h4> ${this.props.price} </td>
                        <td className="rowItem"> <h4>Upc:</h4> {this.props.upc} </td>
                        <td className="rowItem"> <h4>ISBN:</h4> {this.props.isbn} </td>
                    </tr>
                    <tr>
                        <td className="rowItem"> <h4>On-sale Date:</h4> {newPubDate} </td>
                        <td className="rowItem"> <h4>Skill Level:</h4> {this.props.skill_level} </td>
                        <td className="rowItem"> <h4>Format:</h4> {this.props.format} </td>
                    </tr>
                    </tbody>
                </table>
                <p className="description"> <span className="description-title">Description:</span> {newDescription} </p>
            </div>
        </section>
        );
    }
}

const mapStateToProps = state => ({
    view: state.view,
    filteredData: state.filteredData,
    searchTerm: state.searchTerm,
    data: state.data,
    externalCatalog: state.externalCatalog
})

export default connect(mapStateToProps)(CatalogData);