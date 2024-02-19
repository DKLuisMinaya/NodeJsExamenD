import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { TypeUsersModel } from "./TypeUsersModel.js";

export const UserModel = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    especialidad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
  },{
    timestamps:false
  }
  
);

TypeUsersModel.hasMany(UserModel, { foreignKey: "typeusers_id" });
UserModel.belongsTo(TypeUsersModel, { foreignKey: "typeusers_id" });
