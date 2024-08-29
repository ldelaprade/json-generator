import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types'; // You'll need to create this
import { updateField } from '../../store/formSlice'; // You'll need to move this to a separate file

import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';



const VersionUrlSection: React.FC = () => {

  const dispatch = useDispatch();
  const { version, url, date_time_source, poweroff_delay, update_status } = useSelector((state: RootState) => state.form);



  return (
    <>
        <TextField
                fullWidth
                margin="dense"
                name="version"
                label="Version"
                value={version}
                onChange={(e) => dispatch(updateField({ path: 'version', value: e.target.value }))}

        />

        <TextField
                fullWidth
                margin="dense"
                name="url"
                label="URL"
                value={url}
                onChange={(e) => dispatch(updateField({ path: 'url', value: e.target.value }))}

        />

        <FormControlLabel
                control={
                <Checkbox
                    checked={update_status}
                    onChange={(e) => dispatch(updateField({ path: 'update_status', value: e.target.checked }))}
                    name="update_status"
                />
                }
                label="Update Status"
        />

        <FormControl fullWidth margin="normal">
                <InputLabel>Date Time Source</InputLabel>
                <Select
                value={date_time_source}
                onChange={(e) => dispatch(updateField({ path: 'date_time_source', value: e.target.value as string}))}
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
            value={poweroff_delay}
            onChange={(e) => dispatch(updateField({ path: 'poweroff_delay', value: e.target.value}))}
        />

    </>
  );
};

export default VersionUrlSection;
