// src/routes/ProductoRoutes.ts

import { Application } from "express";
import { ProductoController } from '../controllers/productventa.controller';

export class ProductoRoutes {
    public productoController: ProductoController = new ProductoController();

    public routes(app: Application): void {
        app.route("/producto/test").get(this.productoController.test);
        app.route("/producto").get(this.productoController.getAllProducto);
        app.route("/producto/:id").get(this.productoController.getOneProducto);
        app.route("/producto").post(this.productoController.createProducto);
        app.route("/producto/:id").put(this.productoController.updateProducto);
        app.route("/producto/:id").delete(this.productoController.deleteProducto); // Ruta para eliminar un producto
        app.route("/producto_Eliminar_Avanzado/:id").delete(this.productoController.hideProducto);

    }
}
