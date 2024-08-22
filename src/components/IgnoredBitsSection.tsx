import React from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';

interface Props {
  formData: {
    core: {
      [key: string]: boolean;
    };
    arinc_429_data_not_present: boolean;
    adiu_data_not_present: boolean;
    imu_data_not_present: boolean;
  };
  onChange: (value: any) => void;
}

const IgnoredBitsSection: React.FC<Props> = ({ formData, onChange }) => {
  const handleCoreChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...formData,
      core: {
        ...formData.core,
        [name]: event.target.checked
      }
    });
  };

  const handleOtherChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...formData,
      [name]: event.target.checked
    });
  };

  return (
    <>
      <h2>Ignored Bits</h2>
      <h3>Core</h3>
      <FormGroup>
        {Object.entries(formData.core).map(([key, value]) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                checked={value}
                onChange={handleCoreChange(key)}
                name={key}
              />
            }
            label={key.split('_').join(' ')}
          />
        ))}
      </FormGroup>
      <h3>Other</h3>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.arinc_429_data_not_present}
              onChange={handleOtherChange('arinc_429_data_not_present')}
              name="arinc_429_data_not_present"
            />
          }
          label="ARINC 429 Data Not Present"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.adiu_data_not_present}
              onChange={handleOtherChange('adiu_data_not_present')}
              name="adiu_data_not_present"
            />
          }
          label="ADIU Data Not Present"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.imu_data_not_present}
              onChange={handleOtherChange('imu_data_not_present')}
              name="imu_data_not_present"
            />
          }
          label="IMU Data Not Present"
        />
      </FormGroup>
    </>
  );
};

export default IgnoredBitsSection;
