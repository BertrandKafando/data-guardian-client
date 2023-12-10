import { Box, Button, Checkbox, FormControlLabel, Modal, Typography,CircularProgress,Alert } from "@mui/material";
import { useState } from "react";
import { sendFileAndLaunchDiagnostic } from "src/api/services";
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import InfoIcon from '@mui/icons-material/Info';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { useRouter } from "next/router";

 
 export const ModalChecklist = (props) => {

    const {setOpenModal, openModal, fileToSend} = props;
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState(null);
    const [finishDiagnostic, setFinishDiagnostic] = useState(false);

    const [checkboxValues, setCheckboxValues] = useState({
        VAL_MANQ: false,
        VAL_MANQ_CONTRAINTS: false,
        VAL_MANQ_CONTRAINTS_FN: false,
        VAL_MANQ_CONTRAINTS_FN_DUPLICATIONS: false,
        ALL: false,
      });

    const router = useRouter();


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

      const handleCloseModal = () => {
        setOpenModal(false);
        setMessageError(null);

        setCheckboxValues({
          VAL_MANQ: false,
          VAL_MANQ_CONTRAINTS: false,
          VAL_MANQ_CONTRAINTS_FN: false,
          VAL_MANQ_CONTRAINTS_FN_DUPLICATIONS: false,
          ALL: false,
        })

        setFinishDiagnostic(false);

      };

      const handleCheckboxChange = (name) => {
    
        const newCheckboxValues = Object.fromEntries(
          Object.keys(checkboxValues).map((key) => [key, false])
        );
    
        newCheckboxValues[name] = !checkboxValues[name];
    
        setCheckboxValues(newCheckboxValues);
      };
    

    
      const handleDiagnostic = (e) => {
        e.preventDefault();
        setLoading(true);
    
        const selectedOption = Object.keys(checkboxValues).filter((key) => checkboxValues[key]);

        console.log(selectedOption[0]);
    
        if (selectedOption.length == 1){

        
            sendFileAndLaunchDiagnostic(fileToSend, "CSV", selectedOption[0]).then((response)=> {

                setFinishDiagnostic(true);
                console.log(response);

                setLoading(false);
            }).catch((error)=> {
                console.log(error);
                setMessageError("Une erreur s'est produite");
                setLoading(false);

            })
        }else{
          setMessageError("Aucun option n'a été choisi");
          setLoading(false);
        }       
       
      };

      // view diagnostic
      const navResult=() =>{
        router.push('/metadata');
      }
      
    

    return (
    <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={fullPageModalStyle}>
            {messageError && (
              <Alert severity="error" onClose={() => {setMessageError(null)}} variant="filled" sx={{ maxWidth: '400px' }}>{messageError}</Alert>
            )}

          {!finishDiagnostic ? (
            <>
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
                  <Button disabled={loading} type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>

                  {loading ? <CircularProgress size={24} color="inherit" /> : ' Lancer le diagnostic'}
                
                </Button>
                </form>
              </Box>
            </>

          ) : (
           <>
               <Box sx={modalHeaderStyle}>
                <InfoIcon style={{ fontSize: '2.5rem' }}/>

                <Typography variant="h6">Diagnostic terminé</Typography>
              </Box>
              <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              <DoneOutlineIcon style={{ fontSize: '5rem', color:'green' }}/>
              <p style={{color: '#514949', fontSize:'13px'}}>Diagnostic reussi. Cliquez pour voir les résultats</p>
              <Button variant="contained" sx={{marginTop: '10px'}} onClick={navResult}>Voir les résultats</Button>
              </Box>
           </>
          )}
         
        </Box>
      
    </Modal>
    );
 }
