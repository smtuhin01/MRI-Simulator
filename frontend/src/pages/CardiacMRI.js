import React, { useEffect, useState } from 'react';
import './CardiacMRI.css';

import cardiacImg1 from '../imageCardiac/BB_SSh_BH_3201_39_thumb.jpg';
import cardiacImg2 from '../imageCardiac/CI1.jpg';
import cardiacImg3 from '../imageCardiac/CI2.jpg';

import mriVideo from '../imageCardiac/EGE__SAX_2301_30.mp4';

const MRI_DATA = [
  {
    id: 1,
    name: "Ax T1 TSE #27",
    url: cardiacImg1,
    geometry: {
      fov: 250,
      matrixSize: "256*256",
      sliceThickness: 1,
      sliceGap: 0,
      planeOrientation: "Axial",
      foldOverDirection: "Left-Right",
    }
  },
  {
    id: 2,
    name: "CI1",
    url: cardiacImg2,
    geometry: {
      fov: 200,
      matrixSize: "500x500",
      sliceThickness: 2,
      sliceGap: 0,
      planeOrientation: "Axial",
      foldOverDirection: "Left-Right",
    }
  },
  {
    id: 3,
    name: "CI2",
    url: cardiacImg3,
    geometry: {
      fov: 100,
      matrixSize: "420x485",
      sliceThickness: 3,
      sliceGap: 0,
      planeOrientation: "Axial",
      foldOverDirection: "Left-Right",
    }
  }
];

const MRI_VID = mriVideo;

const CardiacMRI = () => {
  const [activeTab, setActiveTab] = useState('Geometry');
  const [generate, setGenerate] = useState(false);

  const [mriData, setMriData] = useState(MRI_DATA);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedID, setSelectedID] = useState(null);
  const [geometryValues, setGeometryValues] = useState(null);

  useEffect(() => {


    // U need to request ur backend for data

    setMriData(MRI_DATA);
  }, []);

  const handleImageClick = (data) => {
    setSelectedImage(data.url);
    setGeometryValues(data.geometry);
    setSelectedID(data.id);
    setGenerate(false); // Reset video view
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    setGeometryValues(() => {
      return mriData.map((item) => {
        if (item.id === selectedID) {
          return { ...item, geometry: data };
        } else {
          return item;
        }
      });
    });

    setMriData(() => {
      return mriData.map((item) => {
        if (item.id === selectedID) {
          return { ...item, geometry: data };
        } else {
          return item;
        }
      });
    });
  };

  return (
    <>
      {!generate ? (
        <div className="mri-container">
          <div className="scan-preview-area">
            <div className="scan-preview">
              <div className="scan-image">
                <img src={selectedImage} alt="MRI Preview" />
              </div>
            </div>
          </div>

          <div className="parameter-section-container">
            <div className="parameter-section">
              {mriData.map((item, index) => (
                <div className="image-container" key={index}>
                  <button className="image-button" onClick={() => handleImageClick(item)}>
                    {item.name}
                  </button>
                </div>
              ))}
            </div>

            <div className="parameter-section">
              <div className="parameter-header">
                <h2>Set parameter</h2>
                <button className="cancel-btn">Cancel</button>
                <button className="save-btn" form="geometryForm" type="submit">
                  Save
                </button>
                <button className="save-btn" onClick={() => setGenerate(true)}>
                  Generate MRI
                </button>
              </div>

              <div className="tabs">
                <button
                  className={`tab ${activeTab === 'Geometry' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Geometry')}
                >
                  Geometry
                </button>
                <button
                  className={`tab ${activeTab === 'Sequence' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Sequence')}
                >
                  Sequence
                </button>
              </div>

              <form key={selectedID} onSubmit={handleSubmit} id="geometryForm">
                <div className="tab-content">
                  {activeTab === 'Geometry' && geometryValues && (
                    <div className="geometry-content">
                      <div className="parameter-row">
                        <div className="parameter-group">
                          <label>Field of View (FOV)</label>
                          <div className="input-with-unit">
                            <input
                              type="number"
                              name="fov"
                              defaultValue={geometryValues.fov}
                              min="100"
                              max="500"
                            />
                            <span className="unit">mm</span>
                          </div>
                          <div className="parameter-hint">Range: 100 mm - 500 mm</div>
                          <div className="parameter-description">Defines the size of the scanned area.</div>
                        </div>

                        <div className="parameter-group">
                          <label>Matrix Size</label>
                          <select name="matrixSize" defaultValue={geometryValues.matrixSize}>
                            <option value="128*128">128*128</option>
                            <option value="256*256">256*256</option>
                            <option value="512*512">512*512</option>
                          </select>
                          <div className="parameter-description">
                            Controls image resolution. Higher values give clearer images but increase scan time.
                          </div>
                        </div>
                      </div>

                      <div className="parameter-group">
                        <label>Slice Thickness</label>
                        <input
                          name="sliceThickness"
                          type="number"
                          min="0.5"
                          max="10"
                          step="0.5"
                          defaultValue={geometryValues.sliceThickness}
                        />
                        <div className="parameter-description">
                          Determines the thickness of each image slice (0.5 mm – 10 mm).
                        </div>
                      </div>

                      <div className="parameter-group">
                        <label>Slice Gap</label>
                        <input
                          name="sliceGap"
                          type="number"
                          min="0"
                          max="5"
                          step="0.5"
                          defaultValue={geometryValues.sliceGap}
                        />
                        <div className="parameter-description">Defines spacing between adjacent slices (0 mm – 5 mm).</div>
                      </div>

                      <div className="parameter-group">
                        <label>Plane Orientation</label>
                        <select defaultValue={geometryValues.planeOrientation} name="planeOrientation">
                          <option value="Axial">Axial</option>
                          <option value="Coronal">Coronal</option>
                          <option value="Sagittal">Sagittal</option>
                        </select>
                        <div className="parameter-description">Selects the scan plane.</div>
                      </div>

                      <div className="parameter-group">
                        <label>Fold over Direction</label>
                        <select defaultValue={geometryValues.foldOverDirection} name="foldOverDirection">
                          <option value="Left-Right">Left-Right</option>
                          <option value="Anterior-Posterior">Anterior-Posterior</option>
                        </select>
                        <div className="parameter-description">Controls phase encoding to reduce artifacts.</div>
                      </div>
                    </div>
                  )}

                  {activeTab !== 'Geometry' && (
                    <div className="inactive-tab-content">
                      <p>This tab is not active in the current implementation.</p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="scan-preview-area">
          <div className="scan-preview">
            <div className="scan-image">
              <video src={MRI_VID} controls autoPlay loop />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardiacMRI;
