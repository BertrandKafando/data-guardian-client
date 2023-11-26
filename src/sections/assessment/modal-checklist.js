import { Box, Button, Checkbox, FormControlLabel, Modal, Typography,CircularProgress,Alert } from "@mui/material";
import { useState } from "react";
import { sendFileAndLaunchDiagnostic } from "src/api/services";
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';

 
 export const ModalChecklist = (props) => {

    const {setOpenModal, openModal, fileToSend} = props;
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState(null);
    const [checkboxValues, setCheckboxValues] = useState({
        VAL_MANQ: false,
        VAL_MANQ_CONTRAINTS: false,
        VAL_MANQ_CONTRAINTS_FN: false,
        VAL_MANQ_CONTRAINTS_FN_DUPLICATIONS: false,
        ALL: false,
      });
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
        setLoading(true);
    
        const selectedOption = Object.keys(checkboxValues).filter((key) => checkboxValues[key]);
    
        if (selectedOption.length == 1){
          encodeFileToBase64(fileToSend, (base64Data)=> {
                
            sendFileAndLaunchDiagnostic(base64Data, fileToSend, "CSV", selectedOption[0]).then((response)=> {
                console.log(response);

                setLoading(false);
            }).catch((error)=> {
                console.log(error);
                setMessageError("Une erreur s'est produite");
                setLoading(false);

            })
            })
        }else{
          setMessageError("Aucun option n'a été choisi");
          setLoading(false);
        }       
       
      };

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
        </Box>
      
    </Modal>
    );
 }
