import React, { useState } from "react";
import { Box, Button, Container, Stack, SvgIcon, TableHead, Typography } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import Head from "next/head";
import { Card, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Upload from "src/sections/upload";
import Papa from "papaparse";
import { send } from "process";
import { sendCSV } from "src/api/services";
import { DataCard } from "src/sections/assessment/data-card";
import ReplyIcon from '@mui/icons-material/Reply';

const Page = () => {
  const [csvArray, setCsvArray] = useState([]);
  const [fileToSend, setFileToSend] = useState(null);

  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file == null || file == undefined || !file["name"]) {
      console.log("file is null");
      return;
    }
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
        console.log(rows); // An array of rows parsed by papaparse
      },
      header: false, // Assuming no header row in the CSV
    });
  };

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
                  onClick={() => handsendCSV(fileToSend)}
                >
                  Check
                </Button>
                <Button
                  startIcon={<SvgIcon fontSize="small"><ReplyIcon /></SvgIcon>}
                  variant="contained"
                  onClick={() => setCsvArray([])}
                  color="error"
                >
                  Clear
                </Button>
              </Stack>
            </Stack>

            {/* Utilisation du composant UploadCard pour gérer l'upload */}
            <Upload handleFileUpload={handleFileUpload} />
          </Stack>

          {csvArray.length > 0 && <DataCard data={csvArray} />} 
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
