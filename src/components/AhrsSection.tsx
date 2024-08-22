import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';

interface Props {
  formData: {
    frequency: number;
    body_frame: {
      yaw: number;
      pitch: number;
      roll: number;
      orientation_mode: number;
    };
  };
  onChange: (value: any) => void;
}

const AhrsSection: React.FC<Props> = ({ formData, onChange }) => {
  const handleChange = (name: string, value: any) => {
    onChange({
      ...formData,
      [name]: value
    });
  };

  const handleBodyFrameChange = (name: string, value: any) => {
    onChange({
      ...formData,
      body_frame: {
        ...formData.body_frame,
        [name]: value
      }
    });
  };

  return (
    <>
      <h2>AHRS</h2>
      <FormControl fullWidth margin="normal">
        <InputLabel>Frequency</InputLabel>
        <Select
          value={formData.frequency}
          onChange={(e) => handleChange('frequency', e.target.value as number)}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        label="Yaw"
        type="number"
        value={formData.body_frame.yaw}
        onChange={(e) => handleBodyFrameChange('yaw', Number(e.target.value))}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Pitch"
        type="number"
        value={formData.body_frame.pitch}
        onChange={(e) => handleBodyFrameChange('pitch', Number(e.target.value))}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Roll"
        type="number"
        value={formData.body_frame.roll}
        onChange={(e) => handleBodyFrameChange('roll', Number(e.target.value))}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Orientation Mode</InputLabel>
        <Select
          value={formData.body_frame.orientation_mode}
          onChange={(e) => handleBodyFrameChange('orientation_mode', e.target.value as number)}
        >
          <MenuItem value={-1}>-1</MenuItem>
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default AhrsSection;