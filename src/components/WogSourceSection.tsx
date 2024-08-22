import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';

interface Props {
  formData: {
    source: string;
    arinc429?: {
      label: string;
      bit: number;
    };
  };
  onChange: (value: any) => void;
}

const WogSourceSection: React.FC<Props> = ({ formData, onChange }) => {
  const handleChange = (name: string, value: any) => {
    onChange({
      ...formData,
      [name]: value
    });
  };

  const handleArinc429Change = (name: string, value: any) => {
    onChange({
      ...formData,
      arinc429: {
        ...formData.arinc429,
        [name]: value
      }
    });
  };

  return (
    <>
      <h2>WOG Source</h2>
      <FormControl fullWidth margin="normal">
        <InputLabel>Source</InputLabel>
        <Select
          value={formData.source}
          onChange={(e) => handleChange('source', e.target.value as string)}
        >
          <MenuItem value="A429">A429</MenuItem>
          <MenuItem value="Discrete">Discrete</MenuItem>
          <MenuItem value="Virtual">Virtual</MenuItem>
        </Select>
      </FormControl>
      {formData.source === 'A429' && (
        <>
          <TextField
            fullWidth
            margin="normal"
            name="label"
            label="A429 Label"
            value={formData.arinc429?.label}
            onChange={(e) => handleArinc429Change('label', e.target.value)}
          />            
          <TextField
            fullWidth
            margin="normal"
            label="ARINC429 Bit"
            type="number"
            value={formData.arinc429?.bit}
            onChange={(e) => handleArinc429Change('bit', Number(e.target.value))}
            inputProps={{ min: 0, max: 31 }}
          />
        </>
      )}
    </>
  );
};

export default WogSourceSection;