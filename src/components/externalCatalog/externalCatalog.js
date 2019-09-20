import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions.js'
import './externalCatalog.css'
import { CatalogData } from '../catalogData/catalogData.js';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from 'html2canvas'
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class ExternalCatalog extends React.Component {

    constructor(props) {
        super(props);
    }

    publishCatalog(){
        this.props.dispatch(actions.postCatalog(this.props.externalCatalog)).then(() => {
            this.props.dispatch(actions.fetchCatalogId(this.props.id));
          }
        );
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

        removeCatalog(upc){
        const selection = upc
        const filter = this.props.externalCatalog.filter(function (catalog) {
            return catalog.upc !== selection
        })
        console.log(filter)
        this.props.dispatch(actions.removeCatalog(filter))
}

    render() {

        let publishCatalog;
        let publishPdf;

        if (this.props.externalCatalog[0]){
            publishCatalog = <div className="publish">
            <button className="publish-button" onClick={event => this.publishCatalog(event)}>Publish Catalog</button>
            </div>
            // publishPdf = <div className="publishPdf"> 
            // <button className="pdf-button" onClick={(event => this.publishPdf(event))}>Open PDF</button> </div>

        }
        
        else {
            publishCatalog = <div className="publish2" ><span className="catalog-error">You have not added any custom catalogs.</span></div>
        }

        const externalCatalog = this.props.externalCatalog.map((product, key) => (
            <CatalogData onClick={(event) => this.removeCatalog(event)} externalCatalog={this.props.externalCatalog} view={this.props.view} key={key} id={key} title={product.title} price={product.price} upc={product.upc} description={product.description} image_url={product.image_url} pub_date={product.pub_date} isbn={product.isbn} format={product.format} skill_level={product.skill}/>
        ))

        return (
            <section className="view-catalog">
                {publishCatalog}
                {/* {publishPdf} */}
            <div className="view-data" id="exportthis">
                {externalCatalog}
            </div>
            </section>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({ 
    id: state.id,
    view: state.view,
    externalCatalog: state.externalCatalog
})

export default connect(mapStateToProps)(ExternalCatalog);