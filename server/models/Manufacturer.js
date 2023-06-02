const { getDB } = require("../config/sequelize");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Manufacturer extends Model{
    static associate(models){
        // this.belongsTo(Car,{foreignKey:'car_idx'});
        // this.belongsTo(models.ReportType,{foreignKey:'idx'});
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
        name:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        country_origin:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        region_id:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        plant_code:{
            type: DataTypes.STRING,
            allowNull:false,
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: "Manufacturer",
        tableName: "manufacturers",
    }
);

module.exports = Manufacturer;
