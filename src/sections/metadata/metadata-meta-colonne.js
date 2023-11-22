
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
import React,{ useState } from 'react';

import { fullPageModalStyle, modalHeaderStyle} from "./style-popup";


export const MetaColonne = (props) => {
  const {columnsNames = [],data = []} = props;

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
      <CardHeader title='Méta colonne' />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {columnsNames.map((colName, index)=> (
                  <TableCell size='string' key={index}>
                  {colName}
                  </TableCell>
                ))}
                
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0, 5).map((row) => {
                // const createdAt = format(order.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={row.id_meta_colonne}
                  >
                    <TableCell>
                        {row.id_meta_colonne}
                    </TableCell>
                    <TableCell>
                        {row.id_meta_table}
                    </TableCell>
                    <TableCell>
                        {row.id_meta_special_car}
                    </TableCell>
                    <TableCell>
                        {row.id_table_origin}
                    </TableCell>
                    <TableCell>
                        {row.nom_colonne}
                    </TableCell>
                    <TableCell>
                        {row.type_donnee}
                    </TableCell>
                    <TableCell>
                        {row.date_creation}
                    </TableCell>
                    <TableCell>
                        {row.date_diagnostic}
                    </TableCell>
                    <TableCell>
                        {row.nombre_valeur}
                    </TableCell>
                    <TableCell>
                        {row.nombre_valeur_manquante}
                    </TableCell>
                    <TableCell>
                        {row.nombre_outliers}
                    </TableCell>
                    <TableCell>
                        {row.semantique}
                    </TableCell>
                    <TableCell>
                        {row.langue}
                    </TableCell> 
                    <TableCell>
                        {row.nombre_anomalie}
                    </TableCell>
          
                    <TableCell>
                        {row.nombre_majuscules}
                    </TableCell>
                    <TableCell>
                        {row.nombre_miniscules}
                    </TableCell>
                    <TableCell>
                        {row.nombre_initcap}
                    </TableCell>
                    <TableCell>
                        {row.col_min}
                    </TableCell>
                    <TableCell>
                        {row.col_max}
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
          <Typography variant="h6">Méta colonne</Typography>
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
            {data.map((row) => (
              <TableRow hover key={row.id_meta_colonne}>
                <TableCell>{row.id_meta_colonne}</TableCell>
                <TableCell>{row.id_meta_table}</TableCell>
                <TableCell>{row.id_meta_special_car}</TableCell>
                <TableCell>{row.id_table_origin}</TableCell>
                <TableCell>{row.nom_colonne}</TableCell>
                <TableCell>{row.type_donnee}</TableCell>
                <TableCell>{row.date_creation}</TableCell>
                <TableCell>{row.date_diagnostic}</TableCell>
                <TableCell>{row.nombre_valeur}</TableCell>
                <TableCell>{row.nombre_valeur_manquante}</TableCell>
                <TableCell>{row.nombre_outliers}</TableCell>
                <TableCell>{row.semantique}</TableCell>
                <TableCell>{row.langue}</TableCell>
                <TableCell>{row.nombre_anomalie}</TableCell>
                <TableCell>{row.nombre_majuscules}</TableCell>
                <TableCell>{row.nombre_miniscules}</TableCell>
                <TableCell>{row.nombre_initcap}</TableCell>
                <TableCell>{row.col_min}</TableCell>
                <TableCell>{row.col_max}</TableCell>
              </TableRow>
            ))}
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