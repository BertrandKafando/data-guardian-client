import React, { useState , useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Select, MenuItem , Typography} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { MetaTable } from 'src/sections/metadata/metadata-meta-table';
import { MetaColonne } from 'src/sections/metadata/metadata-meta-colonne';
import { select } from 'd3';
import * as d3 from 'd3';
import Chart from 'chart.js/auto';

const Page = () => {
  const itemsPerPage = 3;
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [currentColonnePage, setCurrentColonnePage] = useState(1);

  const metaTableData = [
    {
      id: 1,
      nom_table: 'CLIENTS',
      nombre_colonne: 10,
      nombre_ligne: 124,
      date_creation: "2023-11-18",
      date_diagnostic:"2023-11-21"
    },
    {
      id: 2,
      nom_table: 'MAGASIN',
      nombre_colonne: 5,
      nombre_ligne: 12,
      date_creation: "2023-11-18",
      date_diagnostic:"2023-11-21"
    },
    {
      id: 3,
      nom_table: 'ARTICLES',
      nombre_colonne: 8,
      nombre_ligne: 548,
      date_creation: "2023-11-18",
      date_diagnostic:"2023-11-21"
    },
    {
      id: 3,
      nom_table: 'ARTICLES',
      nombre_colonne: 8,
      nombre_ligne: 548,
      date_creation: "2023-11-18",
      date_diagnostic:"2023-11-21"
    },
    {
      id: 3,
      nom_table: 'ARTICLES',
      nombre_colonne: 8,
      nombre_ligne: 548,
      date_creation: "2023-11-18",
      date_diagnostic:"2023-11-21"
    },
    {
      id: 3,
      nom_table: 'ARTICLES',
      nombre_colonne: 8,
      nombre_ligne: 548,
      date_creation: "2023-11-18",
      date_diagnostic:"2023-11-21"
    },
    {
      id: 3,
      nom_table: 'ARTICLES',
      nombre_colonne: 8,
      nombre_ligne: 548,
      date_creation: "2023-11-18",
      date_diagnostic:"2023-11-21"
    },
    {
      id: 3,
      nom_table: 'ARTICLES',
      nombre_colonne: 8,
      nombre_ligne: 548,
      date_creation: "2023-11-18",
      date_diagnostic:"2023-11-21"
    },
    {
      id: 3,
      nom_table: 'ARTICLES',
      nombre_colonne: 8,
      nombre_ligne: 548,
      date_creation: "2023-11-18",
      date_diagnostic:"2023-11-21"
    },
    {
      id: 3,
      nom_table: 'ARTICLES',
      nombre_colonne: 8,
      nombre_ligne: 548,
      date_creation: "2023-11-18",
      date_diagnostic:"2023-11-21"
    }
  ];

  const metaColonneData = [
    {
      id_meta_colonne : 1,
      id_meta_table: 1,
      id_meta_special_car: 1, 
      id_table_origin: "CODCLI",
      nom_colonne: "NOMCLI",
      type_donnee: "Varchar",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: "CD001",
      col_max: "FG0A01"
    },
    {
      id_meta_colonne :2,
      id_meta_table: 2,
      id_meta_special_car: 2, 
      id_table_origin: "REFART",
      nom_colonne: "LOCATION",
      type_donnee: "Varchar",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 12,
      nombre_valeur_manquante: 3,
      nombre_outliers: 0,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 12,
      nombre_majuscules: 12,
      nombre_miniscules: 0,
      nombre_initcap: 0,
      col_min: "Dakar",
      col_max: "Epinay sur seine"
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    },
    {
      id_meta_colonne : 3,
      id_meta_table: 3,
      id_meta_special_car: 3, 
      id_table_origin: "REFART",
      nom_colonne: "PRIX",
      type_donnee: "NUMBER",
      date_creation: "22/11/2023",
      date_diagnostic: "22/11/2023",
      nombre_valeur: 42,
      nombre_valeur_manquante: 17,
      nombre_outliers: 3,
      semantique: null,
      langue: "FR",
      nombre_anomalie: 24,
      nombre_majuscules: 24,
      nombre_miniscules: 24,
      nombre_initcap: 24,
      col_min: 12.5,
      col_max: 158.99
    }
  ];

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

  const handleColumnSelect = (event) => {
    const columnName = event.target.value;
    setSelectedColumnName(columnName);
  };

  useEffect(() => {
    if (selectedTableId !== null && selectedColumnName !== null) {
      const selectedMetaColonne = metaColonneData.find(
        (metaColonne) =>
          metaColonne.id_meta_table === selectedTableId &&
          metaColonne.nom_colonne === selectedColumnName
      );
  
      // Vérifier si selectedMetaColonne est défini
      if (selectedMetaColonne) {
        const barGraphData = [
          {
            label: 'Existing value',
            value: selectedMetaColonne.nombre_valeur,
          },
          {
            label: 'Anomaly',
            value: selectedMetaColonne.nombre_anomalie,
          },
          {
            label: 'Missing value',
            value: selectedMetaColonne.nombre_valeur_manquante,
          },
          {
            label: 'Valid value',
            value:
              selectedMetaColonne.nombre_valeur -
              (selectedMetaColonne.nombre_anomalie -
                selectedMetaColonne.nombre_valeur_manquante),
          },
          {
            label: 'Invalid value',
            value:
              selectedMetaColonne.nombre_anomalie -
              selectedMetaColonne.nombre_valeur_manquante,
          },
        ];
  
        createBarGraph(barGraphData);
      }
    }
  }, [selectedTableId, selectedColumnName]);


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
  


  // Function to handle table selection
  const handleTableSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedTableId(selectedId);
    setSelectedTableInfo({
      title1: 'EXISTING vs MISSING values  ',
      title2: ' ANOMALIES  ',
      title3: 'VALID vs INVALID values   ',
    });
  };

  useEffect(() => {
    if (selectedTableId !== null) {
      const selectedMetaTable = metaTableData.find(
        (metaTable) => metaTable.id === selectedTableId
      );

      const filteredMetaColonne = metaColonneData.filter(
        (metaColonne) => metaColonne.id_meta_table === selectedTableId
      );

      const circleGraphData = {
        nombre_valeur: d3.sum(
          filteredMetaColonne,
          (d) => d.nombre_valeur - d.nombre_valeur_manquante
        ),
        nombre_valeur_manquante: d3.sum(
          filteredMetaColonne,
          (d) => d.nombre_valeur_manquante
        ),
      };

      const anomaliesGraphData = {
        nombre_valeur: d3.sum(filteredMetaColonne, (d) => d.nombre_valeur),
        nombre_anomalie: d3.sum(filteredMetaColonne, (d) => d.nombre_anomalie),
      };

      const invalidValuesGraphData = {
        nombre_anomalie_manquante: d3.sum(
          filteredMetaColonne,
          (d) => d.nombre_anomalie - d.nombre_valeur_manquante
        ),
        nombre_valide: d3.sum(
          filteredMetaColonne,
          (d) =>
            d.nombre_valeur - (d.nombre_anomalie - d.nombre_valeur_manquante)
        ),
      };

      createCircleGraph(circleGraphData);
      createAnomaliesGraph(anomaliesGraphData);
      createInvalidValuesGraph(invalidValuesGraphData);
    }
  }, [selectedTableId]);

  const createCircleGraph = (data) => {
    d3.select('#circle-graph-container').select('svg').remove();

    renderTitle(selectedTableInfo.title1);


    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(['#98abc5', '#8a89a6']);

    const svg = d3
      .select('#circle-graph-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const pie = d3.pie().value((d) => d);

    const dataForPieChart = [data.nombre_valeur - data.nombre_valeur_manquante, data.nombre_valeur_manquante];

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg
      .selectAll('path')
      .data(pie(dataForPieChart))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i));

    svg
      .selectAll('text')
      .data(pie(dataForPieChart))
      .enter()
      .append('text')
      .attr('transform', (d) => 'translate(' + arc.centroid(d) + ')')
      .attr('dy', '.4em')
      .style('text-anchor', 'middle')
      .text((d) => d.data);
    
    
  };

  const createAnomaliesGraph = (data) => {
    d3.select('#anomalies-graph-container').select('svg').remove();

    renderTitle(selectedTableInfo.title2);


    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(['#1f77b4', '#ff7f0e']);

    const svg = d3
      .select('#anomalies-graph-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const pie = d3.pie().value((d) => d);

    const dataForPieChart = [data.nombre_valeur - data.nombre_anomalie, data.nombre_anomalie];

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg
      .selectAll('path')
      .data(pie(dataForPieChart))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i));

    svg
      .selectAll('text')
      .data(pie(dataForPieChart))
      .enter()
      .append('text')
      .attr('transform', (d) => 'translate(' + arc.centroid(d) + ')')
      .attr('dy', '.4em')
      .style('text-anchor', 'middle')
      .text((d) => d.data);
    
  
  };
  const createInvalidValuesGraph = (data) => {
    d3.select('#invalid-values-graph-container').select('svg').remove();

    renderTitle(selectedTableInfo.title3);


    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(['#2ca02c', '#d62728']);

    const svg = d3
      .select('#invalid-values-graph-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const pie = d3.pie().value((d) => d);

    const dataForPieChart = [data.nombre_anomalie_manquante, data.nombre_valide];

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg
      .selectAll('path')
      .data(pie(dataForPieChart))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i));

    svg
      .selectAll('text')
      .data(pie(dataForPieChart))
      .enter()
      .append('text')
      .attr('transform', (d) => 'translate(' + arc.centroid(d) + ')')
      .attr('dy', '.4em')
      .style('text-anchor', 'middle')
      .text((d) => d.data);
    
    
  };
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
          <Grid xs={12} md={12} lg={12}>
              <MetaTable
                columnsNames={[
                  'ID',
                  'Nom table',
                  'Nombre colonnes',
                  'Nombre lignes',
                  'Date création',
                  'Date diagnostic',
                ]}
                data={metaTableData.slice(tableStartIndex, tableEndIndex)}
              />
              <Pagination
                count={Math.ceil(metaTableData.length / itemsPerPage)}
                page={currentTablePage}
                onChange={handleChangeTablePage}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12}>
              <MetaColonne
                columnsNames={['ID', 'ID Méta table', 'ID méta spécial car', 'Clé primaire table', 'Nom colonne', 'Type donnée', 'Date création', 'Date diagnostic', 'Nombre valeurs', 'Nombre de valeurs manquantes', 'Nombre outliers', 'Sémantique', 'Langue', 'Nombre anomalies', 'Nombre majuscules', 'Nombre Miniscules', 'Nombre initcap', 'Valeur minimale', 'Valeur maximale' ]}
                
                data={metaColonneData.slice(colonneStartIndex, colonneEndIndex)}
              />
              <Pagination
                count={Math.ceil(metaColonneData.length / itemsPerPage)}
                page={currentColonnePage}
                onChange={handleChangeColonnePage}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
             <Typography variant="h6" gutterBottom>
                    Statistique
             </Typography>
             <h10>Sélectionner une table  </h10>
             <Select value={selectedTableId}  onChange={handleTableSelect}>
                {metaTableData.map((table) => (
                  <MenuItem key={table.id} value={table.id}>
                    {table.nom_table}
                  </MenuItem>
                ))}
             </Select>
            
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              {selectedTableInfo && renderTitle(selectedTableInfo.title1)}
              <Box id="circle-graph-container"></Box>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              {selectedTableInfo && renderTitle(selectedTableInfo.title2)} 
              <Box id="anomalies-graph-container"></Box>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              {selectedTableInfo && renderTitle(selectedTableInfo.title3)} 
              <Box id="invalid-values-graph-container"></Box>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              {selectedTableId && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Statistique par colonne
                  </Typography>
                  <h10>Sélectionner une colonne</h10>
                  <Select value={selectedColumnName} onChange={handleColumnSelect}>
                    {metaColonneData
                      .filter((colonne) => colonne.id_meta_table === selectedTableId)
                      .map((colonne) => (
                        <MenuItem key={colonne.id_meta_colonne} value={colonne.nom_colonne}>
                          {colonne.nom_colonne}
                        </MenuItem>
                      ))}
                  </Select>
                </>
              )}
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Box id="bar-graph-container"></Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
