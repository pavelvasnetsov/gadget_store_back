require('dotenv').config();// импорт конфига из модуля dotenv
const express = require('express');// импорт express
const sequelize = require('./db')// импорт объекта БД
const models = require('./models/models.js');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const router = require('./routes/index.js');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT; // порт на котором будет работать приложение

const app = express(); // запуск нашего приложения
app.use(cors());
app.use(express.json());// для парсинга json
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/', router);

app.use(errorHandler);// Обработка ошибок

const start = async () => {
    try {
        await sequelize.authenticate(); // подключение к БД
        await sequelize.sync(); // сверяет состояние БД со схемой данных
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) // указывается какой порт будет слушать приложение и callback при успешном запуске сервера

    } catch (err) {
        console.log(err);
    }
};

start();
