import Head from 'next/head';
import { Box, Button, Card, Container, Unstable_Grid2 as Grid, TableBody, TableCell, TextField,Table,TableContainer,TableRow,TableHead, Typography, Modal} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { add_new_constrainte, get_meta_all_constraintes } from 'src/api/services';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Contraintes } from 'src/sections/settings/contraintes';

const Page = () => {
  
  return(
  <>
    <Head>
      <title>
        Métadonnées | Data Guardian Pro
      </title>
    </Head>

    <Box
      component="main"
      sx={{
        flexGrow: 1
      }}
    >

   
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            md={12}
            lg={7}
          >
              <Contraintes />
          </Grid>
        </Grid>
      </Container>
    </Box>

  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
