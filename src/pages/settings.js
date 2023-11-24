import Head from 'next/head';
import { Box, Button, Card, Container, Unstable_Grid2 as Grid, TableBody, TableCell, TextField,Table,TableContainer,TableRow,TableHead, Typography} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';



const data =[
  {
    id: 'ND0001',
    category: 'Date',
    reg_expression: "^(([0-2][0-9]|3[0-1])-(0[0-9]|1[0-2])-[0-9]{4})$'')",
    commentaires: "Une date au format DD-MM-YYYY"
  },
  {
    id: 'ND0002',
    category: 'Espace',
    reg_expression: "^( ){2,}",
    commentaires: "Les espaces superflus"
  },
  {
    id: 'ND0003',
    category:'Email',
    reg_expression: "^[A-Za-z]+[A-Za-z0-9.]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$'')",
    commentaires: "Adresse mail valide"
  }
 

];


const Page = () => (
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
            lg={5}
          >

            <Card style={{ marginTop: '20px', padding: '20px' }}>

            <Typography variant='h6'>Ajouter des contraintes</Typography>
            <form style={{ marginTop: '20px' }}>
            <TextField
              label="ID regex"
              name="id_regex"

              margin="normal"
              style={{ marginTop: '20px', marginLeft: '10px'  }}
            />

            <TextField
              label="Category"
              name="category_regex"

              margin="normal"
              style={{ marginTop: '20px', marginLeft: '10px'  }}
            />

            <TextField
              label="Expression régulière"
              name="exp_regex"
              
              margin="normal"
              
              style={{ marginTop: '20px', marginLeft: '10px'  }}
            />

            <TextField
              label="Commentaire"
              name="comment_regex"
              margin="normal"

              style={{ marginTop: '20px', marginLeft: '10px' }}
            />

            <Box>
            <Button type="submit"variant="contained" color="primary" style={{ marginTop: '20px', marginLeft: '20px' }}> Enregister</Button>

            </Box>

            </form>
            </Card>
                      
          </Grid>

          <Grid
            xs={12}
            md={12}
            lg={7}
          >
          <Card style={{ marginTop: '20px', padding: '20px' }}>
          <Typography variant='h6'>Les contraintes</Typography>
          <TableContainer sx={{ flex: 1, overflow: 'auto', bgcolor: 'white', padding: 5, paddingTop: 0, marginTop: 2, zIndex: 999  }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID contrainte</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell>Expression régulière</TableCell>
              <TableCell>Commentaire</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

          {data.map((exp, index)=> (
            <TableRow key={index}>
              <TableCell>{exp.id}</TableCell>
              <TableCell>{exp.category}</TableCell>
              <TableCell>{exp.reg_expression}</TableCell>
              <TableCell>{exp.commentaires}</TableCell>
            </TableRow>
          ))}
          
                 
          </TableBody>
        </Table>
      </TableContainer>
            
          </Card>  
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
