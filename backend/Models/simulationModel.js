const mongoose = require('mongoose');

const simulationSchema = new mongoose.Schema({
  
  anatomy: String,
  imageUrl: String,
  pulseSequence: String,
  fov: Number,
  matrixSize: String,
  sliceThickness: Number,
  sliceGap: Number,
  planeOrientation: String,
  foldOverDirection: String,
  tr: Number,
  te: Number,
  flipAngle: Number
});

module.exports = mongoose.model('Simulation', simulationSchema);
