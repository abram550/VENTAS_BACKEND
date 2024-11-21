// src/controllers/venta.controller.ts

import { Request, Response } from 'express';
import { Venta, VentaI } from '../models/Venta';
import { Cliente, ClienteI } from '../models/Cliente';

export class VentaController {
    public async test(req: Request, res: Response): Promise<Response> {
        try {
            return res.send('hola, método test para Venta');
        } catch (error) {
            return res.status(500).send({ error: 'Error en el método test de Venta' });
        }
    }

    public async getOneVenta(req: Request, res: Response): Promise<Response> {
        const { id: idParam } = req.params;
    
        try {
            const venta: VentaI | null = await Venta.findOne({
                where: {
                    id: idParam,
                },
            });
    
            if (venta) {
                return res.status(200).json({ venta }); // Respuesta envuelta
            } else {
                return res.status(404).json({ msg: "La venta no existe" });
            }
        } catch (error) {
            return res.status(500).json({ msg: "Error interno del servidor" });
        }
    }

    public async getAllVenta(req: Request, res: Response): Promise<Response> {
        try {
            const ventas: VentaI[] = await Venta.findAll(); // Sin condición
            return res.status(200).json({ ventas }); // Respuesta envuelta
        } catch (error) {
            return res.status(500).send({ error: 'Error al obtener las ventas' });
        }
    }

    public async createVenta(req: Request, res: Response): Promise<Response> {
        const { fechaVenta, subtotal, impuestos, descuentos, total, clientes_id } = req.body;
        try {
            const venta: VentaI = await Venta.create({ 
                fechaVenta, 
                subtotal, 
                impuestos, 
                descuentos, 
                total, 
                clientes_id 
            });
            return res.status(201).json({ venta }); // Respuesta envuelta
        } catch (error) {
            return res.status(500).send({ error: 'Error al crear la venta' });
        }
    } 

    public async updateVenta(req: Request, res: Response): Promise<Response> {
        const { id: pk } = req.params;
        const { fechaVenta, subtotal, impuestos, descuentos, total, clientes_id } = req.body;

        try {
            const ventaExist: VentaI | null = await Venta.findByPk(pk);
            if (!ventaExist) {
                return res.status(404).json({ msg: "La venta no existe" });
            }

            await Venta.update(
                { fechaVenta, subtotal, impuestos, descuentos, total, clientes_id },
                { where: { id: pk } }
            );

            const updatedVenta: VentaI | null = await Venta.findByPk(pk);
            if (updatedVenta) {
                return res.status(200).json({ venta: updatedVenta }); // Respuesta envuelta
            } else {
                return res.status(500).json({ msg: "Error al actualizar la venta" });
            }
        } catch (error) {
            return res.status(500).json({ msg: "Error interno" });
        }
    }

    public async deleteVenta(req: Request, res: Response): Promise<Response> {
        const { id: pk } = req.params;
        try {
            const ventaExist: VentaI | null = await Venta.findByPk(pk);
            if (!ventaExist) return res.status(404).json({ msg: "La venta no existe" });

            await Venta.destroy({ where: { id: pk } });
            return res.status(200).json({ msg: "Venta eliminada" });
        } catch (error) {
            return res.status(500).json({ msg: "Error interno" });
        }
    }

    public async hideVenta(req: Request, res: Response): Promise<Response> {
        const { id: pk } = req.params;
        try {
            // Verifica si la venta existe y está activa
            const ventaExist: VentaI | null = await Venta.findOne({
                where: { id: pk, estado: true }
            });
    
            if (!ventaExist) {
                return res.status(404).json({ msg: "La venta no existe o ya está inactiva" });
            }
    
            // Actualiza el campo 'estado' a false
            await Venta.update({ estado: false }, { where: { id: pk } });
    
            return res.status(200).json({ msg: "Venta desactivada" });
        } catch (error) {
            console.error('Error al desactivar la venta:', error);
            return res.status(500).send({ error: 'Error interno del servidor' });
        }
    }
}
