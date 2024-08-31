import React from 'react';

const ImageImport = ({text}) => {
    return (
        <div className="d-block w-100" style={{ height: '400px', backgroundColor: '#777', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h3>{text}</h3>
        </div>
      );
}

export default ImageImport;