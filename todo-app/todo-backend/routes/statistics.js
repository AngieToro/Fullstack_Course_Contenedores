const express = require('express');
const redis = require('../redis')
const router = express.Router();

/* GET statistics listing. */
router.get('/', async (req, res) => {
  const addedTodos = Number(await redis.getAsync('added_todos')) || 0;
  res.json( { addedTodos } );
});

module.exports = router;