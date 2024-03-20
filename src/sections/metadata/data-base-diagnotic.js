import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const ClientsTable = ({ clients, diagnostics }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Retour à la première page après changement du nombre de lignes par page
  };

  if (!Array.isArray(clients) || clients.length === 0) {
    return null;
  }

  const columnNames = Object.keys(clients[0]);
  const idKey = columnNames.length > 0 ? columnNames[0] : null;


  const getCellStyle = (client, columnName) => {
    const invalidValues = [null, 'null', '-', '!', '?', '', ' ', '  ', 'inexistant', 'INEXISTANT', 'Inexistant', 'inconnu', 'INCONNU', 'Inconnu'];
    if (invalidValues.includes(client[columnName])) {
      return { backgroundColor: '#eb4d4b', color: 'white' };
    }    
    return {}; // default style
  };
  const getCellStyle2 = (client, columnName) => {
    const isOutlier = diagnostics.some(diag => {
      return diag.id_ligne == client[idKey] && diag.nom_colonne.toUpperCase() == columnName.toUpperCase()  && diag.anomalie.toUpperCase() == 'OUTLIER';
    });
    if (isOutlier) {
      return { backgroundColor: '#d35400', color: 'white' }; 
    }
    return {};
  };

  const getRowStyle = (idLigne) => {
    const hasDuplicate = diagnostics.some(diag => diag.id_ligne === idLigne && diag.anomalie === 'DOUBLONS_SIMILAIRES');
    return hasDuplicate ? { backgroundColor: '#0097e6', color: 'white' } : {};
  };
  return (
    <>
      <TableContainer component={Paper} style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {columnNames.map(name => (
                <TableCell key={name} style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(client => (
              <TableRow key={client[idKey]} style={getRowStyle(client[idKey])}>
                {columnNames.map(columnName => (
                  <TableCell key={columnName} style={{ ...getCellStyle(client, columnName), ...getCellStyle2(client, columnName), maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {client[columnName]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={clients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ClientsTable;