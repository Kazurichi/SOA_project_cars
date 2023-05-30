const { getDB } = require("../config/sequelize");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Car extends Model{

}

Car.init(
    {
        idx:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        car_name:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        model:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        class:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        fuel_type:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        manufacturer:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        year:{
            type: DataTypes.INTEGER,
            allowNull:false,
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: "Car",
        tableName: "cars",
    }
);

module.exports = Car;
