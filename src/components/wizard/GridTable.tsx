
import React, { useMemo, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types';
import { GridRow, addRow, updateRow  } from '../../store/formSlice';
import { MaterialReactTable, type MRT_ColumnDef, type MRT_Row, type MRT_TableInstance } from 'material-react-table';
import { Box, Button } from '@mui/material';

const GridTable: React.FC = () => {
    const rows = useSelector((state: RootState) => state.form.a429Rows.rows);
    const dispatch = useDispatch();
    const tableInstanceRef = useRef<MRT_TableInstance<GridRow> | null>(null);

  
    const columns = useMemo<MRT_ColumnDef<GridRow>[]>(
      () => [
        {
          accessorKey: 'label',
          header: 'Label',
          muiTableBodyCellEditTextFieldProps: {
            required: true,
          },
        },
        {
          accessorKey: 'rate',
          header: 'Rate',
          muiTableBodyCellEditTextFieldProps: {
            required: true,
            type: 'number',
            inputProps: { min: 0, step: 1 },
          },
        },
      ],
      []
    );

    const handleAddRow = () => {
        dispatch(addRow());

        const itemWithHigherID = rows.reduce(
            (prev, current) => { return (prev && prev.id > current.id) ? prev : current },
            {id:0, label: "???", rate: 0} );        


      };

    const handleSaveRow = ({ exitEditingMode, row, values }: any) => {
        dispatch(updateRow({ id: row.original.id, changes: values }));
        exitEditingMode(); // Close the modal
      };
  
    const validateCell = (cell: any) => {
      if (cell.column.id === 'label' && cell.value.trim() === '') {
        return 'Label is required';
      }
      if (cell.column.id === 'rate' && (isNaN(cell.value) || cell.value < 0)) {
        return 'Rate must be a non-negative number';
      }
      return true;
    };


    return (
        <>
            <div className="buttons">
            <button onClick={handleAddRow} className="add-btn">Add Label</button>
            </div>
    
            <div className="grid-table-container">
                <MaterialReactTable
                    columns={columns}
                    data={rows}
                    enableSorting
                    enableEditing
                    editDisplayMode="modal"
                    onEditingRowSave={handleSaveRow}

                    // Get the table instance
                    enableRowActions
                    positionActionsColumn="last"
                    muiTablePaperProps={{ component: 'div' }}

                    muiTableProps={{
                        ref: (tableRef) => {
                          const tableElementRef = tableRef as unknown as MRT_TableInstance<GridRow>;
                          if (tableElementRef) {
                            tableInstanceRef.current = tableElementRef;
                          }
                        },
                      }}

                />
            </div>
        </>
    );
  };



export default GridTable;
