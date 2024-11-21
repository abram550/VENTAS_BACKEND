import { App } from './config/index';
import cors from 'cors';

async function main() {
    try {
        const app = new App(4000);
        
        // Habilitar CORS para múltiples orígenes
        app.app.use(cors({
            origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],  // Acepta ambos orígenes
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
        }));

        // Arrancar el servidor
        await app.listen();
        console.log('Servidor corriendo en el puerto 4000');

    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1); // Salir del proceso si hay un error crítico
    }
}

main();
