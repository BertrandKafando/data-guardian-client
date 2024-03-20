import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const CheckConstraintsComponent = ({ anomaliesData }) => {
  const [selected, setSelected] = useState({});

  const handleCheckboxChange = (id) => {
    setSelected({ ...selected, [id]: !selected[id] });
  };
    // Filtrer pour obtenir uniquement les anomalies concernées
    const filteredAnomalies = anomaliesData.filter(anomalie =>
        anomalie.anomalie === 'ESPACES_SUPPERFLUS' ||
        anomalie.anomalie === 'REPETITIONS_DE_LETTRES' ||
        anomalie.anomalie === 'CARACTERES_SPECIAUX'    ||
        anomalie.anomalie === 'GROUPE_SANGUIN_INCONNU' ||
        anomalie.anomalie === 'CONTINENT_INCONNU_OU_MAL_ECRIT' ||
        anomalie.anomalie === 'VILLE_INCONNU_OU_MAL_ECRIT' ||
        anomalie.anomalie === 'PAYS_INCONNU_OU_MAL_ECRIT' ||
        anomalie.anomalie === 'FORMAT_ADRESSE_INCORRECTE' ||
        anomalie.anomalie === 'FORMAT_NUMERO_TELEPHONE_INCORRECTE' ||
        anomalie.anomalie === 'EMAIL_INCORRECTE' || 
        anomalie.anomalie === 'FORMAT_DATE_INCORRECTE' || 
        anomalie.anomalie === 'VALEUR_NUMERIQUE_INCORRECTE'
      );
  const groupAnomaliesByType = (data) => {
    const grouped = {};
    data.forEach(item => {
      const key = item.anomalie;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(item);
    });
    return grouped;
  };

  /* handle name of anomalieType */
  const getAnomalieType = (anomalie) => {
     anomalie = anomalie.replace(/_/g, ' ').toLowerCase();
     return anomalie;
    }

  const groupedAnomalies = groupAnomaliesByType(filteredAnomalies);

  return (
    <Container>
      {Object.entries(groupedAnomalies).map(([anomalieType, items]) => (
        <Grid item xs={12} key={anomalieType} style={{ marginBottom: 20 }}>
          <Typography variant="h6" gutterBottom size="small">{getAnomalieType(anomalieType)}</Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID Ligne</TableCell>
                  <TableCell>Colonne</TableCell>
                  <TableCell>Valeur</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell size="small">{item.id_ligne}</TableCell>
                    <TableCell size="small">{item.nom_colonne}</TableCell>
                    <TableCell size="small">{item.valeur}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={!!selected[item.id]}
                        onChange={() => handleCheckboxChange(item.id)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      ))}
      <Box mt={2} textAlign="center">
        <Button 
          startIcon={<AnalyticsIcon />}
          variant="contained"
          color='success'
          onClick={() => console.log("Selected corrections:", selected)}
        >
          Appliquer les corrections
        </Button>
      </Box>
    </Container>
  );
};

export default CheckConstraintsComponent;