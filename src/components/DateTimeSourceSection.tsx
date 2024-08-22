import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';

interface Props {
  formData: {
    date_time_source: string;
    poweroff_delay: number;
  };
  onChange: (name: string, value: any) => void;
}

const DateTimeSourceSection: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <>
      <h2>Date Time Source and Poweroff Delay</h2>
      <FormControl fullWidth margin="normal">
        <InputLabel>Date Time Source</InputLabel>
        <Select
          value={formData.date_time_source}
          onChange={(e) => onChange('date_time_source', e.target.value as string)}
        >
          <MenuItem value="A429">A429</MenuItem>
          <MenuItem value="GPS">GPS</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        label="Poweroff Delay"
        type="number"
        value={formData.poweroff_delay}
        onChange={(e) => onChange('poweroff_delay', Number(e.target.value))}
      />
    </>
  );
};

export default DateTimeSourceSection;