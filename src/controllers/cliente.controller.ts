import { Request, Response } from 'express';
import { Cliente, ClienteI } from '../models/Cliente';

export class ClienteController {
    public async test(req: Request, res: Response) {
        try {
            res.send('hola, metodo test para Cliente');
        } catch (error) {
            res.status(500).json({ msg: "Error Internal" });
        }
    }

    // Método para mostrar todos los clientes activos
    public async getAllCliente(req: Request, res: Response) {
        try {
            const clientes: ClienteI[] = await Cliente.findAll();
            res.status(200).json({ cliente: clientes });
        } catch (error) {
            console.error('Error en getAllCliente:', error);
            res.status(500).json({ msg: "Error Internal" });
        }
    }

    // Método para mostrar un cliente por su id
    public async getOneCliente(req: Request, res: Response) {
        const { id: idParam } = req.params;

        try {
            const cliente: ClienteI | null = await Cliente.findOne({
                where: { id: Number(idParam) } // Convertir a número aquí
            });

            if (cliente) {
                res.status(200).json({ cliente });
            } else {
                res.status(300).json({ msg: "El Cliente no existe" });
            }
        } catch (error) {
            res.status(500).json({ msg: "Error Internal" });
        }
    }

    // Método para crear un cliente
    public async createCliente(req: Request, res: Response) {
        const {
            nombreCliente,
            direccionCliente,
            telefonoCliente,
            correoCliente,
            passwordCliente,
            estado
        } = req.body;

        try {
            let body: Omit<ClienteI, 'id'> = { // Omite `id` en `createCliente`
                nombreCliente,
                direccionCliente,
                telefonoCliente,
                correoCliente,
                passwordCliente,
                estado
            };

            const cliente: ClienteI = await Cliente.create({ ...body });
            res.status(200).json({ cliente });

        } catch (error) {
            res.status(500).json({ msg: "Error al crear el cliente" });
        }
    }

    // Método para actualizar un cliente
    public async updateCliente(req: Request, res: Response) {
        const pk = Number(req.params.id); // Convertir a número aquí

        const {
            nombreCliente,
            direccionCliente,
            telefonoCliente,
            correoCliente,
            passwordCliente,
            estado
        } = req.body;

        try {
            let body: ClienteI = {
                id: pk, // Incluye el id aquí para updateCliente
                nombreCliente,
                direccionCliente,
                telefonoCliente,
                correoCliente,
                passwordCliente,
                estado
            };

            const clienteExist: ClienteI | null = await Cliente.findByPk(pk);

            if (!clienteExist) return res.status(500).json({ msg: "El Cliente No existe" });

            await Cliente.update(body, {
                where: { id: pk }
            });

            const cliente: ClienteI | null = await Cliente.findByPk(pk);
            if (cliente) return res.status(200).json({ cliente });

        } catch (error) {
            res.status(500).json({ msg: "Error al actualizar el cliente" });
        }
    }

    // Método para eliminar un cliente
    public async deleteCliente(req: Request, res: Response) {
        const pk = Number(req.params.id); // Convertir a número aquí

        try {
            const clienteExist: ClienteI | null = await Cliente.findByPk(pk);
            if (!clienteExist) return res.status(500).json({ msg: "El Cliente No existe" });

            await Cliente.destroy({
                where: { id: pk }
            });

            res.status(200).json({ msg: "Cliente Eliminado" });
        } catch (error) {
            res.status(500).json({ msg: "Error al eliminar el cliente" });
        }
    }

    // Método para desactivar un cliente
    public async hideCliente(req: Request, res: Response): Promise<Response> {
        const pk = Number(req.params.id); // Convertir a número aquí

        try {
            const clienteExist: ClienteI | null = await Cliente.findOne({
                where: { id: pk, estado: true }
            });

            if (!clienteExist) {
                return res.status(404).json({ msg: "El cliente no existe o ya está inactivo" });
            }

            await Cliente.update({ estado: false }, { where: { id: pk } });

            return res.status(200).json({ msg: "Cliente desactivado" });
        } catch (error) {
            console.error('Error en hideCliente:', error);
            return res.status(500).send({ error: 'Error interno del servidor' });
        }
    }
}
