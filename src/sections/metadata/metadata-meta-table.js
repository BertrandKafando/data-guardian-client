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
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useState } from 'react';
import { fullPageModalStyle, modalHeaderStyle } from "./style-popup";





export const MetaTable = (props) => {
  const {columnsNames = [],data = []} = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatDateString = (originalDateString) => {
    const formattedDate = new Date(originalDateString).toLocaleString();
    return formattedDate;
  };


  return (
    <>
    <Card>
      <CardHeader title='Méta table' />
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
                        {row.nom_table}
                    </TableCell>
                    <TableCell>
                        {row.nombre_colonnes}
                    </TableCell>
                    <TableCell>
                        {row.nombre_lignes}
                    </TableCell>
                    <TableCell>
                        {row.nombre_doublons}
                    </TableCell>
                    <TableCell>
                        {formatDateString(row.date_creation)}
                    </TableCell>
                    {/* <TableCell>
                        {row.date_diagnostic}
                    </TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'space-between' }}>
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
          <Typography variant="h6">Méta table</Typography>
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
                        {row.nom_table}
                    </TableCell>
                    <TableCell>
                        {row.nombre_colonne}
                    </TableCell>
                    <TableCell>
                        {row.nombre_ligne}
                    </TableCell>
                    <TableCell>
                        {row.date_creation}
                    </TableCell>
                    <TableCell>
                        {row.date_diagnostic}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
      
     
    </Modal>
    </>
  );
};

