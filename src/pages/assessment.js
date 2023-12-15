import React, { useState } from "react";
import { Alert, Box, Button, Container, Stack, SvgIcon, Typography, Item, Divider, Paper,Select,MenuItem,Checkbox } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Upload from "src/sections/upload";
import {sendCSV } from "src/api/services";
import { DataCard } from "src/sections/assessment/data-card";
import ReplyIcon from '@mui/icons-material/Reply';
import { ModalChecklist } from "src/sections/assessment/modal-checklist";
import { useRouter } from "next/router";
import { getBdsByProjectId } from 'src/api/project';

const Page = (props) => {

  const router = useRouter();
  const { id_projet } = router.query;

  const delimeters = { "Virgule": ",", "Point virgule": ";", "Tabulation": "\t"};


  const [csvArray, setCsvArray] = useState([]);
  const [fileToSend, setFileToSend] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [errorFileIsEmpty, setErrorFileIsEmpty] = useState(false);
  const [delimeter, setDelimeter] = useState("Virgule");
  const [header, setHeader] = useState(false); 
  const [text, setText] = useState("");




  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    // get extension of file

    let extension = file.name.split('.').slice(-1)[0];
    if (file == null || file == undefined || !file["name"]) {
      console.log("file is null");
      return;
    }
    setFileToSend(file);
    setErrorFileIsEmpty(false);
    const reader = new FileReader();
    reader.onloadend = () => {
      const text = reader.result;
      setText(text);
      // processCSV(text);
      parseAllFile(extension,text);
    };

    reader.readAsText(file);
  };

  const parseJsonFile = () => {

  }

  const parseExelFile = () => {
}



  const parseAllFile = (extension,txt) => {
    if (extension.toUpperCase() === "CSV" || extension == "TXT") {
      parseFile(txt, delimeters[delimeter], header);
    }
    else if (extension.toUpperCase() == "XLSX" || extension == "XLS") {
     // parseExelFile()
      setCsvArray([]);
    }
    else if (extension.toUpperCase() == "JSON") {
      setCsvArray([]);
    }
    else {
      parseFile(txt, delimeters[delimeter], header);
    }
  }





  const handleDelimeter = (event) => {
   /* if (fileToSend == null) {
      setErrorFileIsEmpty(true);
      return;
    }*/
    setDelimeter(event.target.value);
    console.log(event.target.value);
    parseFile(text, delimeters[event.target.value], header);
  };

  const handleHeader = (event) => {
   /* if (fileToSend == null) {
      setErrorFileIsEmpty(true);
      return;
    }*/
    setHeader(event.target.checked);
    parseFile(text, delimeters[delimeter], event.target.checked);
  };
  
  const parseFile = (file, sep, header) => {
    let data = [];
    try {
      const lines = file.split('\n');
      if (header) {
        lines.shift(); // Exclude header if present
      }

      let incompleteLine = '';
      for (let idx = 0; idx < lines.length; idx++) {
        let line = lines[idx].trim();
        //line = line.substring(1, line.length - 2);
        const row = line.split(sep);
        if (idx !== 0 && row.length < data[0].length) {
          // Add the incomplete part to the last read line
          let temp1 = data[data.length - 1][data[data.length - 1].length - 1];
          let temp2 = ` ${line}`
          // temp1[:-1] + temp2[2:-1]
          data[data.length - 1][data[data.length - 1].length - 1] =  temp1.substring(0, temp1.length - 1) + temp2.substring(2, temp2.length - 1);
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

          {fileToSend && (

            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={10}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 2
              }}

            >
              <Box sx={{ minWidth: 120 }}>
                <Typography variant="body1" align="center" sx={{ fontWeight: 600 }}>Délimiteur</Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={delimeter}
                  label="Age"
                  onChange={handleDelimeter}
                >
                  {Object.keys(delimeters).map((key) => (
                    <MenuItem key={key} value={key}  >{key + "  " + delimeters[key]}</MenuItem>
                  ))}
                </Select>
              </Box>

              <Box sx={{ minWidth: 120 }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>Header</Typography>
                <Checkbox
                  checked={header}
                  onChange={handleHeader}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Box>


            </Stack>

          )}
          
          <Stack
            sx={{
              marginTop: 2
            }}
          >
            {csvArray.length > 0 && <DataCard data={csvArray} />} 
          </Stack>
        </Container>

       <ModalChecklist setOpenModal={setOpenModal} openModal={openModal} fileToSend={fileToSend}  id_projet={id_projet}  delimeter ={delimeter} header ={header} />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
