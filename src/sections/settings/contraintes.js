import { Box, Button, Card, Unstable_Grid2 as Grid, TableBody, TableCell, TextField,Table,TableContainer,TableRow,TableHead, Typography, Modal, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { add_new_constrainte, edit_constrainte, get_meta_all_constraintes, remove_constrainte } from 'src/api/services';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const fullPageModalStyle = {
    position: 'fixed',
    top: '30%',
    left: '50%',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 9999,
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white', 
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };


export const Contraintes = () => {

    const [openModal, setOpenModal] = useState(false);
  const [constraintes, setConstraintes] = useState([]);
  const [newContrainte, setNewContrainte] = useState({
    id: null,
    nom_contrainte : '',
    category: '',
    contrainte: '',
    commentaire: ''
  });

  const [action, setAction] = useState('NEW');
  const [openDialog, setOpenDialog] = useState(false);
  const [contrainteToRemove, setConstraintesToRemove] = useState(null);

  const closeDialog = () =>{
    setOpenDialog(false);
  }

  const handleOpenModal = () =>{
    setAction('NEW');
    setNewContrainte({
        id: null,
        nom_contrainte : '',
        category: '',
        contrainte: '',
        commentaire: ''
    })
    setOpenModal(true);
  }

  const handleChange = (e) =>{
    setNewContrainte({
      ...newContrainte,
      [e.target.name] : e.target.value
    })

  }

  const handleEditContainte = (containte) =>{

    setAction('EDIT');
    setNewContrainte(containte);
    setOpenModal(true);
  }

  const handleDeleteContainte = async () =>{
    
    if (contrainteToRemove != null){
        await remove_constrainte(contrainteToRemove).then((response)=>{
            getAllMetaConstraintes();
            setConstraintesToRemove(null);
            closeDialog();
        })
    }
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

    if (action == 'NEW') {
        await add_new_constrainte(newContrainte).then(response=>{
            getAllMetaConstraintes();
            setNewContrainte({
                id: null,
                nom_contrainte : '',
                category: '',
                contrainte: '',
                commentaire: ''
            })
            handleCloseModal();

        })
    }else if(action == 'EDIT'){
        await edit_constrainte(newContrainte).then(response =>{
            getAllMetaConstraintes();
            setNewContrainte({
                id: null,
                nom_contrainte : '',
                category: '',
                contrainte: '',
                commentaire: ''
            })
            handleCloseModal();
        })
    }
   


  }

  const handleOpenDeletePopup = (contrainte) =>{

    console.log(contrainte);
    setConstraintesToRemove(contrainte);
    setOpenDialog(true);
  }
  

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const getAllMetaConstraintes = async() =>{
    await get_meta_all_constraintes().then((response)=>{
      setConstraintes(response.results);
    })
  }


  useEffect(()=>{
    getAllMetaConstraintes();
  }, [])

  return (
    <>
        
         <Card style={{ padding: '10px' }}>
          <Box sx={{display: 'flex', justifyContent:'space-between'}}>
          <Typography variant='h6'> Les contraintes</Typography>
          <Button onClick={handleOpenModal}>
            <AddIcon /> Ajouter
          </Button>
          </Box>
          <TableContainer sx={{ flex: 1, overflow: 'auto', bgcolor: 'white', padding: 5, paddingTop: 0, marginTop: 2, zIndex: 999  }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell>Expression régulière</TableCell>
              <TableCell>Commentaire</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

          {constraintes.map((exp)=> (
            <TableRow key={exp.id}>
              <TableCell>{exp.nom_contrainte}</TableCell>
              <TableCell>{exp.category}</TableCell>
              <TableCell>{exp.contrainte}</TableCell>
              <TableCell>{exp.commentaire}</TableCell>
              <TableCell>
               <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
               <Button onClick={() => handleEditContainte(exp)}  style={{color: 'green'}}><EditIcon fontSize='1rem'/></Button>
                <Button onClick={() => handleOpenDeletePopup(exp)}  style={{color: 'red'}}><DeleteIcon fontSize='1rem'/></Button>
               </div>
              </TableCell>
            </TableRow>
          ))}
          
                 
          </TableBody>
        </Table>
      </TableContainer>
            
    </Card> 

    <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={fullPageModalStyle}>
        <Card style={{padding: '20px', width: '100%' }}>

          <Typography variant='h6'>Ajouter des contraintes</Typography>
          <form style={{ marginTop: '20px', width: '100%', paddingRight: '20px'}} onSubmit={handleSubmit}>

          <Grid
            xs={12}
            md={6}
            lg={6}
          ><TextField
            label="Nom"
            name="nom_contrainte"
            value={newContrainte.nom_contrainte}
            onChange={handleChange}
            fullWidth
            margin="normal"
            style={{marginLeft: '10px' }}
          />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={6}
          >
            <TextField
              label="Categorie"
              name="category"
              value={newContrainte.category}
              onChange={handleChange}
              fullWidth
              margin="normal"
              style={{marginLeft: '10px'  }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={6}
          >
             <TextField
                label="Expression régulière"
                name="contrainte"
                value={newContrainte.contrainte}
                onChange={handleChange}
                margin="normal"
                fullWidth
                style={{marginLeft: '10px'  }}
              />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={6}
          >
            <TextField
              label="Commentaire"
              name="commentaire"
              value={newContrainte.commentaire}
              onChange={handleChange}
              margin="normal"
              fullWidth
              style={{ marginLeft: '10px' }}
            />
          </Grid>

          <Box>
            <Button type="submit"variant="contained" color="primary" style={{ marginTop: '20px', marginLeft: '20px' }}> Enregister</Button>
          </Box>
          </form>
        </Card>
      </Box>
    </Modal>
    

    <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>Supprimer</DialogTitle>
        <DialogContent>
          <p>Voullez-vous supprimer la contrainte {contrainteToRemove ? contrainteToRemove.nom_contrainte :  ''}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>
            Annuler
          </Button>
          <Button onClick={handleDeleteContainte}  variant="contained" color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )


}