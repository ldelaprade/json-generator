import React, { useState, useEffect } from 'react';
import './A429GridTable.css';


import { addRow, removeRow, updateLabel, updateRate, setRows  } from '../store/formSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/types';


const A429GridTable: React.FC = () => {

  const rows = useSelector((state: RootState) => state.form.a429Rows.rows);
  const dispatch = useDispatch();

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



  const removeAll = () => {
    dispatch(setRows([]));
  };



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