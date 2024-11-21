// src/controllers/producto.controller.ts

import { Request, Response } from 'express';
import { Producto, ProductoI } from '../models/Producto';

export class ProductoController {

    public async test(req: Request, res: Response): Promise<Response> {
        try {
            return res.send('hola, método test para Producto');
        } catch (error) {
            return res.status(500).send({ error: 'Error en el método test de Producto' });
        }
    }

    public async getAllProducto(req: Request, res: Response): Promise<Response> {
        try {
            const productos: ProductoI[] = await Producto.findAll();
            return res.status(200).json({ productos });
        } catch (error) {
            return res.status(500).send({ error: 'Error al obtener los productos' });
        }
    }

    public async getOneProducto(req: Request, res: Response): Promise<Response> {
        const { id: idParam } = req.params;

        try {
            const producto: ProductoI | null = await Producto.findOne({
                where: { id: idParam },
            });

            if (producto) {
                return res.status(200).json({producto});
            } else {
                return res.status(404).json({ msg: "El producto no existe" });
            }
        } catch (error) {
            return res.status(500).send({ error: 'Error interno del servidor' });
        }
    }

    public async createProducto(req: Request, res: Response): Promise<Response> {
        const { nombre, marca, precio, stockMin, cantidad, Tipoproductoid} = req.body;
        try {
            const producto: ProductoI = await Producto.create({ 
                nombre, 
                marca, 
                precio, 
                stockMin, 
                cantidad, 
                Tipoproductoid
            });
            return res.status(201).json({ producto });
        } catch (error) {
            return res.status(500).send({ error: 'Error al crear el producto' });
        }
    }

    public async updateProducto(req: Request, res: Response): Promise<Response> {
        const { id: pk } = req.params;
        const { nombre, marca, precio, stockMin, cantidad, Tipoproductoid } = req.body;

        try {
            const productoExist: ProductoI | null = await Producto.findByPk(pk);
            if (!productoExist) {
                return res.status(404).json({ msg: "El producto no existe" });
            }

            await Producto.update(
                { nombre, marca, precio, stockMin, cantidad, Tipoproductoid },
                { where: { id: pk } }
            );

            const updatedProducto: ProductoI | null = await Producto.findByPk(pk);
            if (updatedProducto) {
                return res.status(200).json({ producto: updatedProducto });
            } else {
                return res.status(500).json({ msg: "Error al actualizar el producto" });
            }
        } catch (error) {
            return res.status(500).send({ error: 'Error interno del servidor' });
        }
    }

    public async deleteProducto(req: Request, res: Response): Promise<Response> {
        const { id: pk } = req.params;
        try {
            const productoExist: ProductoI | null = await Producto.findByPk(pk);
            if (!productoExist) {
                return res.status(404).json({ msg: "El producto no existe" });
            }
    
            await Producto.destroy({ where: { id: pk } });
            return res.status(200).json({ msg: "Producto eliminado" });
        } catch (error) {
            console.error('Error al eliminar producto:', error); // Añade un log para ver el error en la consola
            return res.status(500).send({ error: 'Error interno del servidor' });
        }
    }

    public async hideProducto(req: Request, res: Response): Promise<Response> {
        const { id: pk } = req.params;
        try {
            // Verifica si el producto existe y está estado
            const productoExist: ProductoI | null = await Producto.findOne({
                where: { id: pk, estado: true }
            });
    
            if (!productoExist) {
                return res.status(404).json({ msg: "El producto no existe o ya está inactivo" });
            }
    
            // Actualiza el campo 'estado' a false
            await Producto.update({ estado: false }, { where: { id: pk } });
    
            return res.status(200).json({ msg: "Producto desactivado" });
        } catch (error) {
            console.error('Error al desactivar el producto:', error);
            return res.status(500).send({ error: 'Error interno del servidor' });
        }
    }
    
    
}





