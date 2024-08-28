import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define your FormState interface here

interface AHRS2BodyFrame 
{
    yaw: number,
    pitch: number,
    roll: number,
    orientation_mode: number
}

interface AHRS 
{
    frequency: number;
    body_frame: AHRS2BodyFrame;
}

interface WOGSource2Arinc429
{
    label: string,
    bit: number
}

interface WOGSource 
{
    source: string;
    arinc429: WOGSource2Arinc429
}

interface Arinc429
{
    labels: {}
}

interface IgnoredBitsCore
{
    emmc_warning: boolean,
    emmc_error: boolean,
    gps_health: boolean,
    gps_antenna_open: boolean,
    gps_antenna_short: boolean,
    gps_antenna_detection: boolean,
    cellular_modem_health: boolean,
    cellular_main_antenna_open: boolean,
    cellular_main_antenna_short: boolean,
    cellular_main_antenna_detection: boolean,
    cellular_diversity_antenna_open: boolean,
    cellular_diversity_antenna_short: boolean,
    cellular_diversity_antenna_detection: boolean,
    cellular_modem_temperature_check: boolean,
    processor_temperature_check: boolean,
    backup_kernel_checksum_invalid: boolean,
    backup_system_partition_checksum_invalid: boolean
}

interface IgnoredBits 
{
    core: IgnoredBitsCore,
    arinc_429_data_not_present: boolean,
    adiu_data_not_present: boolean,
    imu_data_not_present: boolean
}
  
export interface FormState {
    version: string;
    url: string;
    date_time_source: string;
    poweroff_delay: number;
    update_status: boolean,

    ahrs: AHRS;
    wog_source: WOGSource;
    arinc429: Arinc429;
    ignored_bits: IgnoredBits;
  }

const initialState: FormState = 
{
    version: '',
    url: '',
    date_time_source: 'A429',
    poweroff_delay: 0,
    update_status: false,

    ahrs: {
        frequency: 0,
      body_frame: {
        yaw: 0,
        pitch: 0,
        roll: 0,
        orientation_mode: -1
      }
    },

    wog_source: {
      source: 'A429',
      arinc429: {
        label: '0',
        bit: 0
      }
    },

    arinc429: {
      labels: {}
    },

    ignored_bits: {
      core: {
        emmc_warning: false,
        emmc_error: false,
        gps_health: false,
        gps_antenna_open: false,
        gps_antenna_short: false,
        gps_antenna_detection: false,
        cellular_modem_health: false,
        cellular_main_antenna_open: false,
        cellular_main_antenna_short: false,
        cellular_main_antenna_detection: false,
        cellular_diversity_antenna_open: false,
        cellular_diversity_antenna_short: false,
        cellular_diversity_antenna_detection: false,
        cellular_modem_temperature_check: false,
        processor_temperature_check: false,
        backup_kernel_checksum_invalid: false,
        backup_system_partition_checksum_invalid: false
      },
      arinc_429_data_not_present: false,
      adiu_data_not_present: false,
      imu_data_not_present: false
    }
  };

// Create a slice for the form data
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ path: string; value: any }>) => {
      const { path, value } = action.payload;
      let current: any = state;
      const fields = path.split('.');
      for (let i = 0; i < fields.length - 1; i++) {
        current = current[fields[i]];
      }
      current[fields[fields.length - 1]] = value;
    },
    setFormState: (state, action: PayloadAction<FormState>) => {
      return action.payload;
    }
  }
});


export const { updateField, setFormState } = formSlice.actions;
export default formSlice.reducer;
