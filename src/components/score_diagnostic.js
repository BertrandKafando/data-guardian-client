import GppGoodIcon from '@mui/icons-material/GppGood';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';

export const ScoreDiagnostic = (props) => {
  const { value, sx } = props;

  let color = '';
  let bg_color = '';
  let etat = 'Bon';
  let icon = <GppGoodIcon />; 
  if (value < 50) {
    color = 'error';
    bg_color = 'error.main';
    etat = 'Critique';
    icon = <GppMaybeIcon />;

  } else if (value >= 50 && value < 70) {
    color = 'warning';
    bg_color = 'warning.main';
    etat = 'Moyen';
    icon = <NewReleasesIcon />;
  } else {
    color = 'success';
    bg_color = 'success.main';
    etat = 'Bon';
    icon = <GppGoodIcon />;
  }

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
            >
              Score diagnostic
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
  <Typography variant="h4">
    {Math.round(value)}%
  </Typography>
 
</Box>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: bg_color,
              height: 35,
              width: 35
            }}
          >
            <SvgIcon>
              {icon} 
            
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <LinearProgress
            value={value}
            variant="determinate"
            color={color}
          />
        </Box>
        <Typography variant="caption" sx={{ marginLeft: 'auto'}}>
    Niveau: <Badge color={color} badgeContent={etat} sx={{ marginLeft: '30px'}} ></Badge>
  </Typography>
      </CardContent>
    </Card>
  );
};

