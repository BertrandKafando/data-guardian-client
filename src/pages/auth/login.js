import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('email');
  const formik = useFormik({
    initialValues: {
      identifiant: 'amadou',
      password: '123456',
      submit: null
    },
    validationSchema: Yup.object({
      identifiant: Yup
        .string()
        .max(100)
        .required("l'identifiant est requis"),
      password: Yup
        .string()
        .max(100)
        .required('Mot de passe requis')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signIn(values.identifiant, values.password);
        helpers.setStatus({ success: true });
        router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });


  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );


  return (
    <>
      <Head>
        <title>
          Se connecter | Data Guardian Pro
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
              Se connecter
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
               Vous n'avez pas de compte ?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  S'incrire
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
                    error={!!(formik.touched.identifiant && formik.errors.identifiant)}
                    fullWidth
                    helperText={formik.touched.identifiant && formik.errors.identifiant}
                    label="Votre identifiant"
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
                </Stack>
              
               
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                 Se connecter
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
