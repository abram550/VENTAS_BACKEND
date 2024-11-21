import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class Cliente extends Model {
  public id!: number;
  public nombreCliente!: string;
  public direccionCliente!: string;
  public telefonoCliente!: string;
  public correoCliente!: string;
  public passwordCliente!: string;
  public estado!: boolean;
}

export interface ClienteI {
  id?: number; // `id` es opcional para evitar errores en creación
  nombreCliente: string;
  direccionCliente: string;
  telefonoCliente: string;
  correoCliente: string;
  passwordCliente: string;
  estado: boolean;
}

Cliente.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombreCliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccionCliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefonoCliente: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    correoCliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordCliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "clientes",
    sequelize: database,
    timestamps: false,
  }
);
