const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// Створення нового запису
router.post('/cars', async (req, res) => {
    try {
        const newCar = await Car.create(req.body);
        res.status(201).json(newCar);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Отримання всіх записів
router.get('/cars', async (req, res) => {
    try {
        const cars = await Car.findAll();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Отримання обмеженої кількості записів з пагінацією
router.get('/cars/limited', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;  // Кількість записів на сторінці
        const page = parseInt(req.query.page) || 1;    // Номер сторінки
        const offset = (page - 1) * limit;  // Обчислення пропуску

        // Отримання записів з бази даних
        const cars = await Car.findAll({
            limit: limit,
            offset: offset
        });

        // Отримання загальної кількості записів
        const totalCount = await Car.count();

        // Обчислення загальної кількості сторінок
        const totalPages = Math.ceil(totalCount / limit);

        // Формування відповіді
        res.json({
            cars: cars,
            totalPages: totalPages
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Отримання одного запису за car_number
router.get('/cars/:car_number', async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.car_number);
        car ? res.json(car) : res.status(404).json({ message: 'Car not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Оновлення запису
router.put('/cars/:car_number', async (req, res) => {
    try {
        const [updated] = await Car.update(req.body, {
            where: { car_number: req.params.car_number }
        });
        updated ? res.json({ message: 'Car updated' }) : res.status(404).json({ message: 'Car not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Видалення запису
router.delete('/cars/:car_number', async (req, res) => {
    try {
        const deleted = await Car.destroy({
            where: { car_number: req.params.car_number }
        });
        deleted ? res.json({ message: 'Car deleted' }) : res.status(404).json({ message: 'Car not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
