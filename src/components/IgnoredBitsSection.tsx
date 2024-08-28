import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/types';
import { updateField } from '../store/formSlice';

import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';



const IgnoredBitsSection: React.FC = () => {

  const dispatch = useDispatch();
  const { ignored_bits } = useSelector((state: RootState) => state.form);

  return (
    <>

<FormGroup style={{ height: 30 }} >
        <FormControlLabel 
          control={
            <Checkbox 
              checked={ignored_bits.arinc_429_data_not_present}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.arinc_429_data_not_present', value: e.target.checked}))}
              name="arinc_429_data_not_present"
            />
          }
          label="ARINC 429 Data Not Present"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={ignored_bits.adiu_data_not_present}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.adiu_data_not_present', value: e.target.checked }))}
              name="adiu_data_not_present"
            />
          }
          label="ADIU Data Not Present"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={ignored_bits.imu_data_not_present}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.imu_data_not_present', value: e.target.checked }))}
              name="imu_data_not_present"
            />
          }
          label="IMU Data Not Present"
        />
      </FormGroup>

      <FormGroup style={{ height: 30 }} >
        <FormControlLabel 
          control={
            <Checkbox 
              checked={ignored_bits.arinc_429_data_not_present}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.arinc_429_data_not_present', value: e.target.checked}))}
              name="arinc_429_data_not_present"
            />
          }
          label="ARINC 429 Data Not Present"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={ignored_bits.adiu_data_not_present}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.adiu_data_not_present', value: e.target.checked }))}
              name="adiu_data_not_present"
            />
          }
          label="ADIU Data Not Present"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={ignored_bits.imu_data_not_present}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.imu_data_not_present', value: e.target.checked }))}
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
