import React, { useState, useRef } from 'react';
import { Container, Button, makeStyles, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Ajv from 'ajv';
import VersionUrlSection from './components/VersionUrlSection';
import AhrsSection from './components/AhrsSection';
import DateTimeSourceSection from './components/DateTimeSourceSection';
import WogSourceSection from './components/WogSourceSection';
import Arinc429Section from './components/Arinc429Section';
import IgnoredBitsSection from './components/IgnoredBitsSection';
import schemaModel from './schema_model.json';

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schemaModel);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    version: '',
    url: '',
    update_status: false,
    ahrs: {
      frequency: 0,
      body_frame: {
        yaw: 0,
        pitch: 0,
        roll: 0,
        orientation_mode: -1
      }
    },
    date_time_source: 'A429',
    poweroff_delay: 0,
    wog_source: {
      source: 'A429',
      arinc429: {
        label: '0',
        bit: 0
      }
    },
    arinc429: {
      labels: {}
    },
    ignored_bits: {
      core: {
        emmc_warning: false,
        emmc_error: false,
        gps_health: false,
        gps_antenna_open: false,
        gps_antenna_short: false,
        gps_antenna_detection: false,
        cellular_modem_health: false,
        cellular_main_antenna_open: false,
        cellular_main_antenna_short: false,
        cellular_main_antenna_detection: false,
        cellular_diversity_antenna_open: false,
        cellular_diversity_antenna_short: false,
        cellular_diversity_antenna_detection: false,
        cellular_modem_temperature_check: false,
        processor_temperature_check: false,
        backup_kernel_checksum_invalid: false,
        backup_system_partition_checksum_invalid: false
      },
      arinc_429_data_not_present: false,
      adiu_data_not_present: false,
      imu_data_not_present: false
    }
  });


  const [errors, setErrors] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateField = (name: string, value: any) => {
    const testData = { ...formData, [name]: value };
    validate(testData);
    const fieldErrors = (validate.errors || [])
      .filter(error => error.dataPath.startsWith('.' + name))
      .map(error => `${error.dataPath}: ${error.message}`);
    setErrors(fieldErrors);
    setShowError(fieldErrors.length > 0);
  };

  
  const handleGenerateJson = () => {

    if (!validate(formData)) 
    {
        const allErrors = (validate.errors || []).map(error => `${error.dataPath}: ${error.message}`);
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


  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowError(false);
  };


  const handleLoadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setFormData(json);
        } catch (error) {
          console.error('Error parsing JSON file:', error);
          alert('Error loading file. Please make sure it\'s a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <h1>JSON Generator</h1>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileLoad}
        accept=".json"
      />
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleLoadClick}
        className={classes.button}
      >
        Load Configuration
      </Button>
      <VersionUrlSection formData={formData} onChange={handleChange} />
      <AhrsSection formData={formData.ahrs} onChange={(value) => handleChange('ahrs', value)} />
      <DateTimeSourceSection formData={formData} onChange={handleChange} />
      <WogSourceSection formData={formData.wog_source} onChange={(value) => handleChange('wog_source', value)} />
      <Arinc429Section formData={formData.arinc429} onChange={(value) => handleChange('arinc429', value)} />
      <IgnoredBitsSection formData={formData.ignored_bits} onChange={(value) => handleChange('ignored_bits', value)} />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGenerateJson}
        className={classes.button}
      >
        Generate JSON
      </Button>

      <Snackbar open={showError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          {errors.join(', ')}
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default App;
