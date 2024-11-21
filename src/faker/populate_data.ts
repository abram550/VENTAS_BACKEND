import { Cliente } from '../models/Cliente';
import { TipoProducto } from '../models/TipoProducto';
import { Producto } from '../models/Producto';
import { Venta } from '../models/Venta';
import { faker } from '@faker-js/faker';
import { ProductVenta } from '../models/ProductVenta';

async function createFakeData() {
    // Crear clientes falsos
    for (let i = 0; i < 50; i++) {
        await Cliente.create({
            nombreCliente: faker.name.fullName(),
            direccionCliente: faker.location.streetAddress(), // Corregido: faker.address -> faker.location
            telefonoCliente: faker.phone.number(),
            correoCliente: faker.internet.email(),
            passwordCliente: faker.internet.password(),
            estado: faker.datatype.boolean()
        });
    }

    // Crear tipos de productos falsos
    for (let i = 0; i < 10; i++) {
        await TipoProducto.create({
            name: faker.commerce.department(),
            estado: faker.datatype.boolean()
        });
    }

    // Crear productos falsos
    const tipoProductos = await TipoProducto.findAll();
    for (let i = 0; i < 30; i++) {
        await Producto.create({
            nombre: faker.commerce.productName(),
            marca: faker.company.name(),
            precio: parseFloat(faker.commerce.price()), // Convertir a número
            stockMin: faker.number.int({ min: 1, max: 10 }),
            cantidad: faker.number.int({ min: 1, max: 100 }),
            Tipoproductoid: tipoProductos[faker.number.int({ min: 0, max: tipoProductos.length - 1 })].id,
            estado: faker.datatype.boolean()
        });
    }

    // Crear ventas falsas
    const clientes = await Cliente.findAll();
    for (let i = 0; i < 100; i++) {
        await Venta.create({
            fechaVenta: faker.date.past().toISOString(),
            subtotal: parseFloat(faker.commerce.price()),
            impuestos: parseFloat(faker.commerce.price()), // Ajuste del nombre de campo
            descuentos: parseFloat(faker.commerce.price()),
            total: parseFloat(faker.commerce.price()),
            clientes_id: clientes[faker.number.int({ min: 0, max: clientes.length - 1 })].id,
            estado: faker.datatype.boolean()
        });
    }

    // Crear productos ventas falsos, asegurando combinaciones únicas de ProductoId y VentaId
    const ventas = await Venta.findAll();
    const productos = await Producto.findAll();
    for (let i = 0; i < 300; i++) {
        const ventaId = ventas[faker.number.int({ min: 0, max: ventas.length - 1 })].id;
        const productoId = productos[faker.number.int({ min: 0, max: productos.length - 1 })].id;

        // Verificar si la combinación ProductoId y VentaId ya existe
        const existingProductVenta = await ProductVenta.findOne({
            where: { VentaId: ventaId, ProductoId: productoId }
        });

        // Si no existe, insertar el nuevo registro
        if (!existingProductVenta) {
            await ProductVenta.create({
                cantidad: faker.number.int({ min: 1, max: 10 }).toString(), // Convertir a string
                precio: faker.commerce.price().toString(),                 // Convertir a string
                total: faker.commerce.price().toString(),                  // Convertir a string
                VentaId: ventaId,
                ProductoId: productoId
            });
        } else {
            console.log(`Combinación VentaId ${ventaId} y ProductoId ${productoId} ya existe.`);
        }
    }
}

createFakeData().then(() => {
    console.log('Datos falsos creados exitosamente');
}).catch((error) => {
    console.error('Error al crear datos falsos:', error);
});

// Para ejecutar este script, ejecute el siguiente comando:
    //CODIGOS PARA INSTALAR LAS DEPENDENCIAS:
        // npm install -g ts-node
        // npm install faker @faker-js/faker
    //CODIGO PARA QUE GENERE LOS DATOS FALSOS:
        // ts-node src/faker/populate_data.ts
