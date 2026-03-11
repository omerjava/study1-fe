import { createReducer, on } from "@ngrx/store";
import { Product } from "../../models/product.model";
import * as ProductActions from './products.actions';


export interface State {
    products: Product[],
    loading: boolean,
    error: any
}

export const initialState: State = {
    products: [],
    loading: false,
    error: null
}

export const productReducer = createReducer(
    initialState,

    on(ProductActions.loadProducts, (state) => ({ ...state, loading: true })),
    on(ProductActions.loadProductsSuccess, (state, { products }) => ({ ...state, loading: false, products: products })),
    on(ProductActions.loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(ProductActions.createProduct, (state) => ({ ...state, loading: true })),
    on(ProductActions.createProductSuccess, (state, { product }) => ({ ...state, loading: false, products: [...state.products, product] })),
    on(ProductActions.createProductFailure, (state, { error }) => ({ ...state, error: error, loading: false })),

    on(ProductActions.updateProduct, (state) => ({ ...state, loading: true })),
    on(ProductActions.updateProductSuccess, (state, { product }) => ({
        ...state, loading: false, products: state.products.map(v => v.id === product.id ? product : v)
    })),
    on(ProductActions.updateProductFailure, (state, { error }) => ({ ...state, error: error, loading: false })),

    on(ProductActions.deleteProduct, (state) => ({ ...state, loading: true })),
    on(ProductActions.deleteProductSuccess, (state, { id }) => ({
        ...state, loading: false, products: state.products.filter(v => v.id !== id)
    })),
    on(ProductActions.deleteProductFailure, (state, { error }) => ({ ...state, error: error, loading: false })),


);