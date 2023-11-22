import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Modal,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { fullPageModalStyle, modalHeaderStyle, closeButtonStyle } from "./style-popup";


export const MetaSpecialCar = (props) => {
  const {columnsNames = [],data = []} = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <><Card>
      <CardHeader title='Méta spécial caractères' />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {columnsNames.map((colName, index)=> (
                  <TableCell key={index}>
                  {colName}
                  </TableCell>
                ))}
                
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0,5).map((row) => {
                // const createdAt = format(order.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={row.id}
                  >
                    <TableCell>
                        {row.id}
                    </TableCell>
                    <TableCell>
                        {row.caracteres_speciaux}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Typography>{data.length} lignes au total</Typography>
        <Button
            color="inherit"
            endIcon={(
            <SvgIcon fontSize="small">
                <ArrowRightIcon />
            </SvgIcon>
            )}
            size="small"
            variant="text"

            onClick={handleOpen}
        >
            Voir tous
        </Button>
    </CardActions>  
    </Card>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={fullPageModalStyle}>
      <Box sx={modalHeaderStyle}>
          <Typography variant="h6">Méta spécial caractères</Typography>
        </Box>
      <TableContainer sx={{ flex: 1, overflow: 'auto', bgcolor: 'white', padding: 5, paddingTop: 0, zIndex: 999  }}>
        <Table>
          <TableHead>
            <TableRow>
              {columnsNames.map((colName, index) => (
                <TableCell size="string" key={index} sx={{ position: 'sticky', top: 0, bgcolor: 'white', zIndex: 999 }}>{colName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {data.map((row) => {
                // const createdAt = format(order.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={row.id}
                  >
                    <TableCell>
                        {row.id}
                    </TableCell>
                    <TableCell>
                        {row.caracteres_speciaux}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={modalHeaderStyle}>
          <Typography>{data.length} lignes au total</Typography>
          <Button
              color="inherit"
              onClick={handleClose}
          >
          Fermer
        </Button>
      </Box>
      </Box>
    </Modal>
    </>
    
  );
};

