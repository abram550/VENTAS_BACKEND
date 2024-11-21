import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Routes } from '../routes/index';   
import { VentaRoutes } from '../routes/VentaRoutes'; 
import { ProductoRoutes } from '../routes/ProductoRoutes'; 
import { TipoProductoRoutes } from '../routes/TipoProductoRoutes'; 

export class App {
    public routePrv: Routes = new Routes();
    public ventaRoutes: VentaRoutes = new VentaRoutes();
    public productoRoutes: ProductoRoutes = new ProductoRoutes(); 
    public tipoProductoRoutes: TipoProductoRoutes = new TipoProductoRoutes(); 

    public app: Application;  // Cambiado a public para acceder fuera de la clase

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    // Configuración del puerto
    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    // Configuración de middlewares
    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json()); 
        this.app.use(express.urlencoded({ extended: false }));
        
        // Habilitar CORS para permitir solicitudes desde otros orígenes
        this.app.use(cors());
    }

    // Configuración de rutas
    private routes() {
        this.routePrv.clienteRoutes.routes(this.app);
        this.routePrv.ventaRoutes.routes(this.app);
        this.routePrv.productoRoutes.routes(this.app);
        this.tipoProductoRoutes.routes(this.app); // Registra las rutas de TipoProducto
        this.routePrv.authRoutes.routes(this.app);
        this.routePrv.roleRoutes.routes(this.app);
        this.routePrv.userRoutes.routes(this.app);
        this.routePrv.roleUserRoutes.routes(this.app);
        this.routePrv.refreshTokenRoutes.routes(this.app);

  
    }

    // Escuchar en el puerto configurado
    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}
