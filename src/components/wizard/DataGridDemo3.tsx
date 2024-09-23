import React, { useRef, useEffect } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableInstance,
  type MRT_Cell,
  MRT_Row
} from 'material-react-table';

import { fetchDataStart, fetchDataSuccess, updateDataItem, GridRow, GridState, addRow, updateRow   } from '../../store/formSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types';

import '../A429GridTable.css';

const columns: MRT_ColumnDef<GridRow>[] = [
  {accessorKey: 'id', header: 'ID',},
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'rate',
    header: 'Rate',

  }
];

const DataGridDemo3: React.FC = () => {
  const dispatch = useDispatch();


  // Get data from the Redux store
  const data = useSelector((state: RootState) => state.form.a429Rows.rows);
  // Create a ref to store the table instance
  let tableInstanceRef = useRef<MRT_TableInstance<GridRow> | null>(null);


  // Example of fetching and setting the data (replace with actual data fetching logic)
  useEffect(() => {
    const fetchData = async () => {
      //dispatch(setPersons(data)); // Dispatch action to set persons in the Redux store
    };

    fetchData();
  }, [dispatch]);


  // // Handle row edit save
  // const handleSaveRow = (row: GridRow) => {
  //   // Dispatch the updateRow action to sync the edited row data with Redux
  //   dispatch(updateRow(row));
  // };


  // Handle row edit save
  const handleSaveRow = (values: any, table: any) => {
    // Find the row being edited by matching the 'id'
    const updatedRow = table.options.data.find((row: GridRow) => row.id === values.id);

    if (updatedRow) {
      // Merge the updated values
      const updatedA429Row = { ...updatedRow, ...values };

      // Dispatch the A429 Label action to sync the edited row data with Redux
      dispatch(updateRow(updatedA429Row));
    }
    table.setEditingRow(null); //exit editing mode
  };

  const handleAddRow = (table: MRT_TableInstance<GridRow>) => {
    dispatch(addRow());

    // // Trigger editing mode for the newly created row
    // setTimeout(() => {

    //   const newId = Math.max(...data.map((item) => item.id));      
    //   const rowIndex = table.getRowModel().rows.findIndex((row) => row.original.id === newId);
    //   if (rowIndex !== -1) {
    //     table.setEditingRow(data[rowIndex]); // Automatically start editing the new row
    //   }
    // }, 0); // Small timeout to ensure state update has occurred    

    // Trigger editing mode for the newly created row
    setTimeout(() => {
      const newId = Math.max(...data.map((item) => item.id));      

      if (tableInstanceRef.current) {
        const rowIndex = tableInstanceRef.current.getRowModel().rows.findIndex(
          (row) => row.original.id === newId
        );
        if (rowIndex !== -1) {
          tableInstanceRef.current.setEditingRow(data.findLast(item=>item.id==newId)); // Automatically start editing the new row
        }
      }
    }, 0); // Small timeout to ensure state update has occurred


  };


  return (
    <>
      <div className="buttons">
      <button onClick={handleAddRow} className="add-btn">Add Label</button>
      <button className="remove-all-btn">Remove all</button>
      </div>
      <div className="grid-table-container">  
        <MaterialReactTable 
          columns={columns} 
          data={data} 
          enableEditing={true} // Enable editing feature
          editDisplayMode='modal'
          enableMultiRemove={true}
          enableMultiRowSelection={true}
          enableBatchRowSelection={true}
          //onEditingRowSave={({ row, values }) => handleSaveRow({ ...row.original, ...values })}
          onEditingRowSave={({ table, values }) => handleSaveRow(values, table)} // Pass values and table
          tableInstanceRef={(instance) => (tableInstanceRef = instance)} // Keep reference to table instance
        />
      </div>
    </>);


};

export default DataGridDemo3;
