import React, { useState } from 'react';
import './A429GridTable.css';

type Row = {
  id: number;
  label: string;
  sdi: '' | '0' | '1' | '2' | '3';
  rate: 0 | 1 | 2 | 4 | 8 | 16;
};

const A429GridTable: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [nextId, setNextId] = useState(1);

  const addRow = () => {
    setRows([...rows, { id: nextId, label: '', sdi: '', rate: 0 }]);
    setNextId(nextId + 1);
  };

  const removeRow = (id: number) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const updateRow = (id: number, field: keyof Row, value: string | number) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };


  const cellStyle: React.CSSProperties = {
    border: '1px solid ivory',
  };

    
  return (
    <>
      <button onClick={addRow} className="add-btn">Add Label</button>
      <div className="grid-table-container">     
        <table className="grid-table">
          <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ width: '30%' }}>Label</th>
              <th style={{ width: '30%' }}>SDI</th>
              <th style={{ width: '20%' }} >Rate</th>
              <th style={{ width: '5%' }}> </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id} >
                <td style={cellStyle}>
                  <input 
                    type="text"
                    value={row.label} 
                    onChange={(e) => updateRow(row.id, 'label', e.target.value)}
                  />
                </td>
                <td style={cellStyle}><div className="grid-cell-overflow">
                  <select 
                    value={row.sdi}
                    onChange={(e) => updateRow(row.id, 'sdi', e.target.value as Row['sdi'])}
                  >
                    <option value="">None</option>
                    <option value="-0">0</option>
                    <option value="-1">1</option>
                    <option value="-2">2</option>
                    <option value="-3">3</option>
                  </select>
                </div></td>
                <td style={cellStyle}><div className="grid-cell-overflow">
                  <select 
                    value={row.rate.toString()}
                    onChange={(e) => updateRow(row.id, 'rate', parseInt(e.target.value) as Row['rate'])}
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
                   onClick={() => removeRow(row.id)} className="remove-btn">🗑️</button>
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