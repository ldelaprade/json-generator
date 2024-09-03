import React, { useState, useEffect } from 'react';
import './A429GridTable.css';


import { addRow, removeRow, updateLabel, updateRate, setRows  } from '../store/formSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Arinc429Labels } from '../store/formSlice';


type Row = {
  id: number;
  label: string;
  rate: number;
};

const A429GridTable: React.FC = () => {

  // const dispatch = useDispatch();
  // const { arinc429 } = useSelector((state: RootState) => state.form);
  // const { register } = useForm<Arinc429Labels>();

  const rows = useSelector((state: RootState) => state.form.a429Rows.rows);
  const dispatch = useDispatch();


  // const [a429labels, setA429labels] = useState<Arinc429Labels>({});
  // const [rows, setRows] = useState<Row[]>([]);
  // const [nextId, setNextId] = useState(1);


  // const gridRefredh = () => {
  //   const newRows: Row[] = [];
  //   const labels = a429labels;
  //   let id = 1;

  //   for (const label in labels) {
  //     newRows.push({ id, label, rate: labels[label] });
  //     id++;
  //   }

  //   setRows(newRows);
  //   setNextId(id);
  // }

  // useEffect(() => {
  //   const newRows: Row[] = [];
  //   const labels = a429labels;
  //   let id = 1;

  //   for (const label in labels) {
  //     newRows.push({ id, label, rate: labels[label] });
  //     id++;
  //   }

  //   setRows(newRows);
  //   setNextId(id);
  // }, [a429labels]);

  const handleAddRow = () => {
    dispatch(addRow());
  };

  const handleRemoveRow = (index: number) => {
    dispatch(removeRow(index));
  };

  const handleLabelChange = (index: number, value: string) => {
    dispatch(updateLabel({ index, value }));
  };

  const handleRateChange = (index: number, value: number) => {
    dispatch(updateRate({ index, value }));
  };


  //function A429ModifiedState() {
  //   return rows.reduce((acc, row) => {
  //          acc[row.label] = row.rate;
  //         return acc;
  //       }, {} as { [key: string]: number });
  // }
  

  // const syncA429Backend = () => {
  //   setA429labels(A429ModifiedState());
  // }

  

  // const validateChange = () => {
  //   syncA429Backend();
  //   gridRefredh();
  // };


  // const addRow = () => {
  //   setRows([...rows, { id: nextId, label: '', rate: 0 }]);
  //   setNextId(nextId + 1);
  // };

  const removeAll = () => {
    dispatch(setRows([]));
  };

  // const removeRow = (id: number) => {
  //   setRows(rows.filter(row => row.id !== id));
  //   //syncA429Backend();
  // };

  // const updateRow = (id: number, field: keyof Row, value: string | number) => {
  //   setRows(rows.map(row => 
  //     row.id === id ? { ...row, [field]: value } : row
  //   ));
  // };


  const cellStyle: React.CSSProperties = {
    border: '1px solid ivory',
  };

    
  return (
    <>

      <div className="buttons">
      <button onClick={handleAddRow} className="add-btn">Add Label</button>
      <button onClick={removeAll} className="remove-all-btn">Remove all</button>
      </div>

      <div className="grid-table-container">     
        <table className="grid-table">
          <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ width: '45%' }}>Label</th>
              <th style={{ width: '45%' }} >Rate</th>
              <th style={{ width: '10%' }}> </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} >
                <td style={cellStyle}>
                  <input 
                    type="text"
                    value={row.label} 
                    onChange={(e) => handleLabelChange(index, e.target.value)}
                  />
                </td>

                <td style={cellStyle}><div className="grid-cell-overflow">
                  <select 
                    value={row.rate}
                    onChange={(e) => handleRateChange(index, Number(e.target.value))}
                  >
                    {[0, 1, 2, 4, 8, 16].map(rate => (
                      <option key={rate} value={rate.toString()}>{rate}</option>
                    ))}
                  </select>
                </div></td>
                <td style={cellStyle}><div>
                  <button
                    style={{ 
                      backgroundColor: 'transparent', 
                      cursor: 'pointer',
                      margin: 0,
                      border: 0 
                    }}                  
                    onClick={() => handleRemoveRow(index)}>🗑️</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default A429GridTable;