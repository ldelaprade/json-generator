import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types'; // You'll need to create this
import { updateField } from '../../store/formSlice'; // You'll need to move this to a separate file
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


const WogSourceSection: React.FC = () => {

  const dispatch = useDispatch();
  const { wog_source } = useSelector((state: RootState) => state.form);

  return (
    <>
      <FormControl fullWidth margin="normal">
        <InputLabel>Source</InputLabel>
        <Select
          value={wog_source.source}
          onChange={(e) => dispatch(updateField({ path: 'wog_source.source', value: e.target.value as string}))}
        >
          <MenuItem value="A429">A429</MenuItem>
          <MenuItem value="Discrete">Discrete</MenuItem>
          <MenuItem value="Virtual">Virtual</MenuItem>
        </Select>
      </FormControl>
      {wog_source.source === 'A429' && (
        <>
          <TextField
            fullWidth
            margin="normal"
            name="label"
            label="A429 Label"
            value={wog_source.arinc429?.label}
            onChange={(e) => dispatch(updateField({ path: 'wog_source.arinc429.label', value: e.target.value }))}

          />            
          <TextField
            fullWidth
            margin="normal"
            label="ARINC429 Bit"
            type="number"
            value={wog_source.arinc429?.bit}
            onChange={(e) => dispatch(updateField({ path: 'wog_source.arinc429.bit', value: Number(e.target.value) }))}
            inputProps={{ min: 0, max: 31 }}
          />
        </>
      )}
    </>
  );
};

export default WogSourceSection;