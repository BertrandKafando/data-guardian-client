import React, { useState } from 'react';
import { Button, SvgIcon, FormControlLabel, Radio, Box, Typography } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const AnomaliesComponent = ({ anomaliesData }) => {
  const [corrections, setCorrections] = useState({});

  const valeurNullAnomalies = anomaliesData.filter(anomalie => anomalie.anomalie === 'VALEUR_NULL');

  const groupAnomaliesByColumn = (data) => {
    const grouped = {};
    data.forEach(item => {
      const key = item.nom_colonne;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(item);
    });
    return grouped;
  };

  const groupedAnomalies = groupAnomaliesByColumn(valeurNullAnomalies);

  const handleOptionChange = (column, option) => {
    setCorrections({
      ...corrections,
      [column]: option
    });
  };

  return (
    <>
      <Box mb={2} sx={{ textAlign: 'right' }}>
        <Button 
          startIcon={<SvgIcon fontSize="small"><AnalyticsIcon /></SvgIcon>}
          variant="contained"
          color="success"
          onClick={() => console.log(corrections)}
        >
          Appliquer les corrections
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {Object.entries(groupedAnomalies).map(([column, items]) => (
          <Box key={column} sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2, minWidth: 240 }}>
            <Typography variant="subtitle2" gutterBottom>Colonne : {column}</Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" component="div">
                <strong>ID Ligne:</strong> {items.map(item => item.id_ligne).join(', ')}
              </Typography>
            </Box>
            <Box>
              <FormControlLabel control={<Radio
                checked={corrections[column] === 'mean'}
                onChange={() => handleOptionChange(column, 'mean')}
                value="mean"
                name={`correction-${column}`}
              />} label={<Typography variant="caption">AVG</Typography>} />
              <FormControlLabel control={<Radio
                checked={corrections[column] === 'std'}
                onChange={() => handleOptionChange(column, 'std')}
                value="std"
                name={`correction-${column}`}
              />} label={<Typography variant="caption">STD</Typography>} />
              <FormControlLabel control={<Radio
                checked={corrections[column] === 'null' || corrections[column] === undefined}
                onChange={() => handleOptionChange(column, 'null')}
                value="null"
                name={`correction-${column}`}
              />} label={<Typography variant="caption">N/A</Typography>} />
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default AnomaliesComponent;
