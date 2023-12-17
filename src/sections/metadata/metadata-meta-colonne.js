import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


export const MetaColonne = (props) => {
  const {columnsNames = [],data = [], nombre_lignes = 0, count_anomalies} = props;

  const [open, setOpen] = useState(false);

  const [openAnomalie, setOpenAnomalie] = useState(false);
  const [columnAnomalies, setColumnAnomalies] = useState([]);
  const [columnNameSelected, setColumnNameSelected] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAnomalies = (col_name, meta_anomalie) => {
    setOpenAnomalie(true);
    setColumnAnomalies(meta_anomalie);
    setColumnNameSelected(col_name);
  }

  const handleCloseAnomalie = ()=>{
    setOpenAnomalie(false);
  }



  const formatDateString = (originalDateString) => {
    const formattedDate = new Date(originalDateString).toLocaleString();
    return formattedDate;
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
                        {row.meta_table}
                    </TableCell>
                    {/* <TableCell>
                        {row.id_meta_special_car}
                    </TableCell>
                    <TableCell>
                        {row.id_table_origin}
                    </TableCell> */}
                    <TableCell>
                        {row.nom_colonne}
                    </TableCell>
                    <TableCell>
                        {row.type_donnees}
                    </TableCell>
                    <TableCell>
                        {formatDateString(row.date_creation)}
                    </TableCell>
                    <TableCell>
                        {formatDateString(row.date_diagnostic)}
                    </TableCell>
                    <TableCell>
                        {row.nombre_valeurs}
                    </TableCell>
                    <TableCell>
                        {row.nombre_valeurs_manquantes}
                    </TableCell>
                    <TableCell>
                        {row.nombre_outliers}
                    </TableCell>
      
                    <TableCell>
                        {row.nombre_anomalies}
                        <Button onClick={()=> handleAnomalies(row.nom_colonne, row.meta_anomalie)}><RemoveRedEyeIcon /></Button>
                    </TableCell>
          
                    <TableCell>
                        {row.nombre_majuscules}
                    </TableCell>
                    <TableCell>
                        {row.nombre_minuscules}
                    </TableCell>
                    <TableCell>
                        {row.nombre_init_cap}
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
      </CardActions>
    </Card>

    <Dialog open={openAnomalie} onClose={handleCloseAnomalie}>
        <DialogContent>
          <Typography>Anomalies de la colonne: {columnNameSelected}</Typography>
        <Table>
            <TableHead>
              <TableRow>
              <TableCell size='string'> Nom de l'anomalie</TableCell>
              <TableCell size='string'> Valeurs trouvés</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {columnAnomalies
                .filter(anomalie => anomalie.valeur_trouvee !== null)
                .map((anomalie, index) => (
                  <TableRow key={index}>
                    <TableCell>{anomalie.nom_anomalie}</TableCell>
                    <TableCell>{anomalie.valeur_trouvee}</TableCell>
                  </TableRow>
                ))}


            </TableBody>
          </Table>
        </DialogContent>
    </Dialog>
    </>
  );
};
