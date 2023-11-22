import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Button, Container, Unstable_Grid2 as Grid, Modal, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { MetaTable } from 'src/sections/metadata/metadata-meta-table';
import { MetaSpecialCar } from 'src/sections/metadata/metadata-meta-special-car';
import { MetaColonne } from 'src/sections/metadata/metadata-meta-colonne';

const now = new Date();



const Page = () => (

  <>
    <Head>
      <title>
        Métadonnées | Data Guardian Pro
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1
      }}
    >

   
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          
          <Grid
            xs={12}
            md={12}
            lg={7}
          >
            <MetaTable
              columnsNames={['ID', 'Nom table', 'Nombre colonnes', 'Nombre lignes', 'Date création', 'Date diagnostic']}
              data={[
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
              ]}
             
            />
          </Grid>

          <Grid
            xs={12}
            md={12}
            lg={5}
          >
             <MetaSpecialCar
              columnsNames={['ID', 'Caractères spéciaux']}
              data={[
                {
                  id: 1,
                  caracteres_speciaux: "//-'__@_/------"
                },
                {
                  id: 2,
                  caracteres_speciaux: "//--"
                },
                {
                  id: 3,
                  caracteres_speciaux: "@?--"
                },
                {
                  id: 3,
                  caracteres_speciaux: "@?--"
                }, {
                  id: 3,
                  caracteres_speciaux: "@?--"
                },
                {
                  id: 3,
                  caracteres_speciaux: "@?--"
                },
                {
                  id: 3,
                  caracteres_speciaux: "@?--"
                },
                {
                  id: 3,
                  caracteres_speciaux: "@?--"
                },
                {
                  id: 3,
                  caracteres_speciaux: "@?--"
                }, {
                  id: 3,
                  caracteres_speciaux: "@?--"
                }

              ]}
             
            />
          </Grid>

          <Grid
            xs={12}
            md={12}
            lg={12}
          >
             <MetaColonne
              columnsNames={['ID', 'ID Méta table', 'ID méta spécial car', 'Clé primaire table', 'Nom colonne', 'Type donnée', 'Date création', 'Date diagnostic', 'Nombre valeurs', 'Nombre de valeurs manquantes', 'Nombre outliers', 'Sémantique', 'Langue', 'Nombre anomalies', 'Nombre majuscules', 'Nombre Miniscules', 'Nombre initcap', 'Valeur minimale', 'Valeur maximale' ]}
              data={[
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
              ]}
             
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
