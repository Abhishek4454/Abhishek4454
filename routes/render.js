const express = require('express');
const router = express.Router();

console.log('Render routes loaded : ');

const renderController = require('../controllers/render_controller');

router.get('/', renderController.render);

module.exports = router;