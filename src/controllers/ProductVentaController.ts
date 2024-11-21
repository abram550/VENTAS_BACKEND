import { Request, Response } from 'express';
import { ProductVenta, ProductVentaI } from '../models/ProductVenta';

export class ProductVentaController {

    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('hola, método test para ProductVenta');
        } catch (error) {
            res.status(500).send({ error: 'Error en el método test de ProductVenta' });
        }
    }

    public async getAllProductVenta(req: Request, res: Response): Promise<void> {
        try {
            const productVentas: ProductVentaI[] = await ProductVenta.findAll();
            res.status(200).json({ productVentas });
        } catch (error) {
            res.status(500).send({ error: 'Error al obtener las ventas de productos' });
        }
    }

    public async createProductVenta(req: Request, res: Response): Promise<void> {
        try {
            const { ProductoId, VentaId, cantidad, precio, total } = req.body;
            const productVenta: ProductVentaI = await ProductVenta.create({ 
                ProductoId, 
                VentaId, 
                cantidad, 
                precio, 
                total 
            });
            res.status(201).json({ productVenta });
        } catch (error) {
            res.status(500).send({ error: 'Error al crear la venta de producto' });
        }
    }
}
