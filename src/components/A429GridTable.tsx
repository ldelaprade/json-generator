import React, { useState, useEffect, useRef } from 'react';
import './A429GridTable.css';

import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { addRow, removeRow, updateLabel, updateRate, setRows  } from '../store/formSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/types';


const A429GridTable: React.FC = () => {

  const rows = useSelector((state: RootState) => state.form.a429Rows.rows);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [lastAddedIndex, setLastAddedIndex] = useState<number | null>(null);


  useEffect(() => {
    if (lastAddedIndex !== null && inputRefs.current[lastAddedIndex]) {
      inputRefs.current[lastAddedIndex]?.focus();
      setLastAddedIndex(null);
    }
  }, [lastAddedIndex]);


  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  


  const handleAddRow = () => {
    dispatch(addRow());
    setLastAddedIndex(rows.length);    
  };

  const handleRemoveRow = (index: number) => {
    dispatch(removeRow(index));
   // setError(null);
    inputRefs.current = inputRefs.current.filter((_, i) => i !== index);
  };


  const handleLabelChange = (index: number, value: string) => {
      dispatch(updateLabel({ index, value }));
    };

  // Validate the input onBlur
  const handleBlur = (index: number, value: string) => {
    const isDuplicate = rows.some((row, i) => i !== index && row.label === value);
    const isEmpty = !value.trim();
    const isError = isDuplicate || isEmpty;
    const allErrors: string[] = [];

    if(isDuplicate) 
    {
      allErrors.push(`Label "${value}" already exists in Table. Labels must be uniques.`);
    }
    if(isEmpty)
    {
      allErrors.push(`Empty Label in table !`);
    }      
    if( isError )
    {
      setErrors(allErrors);
      setShowError(true);
    }
    else
    {
      setErrors([]); // clear error if input is valid      
      setShowError(false);
    }

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
      <Snackbar open={showError} >
        <Alert  severity="error">
          {errors.join(', ')}
        </Alert>
      </Snackbar>

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
                    placeholder={row.label ? '' : "Please, enter a valid label"}
                    onChange={(e) => handleLabelChange(index, e.target.value)}
                    onBlur={(e) => handleBlur(index, e.target.value)}
                    // that will sync last row position
                    ref={(el) => (inputRefs.current[index] = el)}
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