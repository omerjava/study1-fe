import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./products.reducer";


export const selectProductState = createFeatureSelector<State>('products');

export const selectAllProducts = createSelector(
    selectProductState,
    (state) => state.products,
);

export const selectLoading = createSelector(
    selectProductState,
    (state) => state.loading,
)

export const selectError = createSelector(
    selectProductState,
    (state) => state.error,
)