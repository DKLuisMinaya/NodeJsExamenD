import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { UserModel } from "./UserModel.js";

export const CitaModel = sequelize.define(
  "citas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    medico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaHora: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
  },{
    timestamps:false
  }
  
);

UserModel.hasMany(CitaModel, { foreignKey: "person_id" });
CitaModel.belongsTo(UserModel, { foreignKey: "person_id" });