import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/types';
import { updateField } from '../store/formSlice';

import { TextField } from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';



const AhrsSection: React.FC = () => {

  const dispatch = useDispatch();
  const { ahrs } = useSelector((state: RootState) => state.form);

  return (
    <>

      <FormControl fullWidth margin="normal">
        <InputLabel>Frequency</InputLabel>
        <Select
          value={ahrs.frequency}
          onChange={(e) => dispatch(updateField({ path: 'ahrs.frequency', value: e.target.value }))}
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
        value={ahrs.body_frame.yaw}
        onChange={(e) => dispatch(updateField({ path: 'ahrs.body_frame.yaw', value: e.target.value }))}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Pitch"
        type="number"
        value={ahrs.body_frame.pitch}
        onChange={(e) => dispatch(updateField({ path: 'ahrs.body_frame.pitch', value: e.target.value }))}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Roll"
        type="number"
        value={ahrs.body_frame.roll}
        onChange={(e) => dispatch(updateField({ path: 'ahrs.body_frame.roll', value: e.target.value }))}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Orientation Mode</InputLabel>
        <Select
          value={ahrs.body_frame.orientation_mode}
          onChange={(e) => dispatch(updateField({ path: 'ahrs.body_frame.orientation_mode', value: e.target.value }))}
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