const express = require('express');

const router = express.Router();

router.get('/generation', (req, res) => {
  res.json({ generation: req.app.locals.Engine.generation });
});

module.exports = router;
