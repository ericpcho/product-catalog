import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions.js'
import './sharedCatalog.css'
import { CatalogData } from '../catalogData/catalogData.js';
import NavBar from '../../components/navbar/navbar.js';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from 'html2canvas'
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class SharedCatalog extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("I am Running", this.props.view)
        this.props.dispatch(actions.fetchCatalog(this.props.id))
      }

      publishPdf(){
        html2canvas(document.getElementById('exportthis'), {allowTaint : true}).then(canvas => {
            document.body.appendChild(canvas);
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500,
                }]
            };
            pdfMake.createPdf(docDefinition).download("Product_Catalog.pdf");
    });
}
    
    render() {

        let externalCatalog = this.props.sharedCatalog.map((product, key) => (
            <CatalogData externalCatalog={[]} key={key} id={key} title={product.title} price={product.price} description={product.description} image_url={product.image_url} pub_date={product.pub_date} isbn={product.isbn} upc={product.upc} format={product.format} skill_level={product.skill}/>
        ))

        return (
            <section>
                <NavBar/>
              <div className="publishPdf"> 
            <button className="pdf-button" onClick={(event => this.publishPdf(event))}>Open PDF</button> </div>

            <div className="sharedCatalog" id="exportthis">
                {externalCatalog}
            </div>
            </section>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    id: ownProps.match.params.id,
    view: state.view,
    sharedCatalog: state.sharedCatalog
})

export default connect(mapStateToProps)(SharedCatalog);