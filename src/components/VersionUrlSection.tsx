import React from 'react';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';

interface Props {
  formData: {
    version: string;
    url: string;
    update_status: boolean;
  };
  onChange: (name: string, value: any) => void;
}

const VersionUrlSection: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        name="version"
        label="Version"
        value={formData.version}
        onChange={(e) => onChange('version', e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        name="url"
        label="URL"
        value={formData.url}
        onChange={(e) => onChange('url', e.target.value)}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.update_status}
            onChange={(e) => onChange('update_status', e.target.checked)}
            name="update_status"
          />
        }
        label="Update Status"
      />
    </>
  );
};

export default VersionUrlSection;
