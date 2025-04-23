import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './simulation.css'; 
import { Slider } from '@mui/material';

function BrainSimulationPage() {
  const [sequences, setSequences] = useState([]);
  const [selectedSeq, setSelectedSeq] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8082/api/simulations/brain')
      .then(res => setSequences(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSelectSequence = (seq) => setSelectedSeq(seq);

  return (
    <div className="simulation-page">
      <div className="sequence-list">
        <h3>Pulse Sequences</h3>
        {sequences.map(seq => (
          <div key={seq._id} className="sequence-item" onClick={() => handleSelectSequence(seq)}>
            <img src={seq.imageUrl} alt={seq.pulseSequence} />
            <p>{seq.pulseSequence}</p>
          </div>
        ))}
      </div>

      <div className="parameter-section">
        <h3>Set Parameters</h3>
        {selectedSeq ? (
          <form>
            <label>FOV: {selectedSeq.fov} mm</label>
            <Slider defaultValue={selectedSeq.fov} min={100} max={500} />

            <label>Matrix Size</label>
            <select defaultValue={selectedSeq.matrixSize}>
              <option value="128x128">128x128</option>
              <option value="256x256">256x256</option>
              <option value="512x512">512x512</option>
            </select>

            <label>Slice Thickness (mm)</label>
            <Slider defaultValue={selectedSeq.sliceThickness} min={0.5} max={10} step={0.5} />

            <label>Slice Gap (mm)</label>
            <input type="number" defaultValue={selectedSeq.sliceGap} min={0} max={5} />

            <label>Plane Orientation</label>
            <select defaultValue={selectedSeq.planeOrientation}>
              <option value="Axial">Axial</option>
              <option value="Coronal">Coronal</option>
              <option value="Sagittal">Sagittal</option>
            </select>

            <label>Fold Over Direction</label>
            <select defaultValue={selectedSeq.foldOverDirection}>
              <option value="Left-Right">Left-Right</option>
              <option value="Anterior-Posterior">Anterior-Posterior</option>
            </select>

            <label>TR (ms)</label>
            <input type="number" defaultValue={selectedSeq.tr} min={300} max={3000} />

            <label>TE (ms)</label>
            <input type="number" defaultValue={selectedSeq.te} min={10} max={150} />

            <label>Flip Angle (°)</label>
            <input type="number" defaultValue={selectedSeq.flipAngle} min={0} max={180} />

            <label>Pulse Sequence</label>
            <select defaultValue={selectedSeq.pulseSequence}>
              <option value="T1">T1</option>
              <option value="T2">T2</option>
              <option value="FLAIR">FLAIR</option>
              <option value="DWI">DWI</option>
              <option value="GRE">GRE</option>
            </select>
          </form>
        ) : (
          <p>Select a sequence to edit parameters</p>
        )}
      </div>
    </div>
  );
}

export default BrainSimulationPage;
