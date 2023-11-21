// FileUploader.js

import React, { useState } from 'react';

const FileUploader = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <div>
      <input 
        type="file" 
        accept=".csv, .json, .sql" 
        onChange={handleFileChange} 
      />
      {selectedFile && <p>File selected: {selectedFile.name}</p>}
    </div>
  );
};

export default FileUploader;
