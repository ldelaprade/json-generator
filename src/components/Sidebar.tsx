
import React, {  useRef  } from 'react';

import { useSelector } from 'react-redux';
import { setFormState, Arinc429, GridState, FormState, ConfigState } from '../store/formSlice';
import { store } from '../store/store';
import { RootState } from '../store/types';
import { useSnackbar } from './LogZone';


import { configSchema }  from '../store/configSchema';
import Ajv from 'ajv';


//import FileManager from '../FileManager.js';

const ajv = new Ajv();
export const configSchemaValidator = ajv.compile(configSchema);


function a429LabelsToArray(input: Arinc429): GridState {
  const labels = Object.entries(input.labels).map(([key, value], index) => ({ 'id' : index, 'label': key, 'rate': value }));
  return { loading: true, rows: labels};
}

function arrayToA429Labels(input: GridState): Arinc429  {

    // Initialize an empty object to hold the transformed labels
    const transformedLabels: { [key: string]: number } = {};

    // Iterate over the array and create key-value pairs using 'label' and 'rate'
    input.rows.forEach((item: { label: string, rate: number }) => {

      transformedLabels[item.label] = item.rate;
  });

    // Return the transformed object
    return {
            labels: transformedLabels
        }
};


const Sidebar: React.FC = () => {

  const { openSnackbar } = useSnackbar();

  const fileInputRef = useRef<HTMLInputElement>(null);
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
          let json_from_file = JSON.parse(e.target?.result as string);
          const loadedState: FormState = 
          {
              version: json_from_file.version,
              url:  json_from_file.url,
              date_time_source:  json_from_file.date_time_source,
              poweroff_delay:  json_from_file.poweroff_delay,
              update_status:  json_from_file.update_status,
              ahrs: json_from_file.ahrs,
              wog_source:json_from_file.wog_source,
              // Transform A429 labels props to an array (grid compatible)
              a429Rows: a429LabelsToArray(json_from_file.arinc429),
              ignored_bits: json_from_file.ignored_bits     
          };          

          store.dispatch(setFormState(loadedState));
        }
        catch (error) 
        {
          console.error('Error parsing JSON file:', error);
          alert('Error loading file. Please make sure it\'s a valid JSON file.');
        }

      };
      reader.readAsText(file);
      // So next time we reselect that file, it helps system think there was a change
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };


  const handleGenerateJson = () => {

    const uniqueItems = new Set(Object.entries(formData.a429Rows.rows).map(([key, value]) => value.label));
    const hasDuplicate = uniqueItems.size !== formData.a429Rows.rows.length;

    console.log(uniqueItems);
    if( hasDuplicate )
    {
      openSnackbar("A429 labels contains duplicates. Please fix then retry", 'error');
      return;
    }
    
    const modifiedState: ConfigState = 
    {
        version: formData.version,
        url:  formData.url,
        date_time_source:  formData.date_time_source,
        poweroff_delay:  formData.poweroff_delay,
        update_status:  formData.update_status,

        ahrs: formData.ahrs,
        wog_source:formData.wog_source,
        arinc429: arrayToA429Labels(formData.a429Rows),
        ignored_bits: formData.ignored_bits     
    };


    if (!configSchemaValidator(modifiedState) )
    {
        const allErrors = (configSchemaValidator.errors || []).map(error => `${error.instancePath}: ${error.message}`);
        openSnackbar(allErrors.join(', '), 'error');
    }
    else 
    {
      // Generate JSON
        const jsonOutput = JSON.stringify(modifiedState, null, 2);

        // const f = new FileManager();
        // f.Save(jsonOutput);



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



    </div>
  );
};

export default Sidebar;
