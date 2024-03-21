import React, { useState } from 'react';
import { Box, Table, SvgIcon,TableBody, TableCell, TableHead, TableRow, Paper, TextField, Button } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
const DuplicatesComponent = ({ anomaliesData }) => {
  // Filtrer pour obtenir uniquement les anomalies DOUBLONS_SIMILAIRES
  const duplicateAnomalies = anomaliesData.filter(anomalie => {
    return anomalie.anomalie === 'DOUBLONS';
});

    const [corrections, setCorrections] = useState({});
    const applyCorrections = () => {
        console.log(corrections);
        // Implémentez la logique pour appliquer les corrections ici
        };

  return (
    <Box component={Paper}>
      <Box mb={2} sx={{ textAlign: 'right' }}>
        <Button 
          startIcon={<SvgIcon fontSize="small"><AnalyticsIcon /></SvgIcon>}
          variant="contained"
          color="success"
          onClick={applyCorrections}>
          Appliquer les corrections
        </Button>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID Ligne</TableCell>
            <TableCell>Nom Colonne</TableCell>
            <TableCell>Valeur</TableCell>
            <TableCell>Commentaire</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {duplicateAnomalies.map((anomalie) => (
            <TableRow key={anomalie.id}>
              <TableCell>{anomalie.id_ligne}</TableCell>
              <TableCell>{anomalie.nom_colonne}</TableCell>
              <TableCell>{anomalie.valeur}</TableCell>
              <TableCell>{anomalie.commentaire}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default DuplicatesComponent;
