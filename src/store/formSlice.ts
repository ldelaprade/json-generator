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

export interface Arinc429Labels {
  [key: string]: number;
}
export interface Arinc429
{
    labels: Arinc429Labels
}


// we need an array for arinc429 labels grid
export interface GridRow {
  label: string;
  rate: number;
}

export interface GridState {
  rows: GridRow[];
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
    a429Rows: GridState;
    ignored_bits: IgnoredBits;
  }


  // const generateInitialLabels = (): Arinc429Labels => {
  //   const labels: Arinc429Labels = {};
  //   const prefixes = ['0', '01'];
  //   const suffixes = ['', '-0', '-1', '-2', '-3'];
  
  //   prefixes.forEach(prefix => {
  //     suffixes.forEach(suffix => {
  //       const label = `${prefix}${suffix}`;
  //       labels[label] = 0;
  //     });
  //   });
  
  //   return labels;
  // };

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

    a429Rows: {
      rows: [],
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
    },

    // Specifics to a429 labels array
     
    addRow: (state) => {
      state.a429Rows.rows.push({ label: '', rate: 0 });
    },
    removeRow: (state, action: PayloadAction<number>) => {
      state.a429Rows.rows.splice(action.payload, 1);
    },
    updateLabel: (state, action: PayloadAction<{ index: number; value: string }>) => {
      const { index, value } = action.payload;
      state.a429Rows.rows[index].label = value;
    },
    updateRate: (state, action: PayloadAction<{ index: number; value: number }>) => {
      const { index, value } = action.payload;
      state.a429Rows.rows[index].rate = value;
    },
    setRows: (state, action: PayloadAction<GridRow[]>) => {
      state.a429Rows.rows = action.payload;
    },    


  }
});


export const { updateField, setFormState, addRow, removeRow, updateLabel, updateRate, setRows } = formSlice.actions;
export default formSlice.reducer;
