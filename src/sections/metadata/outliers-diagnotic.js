import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, SvgIcon } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const OutliersComponent = ({ anomaliesData }) => {
  const [outlierCorrections, setOutlierCorrections] = useState({});

  const groupOutliersByColumn = (data) => {
    const grouped = {};
    data.filter(anomalie => anomalie.anomalie === 'DETECTION_VALEUR_ABERANTE').forEach(anomalie => {
      const key = anomalie.nom_colonne;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(anomalie);
    });
    return grouped;
  };

  const groupedOutliers = groupOutliersByColumn(anomaliesData);

  const handleCorrectionChange = (column, value) => {
    setOutlierCorrections({ ...outlierCorrections, [column]: value });
  };

  const applyCorrections = () => {
    console.log('Corrections to apply:', outlierCorrections);
  };

  return (
    <>
      <Box mb={2} sx={{ textAlign: 'right' }}>
        <Button 
          startIcon={<SvgIcon fontSize="small"><AnalyticsIcon /></SvgIcon>}
          variant="contained"
          color="success"
          onClick={applyCorrections}
        >
          Appliquer les corrections
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {Object.entries(groupedOutliers).map(([column, anomalies]) => (
          <Box key={column} sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2, minWidth: 240, maxWidth: 240 }}>
            <Typography variant="subtitle2" gutterBottom>Colonne : {column}</Typography>
            <Typography variant="body2" component="div">
              <strong>ID Ligne:</strong> {anomalies.map(anomaly => anomaly.id_ligne).join(', ')}
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              value={outlierCorrections[column] || ''}
              onChange={(e) => handleCorrectionChange(column, e.target.value)}
              placeholder="'AVG', 'STD', ou un nombre"
              fullWidth
              margin="normal"
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default OutliersComponent;
