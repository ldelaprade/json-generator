import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types';
import { updateField } from '../../store/formSlice';

import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';



const IgnoredBitsSection: React.FC = () => {

  const dispatch = useDispatch();
  const { ignored_bits } = useSelector((state: RootState) => state.form);

  return (
    <>

      <p style={{ fontSize: 10, color: '#069', marginBottom: 0 }}>Missing streams</p>
      <FormGroup style={{ height: 30 }} >
        <FormControlLabel style={{ width: '25%' }}
          control={
            <Checkbox 
              checked={ignored_bits.arinc_429_data_not_present}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.arinc_429_data_not_present', value: e.target.checked}))}
              name="Arinc_429_data_not_present"
            />
          }
          label="ARINC 429"
        />
        <FormControlLabel style={{ width: '25%' }}
          control={
            <Checkbox
              checked={ignored_bits.adiu_data_not_present}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.adiu_data_not_present', value: e.target.checked }))}
              name="adiu_data_not_present"
            />
          }
          label="ADIU Data"
        />
        <FormControlLabel style={{ width: '50%' }}
          control={
            <Checkbox
              checked={ignored_bits.imu_data_not_present}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.imu_data_not_present', value: e.target.checked }))}
              name="imu_data_not_present"
            />
          }
          label="IMU Data"
        />
      </FormGroup>


      <p style={{ fontSize: 10, color: '#069', marginBottom: 0 }}>Modem / Main Antenna</p>
      <FormGroup style={{ height: 30 }} >

        <FormControlLabel style={{ width: '25%' }}
          control={
            <Checkbox
              checked={ignored_bits.core.cellular_modem_health}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.cellular_modem_health', value: e.target.checked }))}
              name="cellular_modem_health"
            />
          }
          label="Modem Health"
        />
    
        <FormControlLabel style={{ width: '25%' }}
              control={
                <Checkbox
                  checked={ignored_bits.core.cellular_main_antenna_open}
                  onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.cellular_main_antenna_open', value: e.target.checked }))}
                  name="cellular_main_antenna_open"
                />
              }
              label="Ant. open"
        />
    
        <FormControlLabel style={{ width: '25%' }}
                  control={
                    <Checkbox
                      checked={ignored_bits.core.cellular_main_antenna_short}
                      onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.cellular_main_antenna_short', value: e.target.checked }))}
                      name="cellular_main_antenna_short"
                    />
                  }
                  label="Ant. short"
        />

        <FormControlLabel style={{ width: '25%' }}
                          control={
                            <Checkbox
                              checked={ignored_bits.core.cellular_main_antenna_detection}
                              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.cellular_main_antenna_detection', value: e.target.checked }))}
                              name="cellular_main_antenna_detection"
                            />
                          }
                          label="Ant. no detect"
        />

      </FormGroup>


      <p style={{ fontSize: 10, color: '#069', marginBottom: 0 }}>Modem / Diversity Antenna</p>
      <FormGroup style={{ height: 30 }} >

        <FormControlLabel style={{ width: '25%' }}
          control={
            <Checkbox
              checked={ignored_bits.core.cellular_modem_temperature_check}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.cellular_modem_temperature_check', value: e.target.checked }))}
              name="cellular_modem_temperature_check"
            />
          }
          label="Modem Heat"
        />


        <FormControlLabel style={{ width: '25%' }}
              control={
                <Checkbox
                  checked={ignored_bits.core.cellular_main_antenna_open}
                  onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.cellular_diversity_antenna_open', value: e.target.checked }))}
                  name="cellular_diversity_antenna_open"
                />
              }
              label="Ant. open"
        />
    
        <FormControlLabel style={{ width: '25%' }}
                  control={
                    <Checkbox
                      checked={ignored_bits.core.cellular_diversity_antenna_short}
                      onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.cellular_diversity_antenna_short', value: e.target.checked }))}
                      name="cellular_diversity_antenna_short"
                    />
                  }
                  label="Ant. short"
        />

        <FormControlLabel style={{ width: '25%' }}
                          control={
                            <Checkbox
                              checked={ignored_bits.core.cellular_diversity_antenna_detection}
                              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.cellular_diversity_antenna_detection', value: e.target.checked }))}
                              name="cellular_diversity_antenna_detection"
                            />
                          }
                          label="Ant. no detect"
        />

      </FormGroup>



      <p style={{ fontSize: 10, color: '#069', marginBottom: 0 }}>GPS / Antenna</p>
      <FormGroup style={{ height: 30 }} >
        <FormControlLabel style={{ width: '25%' }}
          control={
            <Checkbox
              checked={ignored_bits.core.gps_health}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.gps_health', value: e.target.checked }))}
              name="gps_health"
            />
          }
          label="GPS Health"
        />
    
        <FormControlLabel style={{ width: '25%' }}
              control={
                <Checkbox
                  checked={ignored_bits.core.gps_antenna_open}
                  onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.gps_antenna_open', value: e.target.checked }))}
                  name="gps_antenna_open"
                />
              }
              label="Ant. open"
        />
    
        <FormControlLabel style={{ width: '25%' }}
                  control={
                    <Checkbox
                      checked={ignored_bits.core.gps_antenna_short}
                      onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.gps_antenna_short', value: e.target.checked }))}
                      name="gps_antenna_short"
                    />
                  }
                  label="Ant. short"
        />

        <FormControlLabel style={{ width: '25%' }}
                          control={
                            <Checkbox
                              checked={ignored_bits.core.gps_antenna_detection}
                              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.gps_antenna_detection', value: e.target.checked }))}
                              name="gps_antenna_detection"
                            />
                          }
                          label="Ant. no detect"
        />

      </FormGroup>


      <p style={{ fontSize: 10, color: '#069', marginBottom: 0 }}>System (Processor & Partitions)</p>
      <FormGroup style={{ height: 30 }} >

      <FormControlLabel style={{ width: '25%' }}
          control={
            <Checkbox
              checked={ignored_bits.core.processor_temperature_check}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.processor_temperature_check', value: e.target.checked }))}
              name="processor_temperature_check"
            />
          }
          label="Proc. heat"
        />

        <FormControlLabel style={{ width: '25%' }}
          control={
            <Checkbox
              checked={ignored_bits.core.backup_kernel_checksum_invalid}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.backup_kernel_checksum_invalid', value: e.target.checked }))}
              name="backup_kernel_checksum_invalid"
            />
          }
          label="Backup Krnl checksum"
        />

        <FormControlLabel style={{ width: '50%' }}
          control={
            <Checkbox
              checked={ignored_bits.core.backup_system_partition_checksum_invalid}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.backup_system_partition_checksum_invalid', value: e.target.checked }))}
              name="backup_system_partition_checksum_invalid"
            />
          }
          label="Backup sys part. checksum"
        />                


      </FormGroup>


      <p style={{ fontSize: 10, color: '#069', marginBottom: 0 }}>EMMC (Disk space)</p>
      <FormGroup style={{ height: 30 }} >
        <FormControlLabel style={{ width: '25%' }}
          control={
            <Checkbox 
              checked={ignored_bits.core.emmc_warning}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.emmc_warning', value: e.target.checked}))}
              name="emmc_warning"
            />
          }
          label="Warning"
        />
        <FormControlLabel style={{ width: '75%' }}
          control={
            <Checkbox
              checked={ignored_bits.core.emmc_error}
              onChange={(e) => dispatch(updateField({ path: 'ignored_bits.core.emmc_error', value: e.target.checked }))}
              name="emmc_error"
            />
          }
          label="Error"
        />
      </FormGroup>


    </>
  );
};

export default IgnoredBitsSection;
