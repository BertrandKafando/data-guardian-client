import React, { useState , useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Select, MenuItem , Typography, Card, CardHeader, CardContent} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { MetaTable } from 'src/sections/metadata/metadata-meta-table';
import { MetaColonne } from 'src/sections/metadata/metadata-meta-colonne';
import { select } from 'd3';
import * as d3 from 'd3';
import Chart from 'chart.js/auto';
import { getMetaColonne, getMetaTable } from 'src/api/metadata.service';
import { useRouter } from 'next/router';
import PieGraph from 'src/sections/metadata/pie-graph';
import { height, width } from '@mui/system';

const Page = () => {
  const itemsPerPage = 5;
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [currentColonnePage, setCurrentColonnePage] = useState(1);
  const [metaTableData, setMetaTableData] = useState([]);
  const [metaColonneData, setMetaColonneData] = useState([]);
  const [nombreValeurs, setNombreValeurs] = useState(0);


  const router = useRouter();
  const { bd_id } = router.query;

  // const metaTableData = [
  //   {
  //     id: 1,
  //     nom_table: 'CLIENTS',
  //     nombre_colonne: 10,
  //     nombre_ligne: 124,
  //     date_creation: "2023-11-18",
  //     date_diagnostic:"2023-11-21"
  //   },
  //   {
  //     id: 2,
  //     nom_table: 'MAGASIN',
  //     nombre_colonne: 5,
  //     nombre_ligne: 12,
  //     date_creation: "2023-11-18",
  //     date_diagnostic:"2023-11-21"
  //   },
  //   {
  //     id: 3,
  //     nom_table: 'ARTICLES',
  //     nombre_colonne: 8,
  //     nombre_ligne: 548,
  //     date_creation: "2023-11-18",
  //     date_diagnostic:"2023-11-21"
  //   },
  //   {
  //     id: 3,
  //     nom_table: 'ARTICLES',
  //     nombre_colonne: 8,
  //     nombre_ligne: 548,
  //     date_creation: "2023-11-18",
  //     date_diagnostic:"2023-11-21"
  //   },
  //   {
  //     id: 3,
  //     nom_table: 'ARTICLES',
  //     nombre_colonne: 8,
  //     nombre_ligne: 548,
  //     date_creation: "2023-11-18",
  //     date_diagnostic:"2023-11-21"
  //   },
  //   {
  //     id: 3,
  //     nom_table: 'ARTICLES',
  //     nombre_colonne: 8,
  //     nombre_ligne: 548,
  //     date_creation: "2023-11-18",
  //     date_diagnostic:"2023-11-21"
  //   },
  //   {
  //     id: 3,
  //     nom_table: 'ARTICLES',
  //     nombre_colonne: 8,
  //     nombre_ligne: 548,
  //     date_creation: "2023-11-18",
  //     date_diagnostic:"2023-11-21"
  //   },
  //   {
  //     id: 3,
  //     nom_table: 'ARTICLES',
  //     nombre_colonne: 8,
  //     nombre_ligne: 548,
  //     date_creation: "2023-11-18",
  //     date_diagnostic:"2023-11-21"
  //   },
  //   {
  //     id: 3,
  //     nom_table: 'ARTICLES',
  //     nombre_colonne: 8,
  //     nombre_ligne: 548,
  //     date_creation: "2023-11-18",
  //     date_diagnostic:"2023-11-21"
  //   },
  //   {
  //     id: 3,
  //     nom_table: 'ARTICLES',
  //     nombre_colonne: 8,
  //     nombre_ligne: 548,
  //     date_creation: "2023-11-18",
  //     date_diagnostic:"2023-11-21"
  //   }
  // ];

  // const metaColonneData = [
  //   {
  //     id_meta_colonne : 1,
  //     id_meta_table: 1,
  //     id_meta_special_car: 1, 
  //     id_table_origin: "CODCLI",
  //     nom_colonne: "NOMCLI",
  //     type_donnee: "Varchar",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: "CD001",
  //     col_max: "FG0A01"
  //   },
  //   {
  //     id_meta_colonne :2,
  //     id_meta_table: 2,
  //     id_meta_special_car: 2, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "LOCATION",
  //     type_donnee: "Varchar",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 12,
  //     nombre_valeur_manquante: 3,
  //     nombre_outliers: 0,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 12,
  //     nombre_majuscules: 12,
  //     nombre_miniscules: 0,
  //     nombre_initcap: 0,
  //     col_min: "Dakar",
  //     col_max: "Epinay sur seine"
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   },
  //   {
  //     id_meta_colonne : 3,
  //     id_meta_table: 3,
  //     id_meta_special_car: 3, 
  //     id_table_origin: "REFART",
  //     nom_colonne: "PRIX",
  //     type_donnee: "NUMBER",
  //     date_creation: "22/11/2023",
  //     date_diagnostic: "22/11/2023",
  //     nombre_valeur: 42,
  //     nombre_valeur_manquante: 17,
  //     nombre_outliers: 3,
  //     semantique: null,
  //     langue: "FR",
  //     nombre_anomalie: 24,
  //     nombre_majuscules: 24,
  //     nombre_miniscules: 24,
  //     nombre_initcap: 24,
  //     col_min: 12.5,
  //     col_max: 158.99
  //   }
  // ];

  const handleChangeTablePage = (event, newPage) => {
    setCurrentTablePage(newPage);
  };

  const handleChangeColonnePage = (event, newPage) => {
    setCurrentColonnePage(newPage);
  };

  const tableStartIndex = (currentTablePage - 1) * itemsPerPage;
  const tableEndIndex = tableStartIndex + itemsPerPage;

  const colonneStartIndex = (currentColonnePage - 1) * itemsPerPage;
  const colonneEndIndex = colonneStartIndex + itemsPerPage;

  const [selectedTableId, setSelectedTableId] = useState(null);
  const [selectedColumnName, setSelectedColumnName] = useState(null);
  const [selectedTableInfo, setSelectedTableInfo] = useState(null);

  const [missingValuesPieGraphData, setMissingValuesPieGraphData] = useState([]);
  const [anomaliesPieGraphData, setAnomaliesPieGraphData] = useState([]);
  const [invalidPieGraphData, setInvalidPieGraphData] = useState([]);

  const getColumnStatistic = (metaColsData, columnName) => {
    const columnNameData = metaColsData.filter(col => col.nom_colonne == columnName);

    if (columnNameData.length > 0){
      const selectedMetaColonne = columnNameData[0];
      
       const barGraphData = [
      {
        label: 'Anomalies',
        value: count_anomalies(selectedMetaColonne.meta_anomalie),
      },
      {
        label: 'Valeurs Manquantes',
        value: selectedMetaColonne.nombre_valeurs_manquantes,
      },
      {
        label: 'Valeurs Valides',
        value:
          selectedMetaColonne.nombre_valeurs -
          (count_anomalies(selectedMetaColonne.meta_anomalie) -
            selectedMetaColonne.nombre_valeurs_manquantes),
      },
      {
        label: 'Valeurs invalides',
        value:
        count_anomalies(selectedMetaColonne.meta_anomalie) -
          selectedMetaColonne.nombre_valeurs_manquantes,
      },
    ];

  
    createBarGraph(barGraphData);

  
    }
  }

  const handleColumnSelect = (event) => {
    const columnName = event.target.value;
    setSelectedColumnName(columnName);

    getColumnStatistic(metaColonneData, columnName);

    

     
  };

  
  const getMetaTableData = async(bd_id) => {
    await getMetaTable(bd_id).then((data) => {
      const meta_tables = data?.results;
      if (meta_tables.length > 0){
        setMetaTableData(data?.results);
        setNombreValeurs(meta_tables[0].nombre_lignes);
        meta_tables.forEach(async(meta_table) => {
          await getMetaColonneData(meta_table.id, meta_tables[0].nombre_lignes);
        });
      }
        
      

    }).catch((error)=>{
      console.log(error);
    })
  }

  const count_anomalies = (anomalies)=>{
    let count = 0;
    if (anomalies.length > 0){
      anomalies.forEach(anomalie => {
        if (anomalie.nom_anomalie == "Premiere Forme normale"){
          if (anomalie.valeur_trouvee == 0){
            count += 1;
          }
        }else{
          count += anomalie.valeur_trouvee;
        }
      });
    }
    return count;
  }


  const getMetaColonneData = async(meta_table_id, nb_valeurs) => {
    await getMetaColonne(meta_table_id).then((data) => {
      const metacols_data = data?.results;
      const update_metacols_data = metacols_data.map(col =>  ({...col, nombre_valeurs: nb_valeurs }));
      setMetaColonneData(update_metacols_data);

      setSelectedColumnName(update_metacols_data[0].nom_colonne);
      getColumnStatistic(update_metacols_data, update_metacols_data[0].nom_colonne);


    }).catch((error)=>{
      console.log(error);
    })
  }

  useEffect(() => {

    getMetaTableData(bd_id);



    if (selectedTableId !== null && selectedColumnName !== null) {
      const selectedMetaColonne = metaColonneData.find(
        (metaColonne) =>
          metaColonne.id_meta_table === selectedTableId &&
          metaColonne.nom_colonne === selectedColumnName
      );
  
      // Vérifier si selectedMetaColonne est défini
      if (selectedMetaColonne) {
       

      }
    }
  }, []);


  const createBarGraph = (data) => {
    d3.select('#bar-graph-container').select('svg').remove();
  
    renderTitle('Bar Graph');
  
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
  
    // Define a color scale for each bar
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.1);
  
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([height - margin.bottom, margin.top]);
  
    const svg = d3
      .select('#bar-graph-container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.label))
      .attr('y', (d) => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - margin.bottom - yScale(d.value))
      .attr('fill', (d, i) => colorScale(i)); // Use color scale for different colors
  
    svg
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d.value) // Display the value on top of each bar
      .attr('x', (d) => xScale(d.label) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.value) - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', 'black'); // Adjust the color as needed
  
    // Add X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));
  
    // Add Y axis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
  };
  

  // PIE GRAPHS 
  useEffect(() => {

    if (metaTableData.length > 0){
      const filteredMetaColonne = metaColonneData.filter(
        (metaColonne) => metaColonne.meta_table === metaTableData[0].id
      );

      // statistique valeurs manquantes et existantes

      const allMissingValues = [{
        label: 'Valeurs existantes',
        value: d3.sum(
          filteredMetaColonne,
          (d) => d.nombre_valeurs - d.nombre_valeurs_manquantes
      )},{
        label: 'valeurs manquantes',
        value: d3.sum(
          filteredMetaColonne,
          (d) => d.nombre_valeurs_manquantes
        ),
      }];

      setMissingValuesPieGraphData(allMissingValues);

      // statistique valeurs conformes et anormale

      const allAnomaliesValues = [{
        label: 'valeurs conformes',
        value: d3.sum(
          filteredMetaColonne,
          (d) => d.nombre_valeurs - count_anomalies(d.meta_anomalie)
      )},{
        label: "valeurs anormales",
        value: d3.sum(
          filteredMetaColonne,
          (d) => count_anomalies(d.meta_anomalie)
        ),
      }];

      setAnomaliesPieGraphData(allAnomaliesValues);

      // statistique valeurs valides et invalides
      const allInvalidValues = [{
        label: 'Anomalie et valeurs manquantes',
        value: d3.sum(
          filteredMetaColonne,
          (d) => count_anomalies(d.meta_anomalie) + d.nombre_valeurs_manquantes
      )},{
        label: "Valeurs valides",
        value: d3.sum(
          filteredMetaColonne,
          (d) => d.nombre_valeurs - (count_anomalies(d.meta_anomalie) - d.nombre_valeurs_manquantes)
        ),
      }];

      setInvalidPieGraphData(allInvalidValues);
    }

  }, [metaTableData, metaColonneData]);



  const renderTitle = (title) => {
    return <Typography variant="h6">{title}</Typography>;
  };

  return (
    <>
      <Head>
        <title>Métadonnées | Data Guardian Pro</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
              <MetaTable
                columnsNames={[
                  'ID',
                  'Nom table',
                  'Nombre colonnes',
                  'Nombre lignes',
                  'Date création',
                  // 'Date diagnostic',
                ]}
                data={metaTableData}

              />
              <Pagination
                count={Math.ceil(metaTableData.length / itemsPerPage)}
                page={currentTablePage}
                onChange={handleChangeTablePage}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12}>
              <MetaColonne
                columnsNames={['ID', 'ID Méta table', 'Nom colonne', 'Type donnée', 'Date création', 'Date diagnostic', 'Nombre valeurs', 'Nombre de valeurs manquantes', 'Nombre outliers', 'Sémantique', 'Langue', 'Nombre anomalies', 'Nombre majuscules', 'Nombre Miniscules', 'Nombre initcap', 'Valeur minimale', 'Valeur maximale' ]}
                data={metaColonneData.slice(colonneStartIndex, colonneEndIndex)}
                nombre_lignes ={nombreValeurs}
                count_anomalies={count_anomalies}
              />
              <Pagination
                count={Math.ceil(metaColonneData.length / itemsPerPage)}
                page={currentColonnePage}
                onChange={handleChangeColonnePage}
              />
            </Grid>

            {metaTableData.length > 0 && (
              <Grid item xs={12} md={12} lg={12}>
                <Card>

                <CardHeader title={"Les statistiques de la table:" + metaTableData[0].nom_table} />
                <CardContent>
                <Grid container spacing={3}>
              
              {missingValuesPieGraphData.length > 0 && (
                <Grid item xs={12} md={4} lg={4}>
                  <PieGraph data={missingValuesPieGraphData} title="Valeurs manquantes VS Existantes" colors={['green', 'red']} width={300} height={300} />
                </Grid>
              )}

              {anomaliesPieGraphData.length > 0 && (
                <Grid item xs={12} md={4} lg={4}>
                  <PieGraph data={anomaliesPieGraphData} title=" Valeurs conformes VS anomalies" width={300} height={300} />
                </Grid>
              )}

              {invalidPieGraphData.length > 0 && (
                <Grid item xs={12} md={4} lg={4}>
                  <PieGraph data={invalidPieGraphData} title="Valeurs invalides VS valides " colors={['orange', 'gray']} width={300} height={300} />
                </Grid>
              )}

                </Grid>
                </CardContent>
              
            </Card>
  
            
            </Grid>
            )}
            {metaTableData.length > 0 && (
              <Grid item xs={12} md={12} lg={12}>
                <Card>

                  <CardHeader title="Les statistiques par colonne"/>
                  <CardContent>
                  <label>Sélectionner une colonne: </label>
                  <Select value={selectedColumnName} onChange={handleColumnSelect}>
                    {metaColonneData
                      .filter((colonne) => colonne.meta_table === metaTableData[0].id)
                      .map((colonne) => (
                        <MenuItem key={colonne.id_meta_colonne} value={colonne.nom_colonne}>
                          {colonne.nom_colonne}
                        </MenuItem>
                      ))}
                  </Select>

                  <Grid item xs={12} md={12} lg={12}>
                    <Box id="bar-graph-container"></Box>
                  </Grid>
                  </CardContent>
                </Card>
                  
            </Grid>
            )};
    
          </Grid>
         
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
