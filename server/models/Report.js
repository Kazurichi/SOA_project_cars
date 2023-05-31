const { getDB } = require("../config/sequelize");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");
const Car = require("../models/Car");

class Report extends Model{
    static associate(models){
        this.belongsTo(Car,{foreignKey:'car_idx'});
        this.belongsTo(models.ReportType,{foreignKey:'idx'});
    }
}

Report.init(
    {
        idx:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        car_idx:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        type:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        report:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        location:{
            type: DataTypes.STRING,
            allowNull:false,
        },
    },
    {
        sequelize,
        timestamps: true,
        modelName: "Report",
        tableName: "reports",
    }
);

module.exports = Report;