const express = require('express');
const multer = require('multer');

const uploadConfig = require('../src/config/upload');
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/', (req, res) => {
  return res.json({ message: `Hello ${req.query.name}` });
});

routes.post('/sessions', SessionController.store);

routes.post('/spots/:spot_id/booking', BookingController.store);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.get('/spots', SpotController.index);

routes.get('/dashboard', DashboardController.show);

module.exports = routes;
