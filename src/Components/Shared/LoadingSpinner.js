import React from 'react';

import { ProgressSpinner } from 'primereact/progressspinner';
const LoadingSpinner = props => {
  return (
    <div style={{position:"relative",top:"50%",left:"50%",marginBottom:"600px"}}> <ProgressSpinner/></div>
  );
};

export default LoadingSpinner;
