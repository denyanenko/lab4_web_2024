const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Car = sequelize.define('StolenCar', {
    car_number: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Викрадений', 'Знайдений'),
        defaultValue: 'Викрадений'
    },
    owner_surname: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Car;
