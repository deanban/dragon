const express = require('express');

const router = express.Router();

router.get('/new', (req, res) => {
  res.json({ dragon: req.app.locals.Engine.generation.newDragon() });
});

module.exports = router;
