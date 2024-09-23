import React, { useState, useEffect, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowParams, 
  MuiEvent, GridRowEditStopParams, GridCellEditStopParams, 
  GridCellEditStopReasons, GridValueFormatter} from '@mui/x-data-grid';



import { fetchDataStart, fetchDataSuccess, updateDataItem, GridRow, GridState   } from '../../store/formSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types';


const columns: GridColDef<GridRow>[] = [
  {field: 'id', type: 'number'},
  {
    field: 'label',
    headerName: 'Label',
    width: 150,
    editable: true,
  },
  {
    field: 'rate',
    headerName: 'Rate',
    width: 150,
    editable: true,
  }
];


// function useApiRef() {
//   const myApiRef = useRef(null);
//   const _columns = useMemo(
//     () =>
//       columns.concat({
//         field: "__HIDDEN__",
//         width: 0,
//         renderCell: (params) => {
//           myApiRef.current = params.api;
//           return null;
//         }
//       }),
//     [columns]
//   );

//   return { myApiRef, columns: _columns };
// }

function DataGridDemo() 
{

  //const rows = useSelector((state: RootState) => state.form.a429Rows);
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.form.a429Rows.rows);
  //const loading = useSelector((state: RootState) => state.form.a429Rows.loading);


  // const simulateEscapeKeyPress = () => {
  //   const event = new KeyboardEvent('keydown', {
  //     key: 'Escape',
  //     code: 'Escape',
  //     which: 27,
  //     keyCode: 27,
  //     bubbles: true,
  //     cancelable: true
  //   });
    
  //   document.dispatchEvent(event);
  // };  


  const handleCellEditStop = React.useCallback(
    (params: GridCellEditStopParams, event: any) => {
      const { id, field, value } = params;

      if (params.reason === GridCellEditStopReasons.cellFocusOut) 
      {
        event.defaultMuiPrevented = true;
        //simulateEscapeKeyPress();
        // setTimeout(() => {
        //    params.value = apiRef.current.getCellValue(id, field);
        // }, 100)

        // restore old value as if cancelled
        const newValueItem =  { 'id': parseInt(id.toString()), field: field as keyof GridRow, 'value': value };  
        dispatch(updateDataItem(newValueItem));
      }
      else if (params.reason === GridCellEditStopReasons.enterKeyDown) 
      {

        if (event.target !== undefined && id !== undefined && field !== undefined && value !== undefined) 
        {
          //const originalValue = data.find(item => item.id === id)?.[field as keyof GridRow];
          const newValue =  event.target?.value;//here is the new value
          const newValueItem =  { 'id': parseInt(id.toString()), field: field as keyof GridRow, 'value': newValue };
          
          if (field !== undefined && newValue !== undefined && newValue !== value) {
            dispatch(updateDataItem(newValueItem));
          }
        }
      }
    },
    [dispatch]
  );

  // React.useEffect(() => {
  //   return apiRef.current.subscribeEvent("cellEditStop", handleCellEditStop);
  // }, [apiRef, handleCellEditStop]);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid rowHeight={25}
        
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}

        onCellEditStop={handleCellEditStop}
        //onRowEditStop={handleRowEditStop}
        pageSizeOptions={[100]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}


export default DataGridDemo;