import { API_BASE_URL } from '../config'

export const STORE_DATA = 'STORE_DATA'
export const storeData = (data) => ({
    type: STORE_DATA,
    data
})


export const postData = (data) => dispatch => {
    console.log(data)
    return fetch(`${API_BASE_URL}/api/home`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => console.log(err))
};

export const fetchProducts = () => dispatch => {
    return fetch(`${API_BASE_URL}/api/home`, {
        method: 'GET'
    })
        .then(res => {
            return res.json()
        })
        .then((products) => dispatch(fetchProductsSuccess(products.sort(function (b, a) {
            return ('' + a.description).localeCompare(b.description);
        }))))
        .catch(err => console.log(err));
};

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const fetchProductsSuccess = (products) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    products
})

export const POST_PRODUCTS_SUCCESS = 'POST_PRODUCTS_SUCCESS'
export const postProductsSuccess = () => ({
    type: POST_PRODUCTS_SUCCESS,
})

export const FILTER_PRODUCTS = 'FILTER_PRODUCTS'
export const filterProducts = (value) => ({
    type: FILTER_PRODUCTS,
    value
})

export const SAVE_FILTERED_DATA = 'SAVE_FILTERED_DATA'
export const saveFilteredData = (filteredData) => ({
    type: SAVE_FILTERED_DATA,
    filteredData
})

export const CHANGE_VIEW = 'CHANGE_VIEW'
export const changeView = (view) => ({
    type: CHANGE_VIEW,
    view
})

export const SAVE_TO_CATALOG1 = 'SAVE_TO_CATALOG1'
export const saveToCatalog1 = (id) => ({
    type: SAVE_TO_CATALOG1,
    id
})

export const SAVE_TO_CATALOG2 = 'SAVE_TO_CATALOG2'
export const saveToCatalog2 = (id) => ({
    type: SAVE_TO_CATALOG2,
    id
})

export const postCatalog = (catalog) => dispatch => {
    dispatch(postCatalogRequest);
    return fetch(`${API_BASE_URL}/api/catalogs`, {
        method: 'post',
        body: JSON.stringify({ externalCatalogs: catalog }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText)
            }
            return res.json()
        })
        .then((catalog) => {
            return dispatch(postCatalogSuccess(catalog));
        })
        .catch(error => dispatch(postCatalogError(error)))
}

export const POST_CATALOG_REQUEST = 'POST_CATALOG_REQUEST';
export const postCatalogRequest = () => ({
    type: POST_CATALOG_REQUEST
})

export const POST_CATALOG_SUCCESS = 'POST_CATALOG_SUCCESS';
export const postCatalogSuccess = (catalog) => ({
    type: POST_CATALOG_SUCCESS,
    catalog
})

export const POST_CATALOG_ERROR = 'POST_CATALOG_ERROR';
export const postCatalogError = (error) => ({
    type: POST_CATALOG_ERROR,
    error
})

export const fetchCatalogId = (id) => dispatch => {
    dispatch(fetchCatalogIdRequest);
    fetch(`${API_BASE_URL}/api/catalogs/${id}`)
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText)
            }
            window.open(`https://ieproductcatalog.netlify.com/${id}`)
        })
        .then((catalog) => {
            return dispatch(fetchCatalogIdSuccess(catalog))
        })
        .catch(error => dispatch(fetchCatalogIdError(error)))
}

export const FETCH_CATALOG_ID_REQUEST = 'FETCH_CATALOG_ID_REQUEST';
export const fetchCatalogIdRequest = () => ({
    type: FETCH_CATALOG_ID_REQUEST
})

export const FETCH_CATALOG_ID_SUCCESS = 'FETCH_CATALOG_ID_SUCCESS';
export const fetchCatalogIdSuccess = (catalog) => ({
    type: FETCH_CATALOG_ID_SUCCESS,
    catalog
})

export const FETCH_CATALOG_ID_ERROR = 'FETCH_CATALOG_ID_ERROR';
export const fetchCatalogIdError = (error) => ({
    type: FETCH_CATALOG_ID_ERROR,
    error
})

export const fetchCatalog = (id) => dispatch => {
    dispatch(fetchCatalogRequest);
    fetch(`${API_BASE_URL}/api/catalogs/${id}`)
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText)
            }
            return res.json()
        })
        .then((res) => {
            return dispatch(fetchCatalogSuccess(res.externalCatalogs))
        })
        .catch(error => dispatch(fetchCatalogError(error)))
}

export const FETCH_CATALOG_REQUEST = 'FETCH_CATALOG_REQUEST';
export const fetchCatalogRequest = () => ({
    type: FETCH_CATALOG_REQUEST
})

export const FETCH_CATALOG_SUCCESS = 'FETCH_CATALOG_SUCCESS';
export const fetchCatalogSuccess = (catalog) => ({
    type: FETCH_CATALOG_SUCCESS,
    catalog
})

export const FETCH_CATALOG_ERROR = 'FETCH_CATALOG_ERROR';
export const fetchCatalogError = (error) => ({
    type: FETCH_CATALOG_ERROR,
    error
})

export const CLEAR_FILTER = 'CLEAR_FILTER';
export const clearFilter = () => ({
    type: CLEAR_FILTER
})

export const REMOVE_CATALOG = 'REMOVE_CATALOG';
export const removeCatalog = (newCatalog) => ({
    type: REMOVE_CATALOG,
    newCatalog
})

export const SAVE_MONTH1 = 'SAVE_MONTH1';
export const saveMonth1 = (month1) => ({
    type: SAVE_MONTH1,
    month1
})

export const SAVE_YEAR1 = 'SAVE_YEAR1';
export const saveYear1 = (year1) => ({
    type: SAVE_YEAR1,
    year1
})

export const SAVE_MONTH2 = 'SAVE_MONTH2';
export const saveMonth2 = (month2) => ({
    type: SAVE_MONTH2,
    month2
})

export const SAVE_YEAR2 = 'SAVE_YEAR2';
export const saveYear2 = (year2) => ({
    type: SAVE_YEAR2,
    year2
})

export const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';
export const setPageNumber = (pageNumber) => ({
    type: SET_PAGE_NUMBER,
    pageNumber
})