// src/controllers/tipoProducto.controller.ts

import { Request, Response } from 'express';
import { TipoProducto, TipoProductoI } from '../models/TipoProducto';

export class TipoProductoController {
    public async test(req: Request, res: Response): Promise<Response> {
        try {
            return res.send('hola, método test para TipoProducto');
        } catch (error) {
            return res.status(500).send({ error: 'Error en el método test de TipoProducto' });
        }
    }

    public async getAllTipoProducto(req: Request, res: Response): Promise<Response> {
        try {
            const tiposProducto: TipoProductoI[] = await TipoProducto.findAll();
            return res.status(200).json({ tiposProducto }); // Respuesta envuelta
        } catch (error) {
            return res.status(500).send({ error: 'Error al obtener los tipos de producto' });
        }
    }

    public async getOneTipoProducto(req: Request, res: Response): Promise<Response> {
        const { id: idParam } = req.params;

        try {
            const tipoProducto: TipoProductoI | null = await TipoProducto.findByPk(idParam);
            
            if (tipoProducto) {
                return res.status(200).json({ tipoProducto }); // Respuesta envuelta
            } else {
                return res.status(404).json({ msg: "El tipo de producto no existe" });
            }
        } catch (error) {
            return res.status(500).json({ msg: "Error interno del servidor" });
        }
    }

    public async createTipoProducto(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;

        try {
            const tipoProducto: TipoProductoI = await TipoProducto.create({ name });
            return res.status(201).json({ tipoProducto }); // Respuesta envuelta
        } catch (error) {
            return res.status(500).send({ error: 'Error al crear el tipo de producto' });
        }
    }

    public async updateTipoProducto(req: Request, res: Response): Promise<Response> {
        const { id: pk } = req.params;
        const { name } = req.body;

        try {
            const tipoProductoExist: TipoProductoI | null = await TipoProducto.findByPk(pk);
            if (!tipoProductoExist) {
                return res.status(404).json({ msg: "El tipo de producto no existe" });
            }

            await TipoProducto.update({ name }, { where: { id: pk } });

            const updatedTipoProducto: TipoProductoI | null = await TipoProducto.findByPk(pk);
            if (updatedTipoProducto) {
                return res.status(200).json({ tipoProducto: updatedTipoProducto }); // Respuesta envuelta
            } else {
                return res.status(500).json({ msg: "Error al actualizar el tipo de producto" });
            }
        } catch (error) {
            return res.status(500).json({ msg: "Error interno del servidor" });
        }
    }

    public async deleteTipoProducto(req: Request, res: Response): Promise<Response> {
        const { id: pk } = req.params;

        try {
            const tipoProductoExist: TipoProductoI | null = await TipoProducto.findByPk(pk);
            if (!tipoProductoExist) return res.status(404).json({ msg: "El tipo de producto no existe" });

            await TipoProducto.destroy({ where: { id: pk } });
            return res.status(200).json({ msg: "Tipo de producto eliminado" });
        } catch (error) {
            return res.status(500).json({ msg: "Error interno del servidor" });
        }
    }

    public async hideTipoProducto(req: Request, res: Response): Promise<Response> {
        const { id: pk } = req.params;
        try {
            // Verifica si el tipo de producto existe y está activo
            const tipoProductoExist: TipoProductoI | null = await TipoProducto.findOne({
                where: { id: pk, estado: true }
            });
    
            if (!tipoProductoExist) {
                return res.status(404).json({ msg: "El tipo de producto no existe o ya está inactivo" });
            }
    
            // Actualiza el campo 'estado' a false
            await TipoProducto.update({ estado: false }, { where: { id: pk } });
    
            return res.status(200).json({ msg: "Tipo de producto desactivado" });
        } catch (error) {
            console.error('Error al desactivar el tipo de producto:', error);
            return res.status(500).send({ error: 'Error interno del servidor' });
        }
    }
}
