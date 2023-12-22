import React from 'react'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Card, Typography } from '@mui/material';
import Head from 'next/head';
import { Box, Container, Stack } from '@mui/material';


const Page = () => {
  return (
    <>
      <Head>
        <title>
          Home | Data Guardian Pro
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
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box
              sx={{
                mb: 3,
                textAlign: 'center'
              }}
            >
              <img
                alt="Under development"
                src="/assets/logos/logodg.png"
                style={{
                  display: 'inline-block',
                  maxWidth: '100%',
                  width: 900
                }}
              />
            </Box>
            <Typography
              align="center"
              sx={{ mb: 3 }}
              variant="h3"
            >
              Bienvenue sur Data Guardian Pro
            </Typography>
            <Typography
              align="center"
              color="text.secondary"
              variant="body1"
              sx={{
                position: 'relative',
                animation: 'bounceText 5s linear infinite', // Animation de 5 secondes en boucle
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                '@keyframes bounceText': {
                  '0%, 100%': { left: '0' }, // Début et fin de l'animation (position initiale)
                  '50%': { left: 'calc(100% - 100vw)' }, // Point médian de l'animation (position maximale à droite)
                },
              }}
            >
              Des Données  irréprochables pour des processus parfaits.
            </Typography>

          </Box>
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



