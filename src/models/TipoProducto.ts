import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class TipoProducto extends Model {
  public id!: number;
  public name!: string;
  public estado!: boolean;
}

export interface TipoProductoI {
  id: number;
  name: string;
  estado: boolean;
}

TipoProducto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    tableName: "tipoproducto",
    sequelize: database,
    timestamps: false,
  }
);
