const express = require('express');
const router = express.Router();
const Simulation = require('../Models/simulationModel');


router.get('/brain', async (req, res) => {
  try {
    const data = await Simulation.find({ anatomy: 'brain' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
