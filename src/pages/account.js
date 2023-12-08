import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { useAuth } from 'src/hooks/use-auth';
import { useEffect, useState } from 'react';
import { getUserInfo } from 'src/api/auth.service';



const Page = () => {

  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // get data from api
     getUserInfo(user?.id).then((response)=>{
      setUserInfo(response);
    }).catch((error)=>{
      console.log(error);
    });
  }, []);

  return (<>
    <Head>
      <title>
        Compte | Data Guardian
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Compte
            </Typography>
          </div>
          {userInfo && (
            <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile userInfo={userInfo}/>
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails userInfo={userInfo} setUserInfo={setUserInfo} />
              </Grid>
            </Grid>
          </div>
          )}

         
        </Stack>
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
