import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { TipoProducto } from "./TipoProducto";

export class Producto extends Model {
  public id!: number;
  public nombre!: string;
  public marca!: string;
  public precio!: number;
  public stockMin!: number;
  public cantidad!: number;
  public Tipoproductoid!: number;
  public estado!: boolean;
}

export interface ProductoI {
  id: number;
  nombre: string;
  marca: string;
  precio: number;
  stockMin: number;
  cantidad: number;
  Tipoproductoid: number;
  estado: boolean;
}

Producto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stockMin: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Tipoproductoid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TipoProducto,
        key: 'id',
      },
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    tableName: "productos",
    sequelize: database,
    timestamps: false,
  }
);

Producto.belongsTo(TipoProducto, { foreignKey: "Tipoproductoid", as: "tipoProducto" });
