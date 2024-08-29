
import React, { useState, useRef } from 'react';

import { useSelector } from 'react-redux';
import { setFormState } from '../store/formSlice';
import { store } from '../store/store';
import { RootState } from '../store/types';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


import { configSchema }  from '../store/configSchema';
import Ajv from 'ajv';

const ajv = new Ajv();
export const configSchemaValidator = ajv.compile(configSchema);


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Sidebar: React.FC = () => {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);

  const formData = useSelector((state: RootState) => state.form);

  const buttons = [
    { name: 'Load', label: 'Load config...' },
    { name: 'Save', label: 'Save...' },
    // Add more buttons as needed
  ];

  const handleLoadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json_from_file = JSON.parse(e.target?.result as string);
          store.dispatch(setFormState(json_from_file));
        } catch (error) {
          console.error('Error parsing JSON file:', error);
          alert('Error loading file. Please make sure it\'s a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowError(false);
  };


  const handleGenerateJson = () => {

    if (!configSchemaValidator(formData)) 
    {
        const allErrors = (configSchemaValidator.errors || []).map(error => `${error.dataPath}: ${error.message}`);
        setErrors(allErrors);
        setShowError(true);
    }
    else 
    {
      // Generate JSON
        const jsonOutput = JSON.stringify(formData, null, 2);
      
        // Create a Blob with the JSON data
        const blob = new Blob([jsonOutput], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
      
        // Create a link element and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'config.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      
        // Clean up the URL
        URL.revokeObjectURL(url);
    }
  };


  const handleSidebarButtonClick = (buttonName: string) => {
    // Handle sidebar button clicks here
    switch(buttonName)
    {
        case 'Load':
        handleLoadClick();
        break;
  
        case 'Save':
        handleGenerateJson();
        break; 
    }
  };  


  return (
    
    <div className="sidebar">

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileLoad}
        accept=".json"
      />

      {buttons.map((button) => (
        <button
          key={button.name}
          onClick={() => handleSidebarButtonClick(button.name)}
          className="button"
        >
          {button.label}
        </button>
      ))}

      <Snackbar open={showError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          {errors.join(', ')}
        </Alert>
      </Snackbar>

    </div>
  );
};

export default Sidebar;
