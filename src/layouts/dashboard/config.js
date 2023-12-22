import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import AddCircleIcon from "@mui/icons-material/AddCircle";

import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import { Settings } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Accueil',
    path: '/home',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Projets',
    path: '/project',
    icon: (
      <SvgIcon fontSize="small">
        <AddCircleIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Compte',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),

  },
  {
    title: 'Paramètres',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <Settings />
      </SvgIcon>
    )
  }
];
