import { Application } from "express";
import { ProductVentaController } from '../controllers/ProductVentaController';

export class ProductVentaRoutes {
    public productVentaController: ProductVentaController = new ProductVentaController();

    public routes(app: Application): void {
        app.route("/productventas/test").get(this.productVentaController.test);
        app.route("/productventas").get(this.productVentaController.getAllProductVenta);
        app.route("/productventas").post(this.productVentaController.createProductVenta);
    }
}
