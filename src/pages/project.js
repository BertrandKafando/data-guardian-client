import React from 'react'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Card, Typography } from '@mui/material';
import Head from 'next/head';
import { Box, Container, Grid, Table, TableBody, TableHead, TableRow, TableCell, Button, Stack, SvgIcon, TableContainer } from '@mui/material';
import { useState, useEffect } from 'react';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getAllProjectsOfUser } from 'src/api/project';
import AnalyticsIcon from "@mui/icons-material/Analytics";
import EditCircleIcon from "@mui/icons-material/Edit";
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';



const Page = () => {
  const [projets, setProjets] = useState([]);
  
  useEffect(() => {
    // get data from api
    getProjects();
  }, []);


  const getProjects =() => {
    getAllProjectsOfUser().then((response) => {
      setProjets(response.results);
    }).catch((error) => {
      console.log("error", error);
    })
  }



  const addProject = () => {
    console.log("add project");
  }

  return (
    <>
      <Head>
        <title>
          Projets | Data Guardian Pro
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="xl">
          <Grid
            mb={3}
          >
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Projets</Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Button
                  startIcon={<SvgIcon fontSize="small"><AddCircleIcon /></SvgIcon>}
                  variant="contained"
                  onClick={addProject}
                >
                  Ajouter
                </Button>
              </Stack>
            </Stack>
          </Grid>
     
          <Grid
            xs={12}
            md={12}
            lg={12}
          >
            <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    ID
                  </TableCell>
                  <TableCell>
                    Projet
                  </TableCell>
                  <TableCell>
                    Descriptif
                  </TableCell>
                  <TableCell>
                    Date de création
                  </TableCell>
                 <TableCell align='center'>
                    Actions
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
              
                {projets.map((row) => {
                  //data.slice(0, 5).

                  return (
                    <TableRow
                      hover
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>
                        {row.id}
                      </TableCell>
                      <TableCell>
                        {row.nom_projet}
                      </TableCell>
                      <TableCell>
                        {row.descriptif}
                      </TableCell>
                      <TableCell>
                        {row.date_creation}
                      </TableCell>
                      <TableCell align='center'>
                        <Button type="submit" color="secondary" > <SvgIcon fontSize="small"><EditCircleIcon /></SvgIcon></Button>
                        <Button type="submit" color="secondary"> <SvgIcon fontSize="small"><AnalyticsIcon /></SvgIcon></Button>
                        <Button type="submit" color="secondary"> <SvgIcon fontSize="small"><AddIcon /></SvgIcon></Button>

                      </TableCell>
                    
                    </TableRow>
                  );
                })}
              </TableBody>
              </Table>
              </TableContainer>
          </Grid>
        </Container>
      </Box>
    </>

  )
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
