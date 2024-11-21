import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Producto } from "./Producto";
import { Venta } from "./Venta";

export class ProductVenta extends Model {
  public ProductoId!: number;
  public VentaId!: number;
  public cantidad!: string;
  public precio!: string;
  public total!: string;
}

export interface ProductVentaI {
  ProductoId: number;
  VentaId: number;
  cantidad: string;
  precio: string;
  total: string;
}

ProductVenta.init(
  {
    ProductoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Producto,
        key: 'id',
      },
    },
    VentaId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Venta,
        key: 'id',
      },
    },
    cantidad: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    precio: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    total: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "product_ventas",
    sequelize: database,
    timestamps: false,
  }
);

ProductVenta.belongsTo(Producto, { foreignKey: "ProductoId", as: "producto" });
ProductVenta.belongsTo(Venta, { foreignKey: "VentaId", as: "venta" });

