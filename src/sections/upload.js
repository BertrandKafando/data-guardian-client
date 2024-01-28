import React from "react";
import { Card, Typography } from "@mui/material";
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';

const Upload = ({ handleFileUpload }) => {
  const handleFileInputClick = () => {
    document.getElementById("fileInput").click(); // Clique simulé sur l'élément de fichier caché
  };

  return (
    <Card
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer', // Curseur indiquant qu'il est cliquable
      }}
      onClick={handleFileInputClick} // Déclenche la fonction lorsqu'on clique sur la carte
    >
      <input
        type="file"
        id="fileInput"
        accept=".csv, .txt,.xlsx,.xls,.json"
        onChange={(e) => handleFileUpload(e)}
        style={{ display: 'none' }}
      />
    
      <Typography variant="h6" >Cliquez pour importer</Typography>
    </Card>
  );
};

export default Upload;
