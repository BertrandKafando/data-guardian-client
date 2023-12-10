import React, { useState } from "react";
import { Alert, Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Upload from "src/sections/upload";
import Papa from "papaparse";
import { send } from "process";
import {sendCSV } from "src/api/services";
import { DataCard } from "src/sections/assessment/data-card";
import ReplyIcon from '@mui/icons-material/Reply';
import { ModalChecklist } from "src/sections/assessment/modal-checklist";
import { useRouter } from "next/router";

const Page = (props) => {

  const router = useRouter();
  const { id_projet } = router.query;

  const [csvArray, setCsvArray] = useState([]);
  const [fileToSend, setFileToSend] = useState(null);
  const [openModal, setOpenModal] = useState(false);
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
      // processCSV(text);
      parseFile(text, ";", false);
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
  
  const parseFile = (file, sep, header = false) => {
    let data = [];
    try {
      const lines = file.split('\n');
      if (header) {
        lines.shift(); // Exclude header if present
      }

      let incompleteLine = '';
      for (let idx = 0; idx < lines.length; idx++) {
        let line = lines[idx].trim();
        line = line.substring(1, line.length - 2);
        const row = line.split(sep);
        if (idx !== 0 && row.length < data[0].length) {
          // Add the incomplete part to the last read line
          data[data.length - 1][data[data.length - 1].length - 1] += ` ${line}`;
        } else {
          data.push(row);
        }
      }

      setCsvArray(data); // Returning object with columns as keys and arrays as values
    } catch (e) {
      console.log(`Error parsing file: ${e}`);
      return -1;
    }
  };



  const handleOpenModal = () => {

    if (fileToSend == null){
      setErrorFileIsEmpty(true);
    }else{
      setOpenModal(true);

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
              <Alert severity="error" onClose={() => { setErrorFileIsEmpty(false) }} variant="filled" sx={{ maxWidth: '400px' }}>Veuillez d'abord charger un fichier</Alert>
            )}
            
            <Upload handleFileUpload={handleFileUpload} />
          </Stack>

          {csvArray.length > 0 && <DataCard data={csvArray} />} 
        </Container>

       <ModalChecklist setOpenModal={setOpenModal} openModal={openModal} fileToSend={fileToSend}  id_projet={id_projet} />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
