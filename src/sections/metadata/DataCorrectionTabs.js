import React, { useState } from 'react';
import { Grid, Card, CardHeader, CardContent, Tabs, Tab, Box } from "@mui/material";
import AnomaliesComponent from 'src/sections/metadata/null-diagnotic';
import OutliersComponent from 'src/sections/metadata/outliers-diagnotic';
import DuplicatesComponent from 'src/sections/metadata/doublons-sim-diagnotic';
import CheckConstraintsComponent from 'src/sections/metadata/check-contraint';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && ( 
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const DataCorrectionTabs = ({ yourData }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Corrections des Anomalies" />
          <CardContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Valeurs NULL" {...a11yProps(0)} />
                <Tab label="Valeurs Aberrantes" {...a11yProps(1)} />
                <Tab label="Doublons Similaires" {...a11yProps(2)} />
                <Tab label="Contraintes" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <AnomaliesComponent anomaliesData={yourData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <OutliersComponent anomaliesData={yourData} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <DuplicatesComponent anomaliesData={yourData} />
            </TabPanel>
            <TabPanel value={value} index={3}>
            <CheckConstraintsComponent anomaliesData={yourData} />
            </TabPanel>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DataCorrectionTabs;
