import React, { useEffect, useRef, useState } from 'react';

import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' }
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];

function DataGridDemo2() {

    const inputRef = useRef(null);
    // const [count, setCount] = useState(0);

    // useEffect(() => {
    //     let resizeObserverEntries: any[] = [];
    
    //     const observer = new ResizeObserver((entries)=>{
    //         resizeObserverEntries = entries
    //     })

    //     if(inputRef.current) observer.observe(inputRef.current);

    //     return () => {
    //         resizeObserverEntries.forEach((entry)=>entry.target.remove());
    //         observer.disconnect();
    //     }
    // },[])



  return (
    <div style={{ position: 'sticky', width : '50%' }}>
    <DataGrid columns={columns} rows={rows} />;
    </div>
  );
}


export default DataGridDemo2;