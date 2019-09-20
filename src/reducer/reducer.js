import * as actions from '../actions/actions.js'

const initialState = {
    data: null,
    view: "",
    filteredData: null,
    searchTerm: null,
    externalCatalog: [],
    sharedCatalog: [],
    id: "",
    year1: "2018",
    month1: "01",
    year2: "2018",
    month2: "01",
    currentPage: 1,
    dataPerPage: 10
}

export const reducer = (state = initialState, action) => {

    if (action.type === actions.STORE_DATA) {
        return Object.assign({}, state, {
            data: action.data
        })
    }

    else if (action.type === actions.FETCH_PRODUCTS_SUCCESS) {
        return Object.assign({}, state, {
            data: action.products,
            view: "home",
            filteredData: null,
            searchTerm: null
        })
    }

    else if (action.type === actions.FILTER_PRODUCTS) {
        return Object.assign({}, state, {
            searchTerm: action.value
        })
    }

   else  if (action.type === actions.SAVE_FILTERED_DATA) {
        return Object.assign({}, state, {
            filteredData: action.filteredData,
            currentPage: 1
        })
    }

    else if (action.type === actions.CHANGE_VIEW) {
        return Object.assign({}, state, {
            view: action.view
        })
    }

    else if (action.type === actions.SAVE_TO_CATALOG1) {
        return Object.assign({}, state, {
            externalCatalog: [...state.externalCatalog, state.data[action.id]]
        })
    }

    else if (action.type === actions.SAVE_TO_CATALOG2) {
        return Object.assign({}, state, {
            externalCatalog: [...state.externalCatalog, state.filteredData[action.id]]
        })
    }

    else if (action.type === actions.POST_CATALOG_SUCCESS) {
        return Object.assign({}, state, {
            id: action.catalog._id
        })
    }

    else if (action.type === actions.FETCH_CATALOG_REQUEST) {
        return Object.assign({}, state, {
            view: "sharedCatalog"
        })
    }

    else if (action.type === actions.FETCH_CATALOG_SUCCESS) {
        return Object.assign({}, state, {
            view: "sharedCatalog",
            sharedCatalog: action.catalog
        })
    }

    else if (action.type === actions.CLEAR_FILTER) {
        return Object.assign({}, state, {
            filteredData: null
        })
    }

    else if (action.type === actions.REMOVE_CATALOG) {
        return Object.assign({}, state, {
            externalCatalog: action.newCatalog
        })
    }

    else if (action.type === actions.SAVE_MONTH1) {
        return Object.assign({}, state, {
            month1: action.month1
        })
    }

    else if (action.type === actions.SAVE_YEAR1) {
        return Object.assign({}, state, {
            year1: action.year1
        })
    }

    else if (action.type === actions.SAVE_MONTH2) {
        return Object.assign({}, state, {
            month2: action.month2
        })
    }

    else if (action.type === actions.SAVE_YEAR2) {
        return Object.assign({}, state, {
            year2: action.year2
        })
    }

    else if (action.type === actions.SET_PAGE_NUMBER) {
        return Object.assign({}, state, {
            currentPage: action.pageNumber
        })
    }
    return state
}