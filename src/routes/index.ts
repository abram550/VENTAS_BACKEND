import { ClienteRoutes } from './cliente';
import { TipoProducto } from '../models/TipoProducto';
import { VentaRoutes } from './VentaRoutes';
import { ProductoRoutes } from './ProductoRoutes';
import { ProductVenta } from '../models/ProductVenta';
import { UserRoutes } from './user';
import { RoleRoutes } from './role';
import { RoleUserRoutes } from './role_user';
import { AuthRoutes } from './auth';
import { RefreshTokenRoutes } from './refresh_token';


export class Routes {
    public clienteRoutes: ClienteRoutes = new ClienteRoutes();
    public tipoProductoRoutes: TipoProducto = new TipoProducto();
    public ventaRoutes: VentaRoutes = new VentaRoutes();
    public productoRoutes: ProductoRoutes = new ProductoRoutes();
    public productoVentaRoutes: ProductVenta = new ProductVenta();
    public userRoutes: UserRoutes = new UserRoutes();
    public roleRoutes: RoleRoutes = new RoleRoutes();
    public roleUserRoutes: RoleUserRoutes = new RoleUserRoutes();
    public authRoutes: AuthRoutes = new AuthRoutes();
    public refreshTokenRoutes: RefreshTokenRoutes = new RefreshTokenRoutes();
}
