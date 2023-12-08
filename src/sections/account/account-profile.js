import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';


export const AccountProfile = (props) => {
  const {userInfo} = props;

  return (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src='/assets/avatars/avatar.png'
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {userInfo.prenom} {userInfo.nom}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          @{userInfo.compte.identifiant}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          Role: {userInfo.role.nom_role}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
   
  </Card>
)};
