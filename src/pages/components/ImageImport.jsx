import React from 'react';

const ImageImport = ({src,alt}) => {
    return (
        <div className="d-block w-500" style={{ height: 'auto', backgroundColor: '#777', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={src} alt={alt} className="d-block w-100" style={{ objectFit: 'cover', height: '100%' }} />
        </div>
      );
}

export default ImageImport;