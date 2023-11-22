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
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import React, { useState } from 'react';

import { fullPageModalStyle, modalHeaderStyle } from "../metadata/style-popup";
export const DataCard = (props) => {
  const { data = [] } = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader title='Data Card' />
        <Scrollbar sx={{ flexGrow: 1 }}>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableBody>
                {data.slice(0, 5).map((row, rowIndex) => (
                  <TableRow hover key={rowIndex} onClick={handleOpen}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <Divider />
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Typography>{data.length} lignes au total</Typography>
          <Button
            color="inherit"
            endIcon={<SvgIcon fontSize="small"><ArrowRightIcon /></SvgIcon>}
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
            <Typography variant="h6">Data Card</Typography>
          </Box>
          <TableContainer sx={{ flex: 1, overflow: 'auto', bgcolor: 'white', padding: 5, paddingTop: 0, zIndex: 999 }}>
            <Table>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow hover key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={modalHeaderStyle}>
            <Typography>{data.length} lignes au total</Typography>
            <Button color="inherit" onClick={handleClose}>Fermer</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
