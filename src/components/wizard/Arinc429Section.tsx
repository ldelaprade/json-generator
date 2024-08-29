import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types';
import { updateField } from '../../store/formSlice';

import { TextField } from '@material-ui/core';
import { FormGroup, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Arinc429Labels } from '../../store/formSlice';

import configSchema from '../../store/schema_model.json';

import A429GridTable from '../A429GridTable'


const Arinc429Section: React.FC = () => {

  const dispatch = useDispatch();
  const { arinc429 } = useSelector((state: RootState) => state.form);

  const { register } = useForm<Arinc429Labels>();

  const A429LabelPath = (label: string) => {
      return "arinc429.labels." + label;
  };  

  // <FormGroup className="arinc-labels">
  //   {Object.keys(configSchema.properties.arinc429.properties.labels.properties).map((label) => (
  //     <FormControl margin="normal">
  //     <InputLabel>{label}</InputLabel>
  //     <Select className="arinc-label"

  //       value={arinc429.labels[label]}
  //       onChange={(e) => dispatch(updateField({ path: A429LabelPath(label), value: e.target.value }))}
  //       >
  //       <MenuItem value={0}>0</MenuItem>
  //       <MenuItem value={1}>1</MenuItem>
  //       <MenuItem value={2}>2</MenuItem>
  //       <MenuItem value={4}>4</MenuItem>
  //       <MenuItem value={81}>8</MenuItem>
  //       <MenuItem value={16}>16</MenuItem>            
  //     </Select>
  //     </FormControl>
  //   ))}
  // </FormGroup>

  return (
    <>
      <A429GridTable />
    </>
  );
};



export default Arinc429Section;
