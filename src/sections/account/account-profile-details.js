import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Alert
} from '@mui/material';
import { updateUserInfo } from 'src/api/auth.service';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  },
  {
    value: 'los-angeles',
    label: 'Los Angeles'
  }
];

export const AccountProfileDetails = (props) => {

  const {userInfo, setUserInfo} = props;
  const [values, setValues] = useState(userInfo);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
      setError(false);
      setSuccess(false);
    },
    []
  );

  const handleChangeIdentifiant = useCallback(
    (event) => {
      setError(false);
      setSuccess(false);
      setValues((prevState) => ({
        ...prevState,
        compte: {
          ...userInfo.compte,
          identifiant: event.target.value
        }
      }));
      setError(false);
      setSuccess(false);
    },
    []
  );

  const handleSubmit = async(e) =>{
    e.preventDefault();
    await updateUserInfo(values).then((response)=>{
      setUserInfo(response);
      setSuccess("Profile mis à jour");
    }).catch((error)=>{
      setError(error?.response?.data);
    })
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="les informations peuvent être modifier"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            {error && (
            <Alert severity='error' >{error}</Alert>

            )}
             {success && (
            <Alert severity='success' >{success}</Alert>

            )}
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Prénom"
                  name="prenom"
                  onChange={handleChange}
                  required
                  value={values.prenom}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Nom"
                  name="nom"
                  onChange={handleChange}
                  required
                  value={values.nom}
                />
              </Grid>
             
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Identifiant"
                  name="identifiant"
                  onChange={handleChangeIdentifiant}
                  required
                  value={values.compte.identifiant}
                />
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Adresse e-mail"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Numéro de téléphone"
                  name="telephone"
                  onChange={handleChange}
                  type="number"
                  value={values.telephone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Organisation"
                  name="organisation"
                  onChange={handleChange}
                  required
                  value={values.organisation}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type='submit' variant="contained">
            Enregistrer
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
