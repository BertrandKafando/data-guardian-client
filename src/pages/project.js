import React from 'react'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Card, Typography } from '@mui/material';
import Head from 'next/head';
import { Box, Container, Grid, Table, TableBody, TableHead, TableRow, TableCell, Button, Stack, SvgIcon, TableContainer } from '@mui/material';
import { useState, useEffect } from 'react';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getAllProjectsOfUser,createProject,deleteProject, editProject } from 'src/api/project';
import AnalyticsIcon from "@mui/icons-material/Analytics";
import EditCircleIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useAuth } from 'src/hooks/use-auth';




const Page = () => {
  const {user} = useAuth();
  const [projets, setProjets] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectData, setProjectData] = useState({ nom_projet: '', descriptif: '' });

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);

   const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editableProject, setEditableProject] = useState({ id: null, nom_projet: '', descriptif: '' });



  const router =  useRouter();

  
  useEffect(() => {
    // get data from api
    getProjects();
  }, []);


  const getProjects =() => {
    getAllProjectsOfUser().then((response) => {

      console.log(response);
      setProjets(response?.results);
    }).catch((error) => {
      console.log("error", error);
    })
  };

const navAssessment =(id) =>{
  router.push({
    pathname : '/assessment',
    query: {id_projet : id}
  });
};

const navResult=() =>{
  router.push('/metadata');
}

  function addProject() {
    setIsDialogOpen(true);
    //console.log("add project");
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    // You can reset the projectData state here if needed
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveProject = async () => {
    try {
      
      const createdProject = await createProject(projectData.nom_projet, projectData.descriptif, user.id);
  
      setIsDialogOpen(false);
  
      // Optionally, you can update the projects list by fetching the updated list
      getProjects();
  
      console.log('Project crée avec succés:', createdProject);
    } catch (error) {
      console.error('Erreur de creation de project:', error);
      // Handle the error (e.g., display an error message)
    }
  };

  const handleDeleteProject = (projectId) => {
    setDeleteProjectId(projectId);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteProjectId) {
        await deleteProject(deleteProjectId);
        // Update the projects list after deletion
        getProjects();
        setDeleteConfirmationOpen(false);
        setDeleteProjectId(null);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      // Handle the error (e.g., display an error message)
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setDeleteProjectId(null);
  };

  const handleEditProject = (project) => {
    setEditableProject(project);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      // Appelez votre fonction d'édition ici
      await editProject(editableProject.id, {
        nom_projet: editableProject.nom_projet,
        descriptif: editableProject.descriptif,
      });
  
      // Fermez la boîte de dialogue après avoir enregistré les modifications
      setEditDialogOpen(false);
      // Rafraîchissez la liste des projets
      getProjects();
    } catch (error) {
      console.error('Error editing project:', error);
      // Gérez les erreurs ici
    }
  };

  const handleCancelEdit = () => {
    setEditDialogOpen(false);
    // Réinitialisez les données éditables si nécessaire
    setEditableProject({ id: null, nom_projet: '', descriptif: '' });
  };



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
                        {row.nom_projet}
                      </TableCell>
                      <TableCell>
                        {row.descriptif}
                      </TableCell>
                      <TableCell>
                        {row.date_creation}
                      </TableCell>
                      <TableCell align='center'>
                        <Button type="submit" color="primary" onClick={() => handleEditProject(row)}> <SvgIcon fontSize="small"><EditCircleIcon /></SvgIcon></Button>
                        <Button type="submit" color="primary" onClick={navResult}> <SvgIcon fontSize="small"><AnalyticsIcon /></SvgIcon></Button>
                        <Button type="submit" color="primary" onClick={() => navAssessment(row.id) }> <SvgIcon fontSize="small"><AddIcon /></SvgIcon></Button>
                        <Button type="submit" color="primary" onClick={() => handleDeleteProject(row.id)}> <SvgIcon fontSize="small"><DeleteIcon /></SvgIcon></Button>

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

      {/* Dialog for adding a new project */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Ajouter un nouveau projet</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom du projet"
            name="nom_projet"
            value={projectData.nom_projet}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descriptif"
            name="descriptif"
            value={projectData.descriptif}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSaveProject} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation dialog */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleCancelDelete}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirmation de la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer ce projet ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

       {/* Dialogue d'édition */}
       <Dialog
        open={editDialogOpen}
        onClose={handleCancelEdit}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Modifier le projet</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom du projet"
            fullWidth
            margin="normal"
            value={editableProject.nom_projet}
            onChange={(e) => setEditableProject({ ...editableProject, nom_projet: e.target.value })}
          />
          <TextField
            label="Descriptif"
            fullWidth
            margin="normal"
            value={editableProject.descriptif}
            onChange={(e) => setEditableProject({ ...editableProject, descriptif: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>


    </>

  )
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
