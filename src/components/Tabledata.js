import React, { useState, useEffect } from 'react';
import { fetchTableData } from '../api/dataService';

const DataTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTableData();
        setTableData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la table:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Table de la Base de Données</h2>
      <table>
        <thead>
          <tr>
            <th>Colonne 1</th>
            <th>Colonne 2</th>
            {/* Ajoutez d'autres en-têtes de colonnes  */}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.column1}</td>
              <td>{row.column2}</td>
              {/* Ajoutez d'autres cellules  */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;