// LoadingOverlay.js
import React from 'react';
import '../styles/Loading.css';

export default function Loading () {
  return (
    <div className="loading-overlay">
      <div className="loader"></div>
    </div>
  );
};
