const express = require('express');
const router = express.Router();
const consumerController = require('../controllers/consumerController');
router.route('/')
.get(consumerController.getConsumer)
.post(consumerController.newConsumer)
;
router.get('/name/:name',consumerController.getConsumerIdByName);
router.route('/:id')
.get(consumerController.getConsumerId)
.put(consumerController.updateConsumer)
.delete(consumerController.deleteConsumer)
;


module.exports = router;