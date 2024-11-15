const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const carRoutes = require('./routes/carRoutes');
const Car = require('./models/Car');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.use('/api', carRoutes);
// Обслуговування статичних файлів
app.use(express.static(path.join(__dirname, 'public')));

// Синхронізація з базою даних
sequelize.sync({ force: false })
    .then(() => console.log('Database connected'))
    .catch((error) => console.error('Error connecting to the database:', error));

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
