import React, { useState } from "react";
import { Alert, AlertTitle, Box, Button, Checkbox, Container, FormControlLabel, Modal, Stack, SvgIcon, TableHead, Typography } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import Head from "next/head";
import { Card, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Upload from "src/sections/upload";
import Papa from "papaparse";
import { send } from "process";
import {sendCSV, sendFileAndLaunchDiagnostic } from "src/api/services";
import { DataCard } from "src/sections/assessment/data-card";
import ReplyIcon from '@mui/icons-material/Reply';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';

const Page = () => {
  const [csvArray, setCsvArray] = useState([]);
  const [fileToSend, setFileToSend] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState({
    VAL_MANQ: false,
    VAL_MANQ_CONTRAINTS: false,
    VAL_MANQ_CONTRAINTS_FN: false,
    VAL_MANQ_CONTRAINTS_FN_DUPLICATIONS: false,
    ALL: false,
  });
  const [errorFileIsEmpty, setErrorFileIsEmpty] = useState(false);



  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file == null || file == undefined || !file["name"]) {
      console.log("file is null");
      return;
    }
    setErrorFileIsEmpty(false);
    setFileToSend(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      const text = reader.result;
      processCSV(text);
    };

    reader.readAsText(file);
  };

  const processCSV = (str) => {
    Papa.parse(str, {
      complete: (result) => {
        const rows = result.data;
        setCsvArray(rows);
      },
      header: false, // Assuming no header row in the CSV
    });
  };

  const fullPageModalStyle = {
    position: 'fixed',
    top: '30%',
    left: '50%',
    width: '36%',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 9999,
    padding: '2rem',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white', 
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };
  
  const modalHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    bgcolor: 'white',
    padding: 2,
  };


  const handleOpenModal = () => {

    if (fileToSend == null){
      setErrorFileIsEmpty(true);
    }else{
      setOpenModal(true);

    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  



  const handleCheckboxChange = (name) => {

    const newCheckboxValues = Object.fromEntries(
      Object.keys(checkboxValues).map((key) => [key, false])
    );

    newCheckboxValues[name] = !checkboxValues[name];

    setCheckboxValues(newCheckboxValues);
  };

  // encode file to base64
  const encodeFileToBase64 = (file, callback) => {
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64Data = reader.result.split(',')[1];
      callback(base64Data, file.name);
    };
  
    reader.readAsDataURL(file);
  };

  const handleDiagnostic = (e) => {
    e.preventDefault();

    const selectedOption = Object.keys(checkboxValues).filter((key) => checkboxValues[key]);

    if (selectedOption.length == 1){
      encodeFileToBase64(fileToSend, (base64Data)=> {
            
        sendFileAndLaunchDiagnostic(base64Data, fileToSend, "CSV", selectedOption[0]);
        })
    }else{
      console.log("Aucun option n'a été choisi");
    }

   
   
  };

  const handleClearCSV = () =>{
    setCsvArray([]);
    setFileToSend(null);
  }


  const handsendCSV = (file) => {
    // test if file exist 
    if (file == null || file == undefined || !file["name"]) {
      console.log("file is null");
      return;
    }
    sendCSV(file).then((response) => {
      console.log(response);
      //get statistiques
    }),
      (error) => {
        console.log(error);
      };
  }

  return (
    <>
      <Head>
        <title>Assessment | Data Guardian Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >


        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Assessment</Typography>
              </Stack>
              
              <Stack direction="row" spacing={2}>
                <Button
                  startIcon={<SvgIcon fontSize="small"><AnalyticsIcon /></SvgIcon>}
                  variant="contained"
                  onClick={handleOpenModal}
                >
                  Check
                </Button>
                <Button
                  startIcon={<SvgIcon fontSize="small"><ReplyIcon /></SvgIcon>}
                  variant="contained"
                  onClick={handleClearCSV}
                  color="error"
                >
                  Clear
                </Button>
              </Stack>
            </Stack>

            {errorFileIsEmpty && (
              <Alert severity="error" onClose={() => {setErrorFileIsEmpty(false)}} variant="filled" sx={{ maxWidth: '400px' }}>Veuillez d'abord charger un fichier</Alert>
            )}
            
            <Upload handleFileUpload={handleFileUpload} />
          </Stack>

          {csvArray.length > 0 && <DataCard data={csvArray} />} 
        </Container>

        <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={fullPageModalStyle}>
      <Box sx={modalHeaderStyle}>
          <TroubleshootIcon style={{ fontSize: '3rem' }}/>

          <Typography variant="h6">Check list</Typography>
        </Box>

        <Box>
        <form onSubmit={handleDiagnostic}>
        <FormControlLabel
          control={
            <Checkbox
            color="success"
            inputProps={{ 'aria-label': 'success checkbox' }}
              checked={checkboxValues.VAL_MANQ}
              onChange={() => handleCheckboxChange('VAL_MANQ')}
            />
          }
          label="1- Valeurs manquantes"
          style={{width: '100%'}}
        />

        <FormControlLabel
            control={
              <Checkbox
                color="success"
                inputProps={{ 'aria-label': 'success checkbox' }}
                checked={checkboxValues.VAL_MANQ_CONTRAINTS}
                onChange={() => handleCheckboxChange('VAL_MANQ_CONTRAINTS')}
              />
            }
            label="2- Valeurs manquantes + contraintes"
            style={{width: '100%'}}
          />

        <FormControlLabel
            control={
              <Checkbox
                color="success"
                inputProps={{ 'aria-label': 'success checkbox' }}
                checked={checkboxValues.VAL_MANQ_CONTRAINTS_FN}
                onChange={() => handleCheckboxChange('VAL_MANQ_CONTRAINTS_FN')}
              />
            }
            label="3- Valeurs manquantes + contraintes + Formes normales"
          />

          <FormControlLabel
            control={
              <Checkbox
                color="success"
                inputProps={{ 'aria-label': 'success checkbox' }}
              />
            }
            label="4- Valeurs manquantes + contraintes + Formes normales + Duplications"
            style={{width: '100%'}}
            checked={checkboxValues.VAL_MANQ_CONTRAINTS_FN_DUPLICATIONS}
            onChange={() => handleCheckboxChange('VAL_MANQ_CONTRAINTS_FN_DUPLICATIONS')}
          />
           <FormControlLabel
            control={
              <Checkbox
                color="success"
                inputProps={{ 'aria-label': 'success checkbox' }}
              />
            }
            label="5- Tous"
            style={{width: '100%'}}
            checked={checkboxValues.ALL}
            onChange={() => handleCheckboxChange('ALL')}
          />

        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Lancer le diagnostic
        </Button>
      </form>
        </Box>
      </Box>
      
     
    </Modal>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
