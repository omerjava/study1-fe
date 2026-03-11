import { inject, Injectable } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import * as ProductActions from './products.actions';
import { Product } from "../../models/product.model";


@Injectable()
export class ProductEffects {
    private actions$ = inject(Actions);
    private productService = inject(ProductService);

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            mergeMap(() =>
                this.productService.getProducts().pipe(
                    map((products) => ProductActions.loadProductsSuccess({ products })),
                    catchError((error) => of(ProductActions.loadProductsFailure({ error })))
                )
            )
        )
    );

    createProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.createProduct),
            mergeMap(({ product }) =>
                this.productService.createProduct(product).pipe(
                    map((data: Product) => ProductActions.createProductSuccess({ product: data })),
                    catchError((error) => of(ProductActions.createProductFailure(error)))
                )
            )
        )
    );

    updateProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.updateProduct),
            mergeMap(({ product }) =>
                this.productService.updateProduct(product).pipe(
                    map((data: Product) => ProductActions.updateProductSuccess({ product: data })),
                    catchError((error) => of(ProductActions.updateProductFailure({ error })))
                )
            )
        )
    );

    deleteProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.deleteProduct),
            mergeMap(({ id }) =>
                this.productService.deleteProduct(id).pipe(
                    map(() => ProductActions.deleteProductSuccess({ id: id })),
                    catchError((error) => of(ProductActions.deleteProductFailure({ error: error })))
                )
            )
        )
    );

}