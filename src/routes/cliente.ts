import { Request, Response, Application, Router } from "express";
import { ClienteController } from '../controllers/cliente.controller';

export class ClienteRoutes {
    public clienteController: ClienteController =  new ClienteController();

    public routes(app: Application): void {
        app.route("/clientes").get(this.clienteController.getAllCliente);
        app.route("/clientes/:id").get(this.clienteController.getOneCliente);
        app.route("/clientes").post(this.clienteController.createCliente);
        app.route("/clientes/:id").put(this.clienteController.updateCliente);
        app.route("/clientes/:id").delete(this.clienteController.deleteCliente);
        app.route("/clientes/hide/:id").put(this.clienteController.hideCliente); // Ruta para "eliminar avanzado"
    }
}
