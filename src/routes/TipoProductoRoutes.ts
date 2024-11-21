import { Application } from "express";
import { TipoProductoController } from '../controllers/tipoproducto.controller';
import { authMiddleware } from "../middleware/auth";

export class TipoProductoRoutes {
    public tipoProductoController: TipoProductoController = new TipoProductoController();

    public routes(app: Application): void {
        app.route("/tipoproductos/test").get(this.tipoProductoController.test);
       // app.route("/tipoproductos").get(this.tipoProductoController.getAllTipoProducto);
        app.route("/tipoproductos").get(authMiddleware, this.tipoProductoController.getAllTipoProducto);
        app.route("/tipoproductos/:id").get( this.tipoProductoController.getOneTipoProducto); // Ruta para obtener uno por ID
      //  app.route("/tipoproductos/:id").get(this.tipoProductoController.getOneTipoProducto); // Ruta para obtener uno por ID
        //app.route("/tipoproductos").post(this.tipoProductoController.createTipoProducto);
        app.route("/tipoproductos").post(authMiddleware, this.tipoProductoController.createTipoProducto);
        app.route("/tipoproductos/:id").put(this.tipoProductoController.updateTipoProducto); // Ruta para actualizar por ID
        app.route("/tipoproductos/:id").delete(this.tipoProductoController.deleteTipoProducto); // Ruta para eliminar por ID
        app.route("/EliminarAvanzadotipoproductos/:id").delete(this.tipoProductoController.hideTipoProducto);

    }
}
