import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      prenom: '',
      nom: '',
      email: '',
      identifiant: '',
      password: '',
      telephone: '',
      organisation: '',
      submit: null
    },
    validationSchema: Yup.object({

      prenom: Yup
        .string()
        .max(100)
        .min(2)
        .required("Le prénom est requis"),
      nom: Yup
        .string()
        .max(100)
        .min(2)
        .required("Le nom est requis"),
    
      identifiant: Yup
        .string()
        .max(100)
        .required("L'identifiant est requis"),
      password: Yup
        .string()
        .required('Le mot de passe est requis'),
      email: Yup
        .string()
        .email("Adresse mail est invalide")
        .max(100)
        .required("L'adresse email est requise"),
      telephone: Yup
        .string()
        .max(100)
        .required("Le numéro de téléphone est requis"),
      organisation: Yup
        .string()
        .max(100)
        
    }),
    onSubmit: async (values, helpers) => {
      try {

        console.log(values);
        await auth.signUp(values);
        router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          Créer un compte | Data Guardian Pro
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Créer un compte
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Avez vous déjà un compte?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Se connecter
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
               {formik.errors.submit && (

                  <Alert severity="error" variant="filled" sx={{ maxWidth: '100%', marginBottom: '10px' }}>{formik.errors.submit}</Alert>
                  )}
              <Stack spacing={3}>
              <TextField
                  error={!!(formik.touched.prenom && formik.errors.prenom)}
                  fullWidth
                  helperText={formik.touched.prenom && formik.errors.prenom}
                  label="Prénom"
                  name="prenom"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.prenom}
                />

                <TextField
                  error={!!(formik.touched.nom && formik.errors.nom)}
                  fullWidth
                  helperText={formik.touched.nom && formik.errors.nom}
                  label="Nom"
                  name="nom"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.nom}
                />

                <TextField
                  error={!!(formik.touched.identifiant && formik.errors.identifiant)}
                  fullWidth
                  helperText={formik.touched.identifiant && formik.errors.identifiant}
                  label="Identifiant"
                  name="identifiant"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.identifiant}
                />

              
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Mot de passe"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />

                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Adresse e-mail"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />

                <TextField
                  error={!!(formik.touched.telephone && formik.errors.telephone)}
                  fullWidth
                  helperText={formik.touched.telephone && formik.errors.telephone}
                  label="Numéro de téléphone"
                  name="telephone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.telephone}
                />

                <TextField
                  error={!!(formik.touched.organisation && formik.errors.organisation)}
                  fullWidth
                  helperText={formik.touched.organisation && formik.errors.organisation}
                  label="Organisation"
                  name="organisation"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.organisation}
                />
                
              </Stack>
                
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Enregistrer
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
