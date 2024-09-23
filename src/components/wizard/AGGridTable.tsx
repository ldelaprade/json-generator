

import React, { useState, useCallback, useRef, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types';
import { GridRow, addRow, addLabel, removeRow as _removeRow, 
    updateLabel, updateRate, updateRow, setRows  } from '../../store/formSlice';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent, RowNode, CellValueChangedEvent, GridApi  } from 'ag-grid-community';
import { ICellEditorParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../A429GridTable.css';


const AGGridTable: React.FC = () => {

    const rowData = useSelector((state: RootState) => state.form.a429Rows.rows);
    const [locateLabel, setLocateLabel] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const dispatch = useDispatch();
    const gridRef = useRef<AgGridReact>(null);


    const scrollToLastAddedRow = useCallback(() => {
        if (gridRef.current && gridRef.current.api) 
        {
            const itemWithHigherID = rowData.reduce(
                (prev, current) => { return (prev && prev.id > current.id) ? prev : current },
                {id:0, label: "???", rate: 0} );

            const rowIndex = rowData.findIndex(row => row.id === itemWithHigherID.id); 
            if (rowIndex !== -1 ) {                
                const lastAddedRowNode = gridRef.current.api.getRowNode(`${rowIndex}`);

                if (lastAddedRowNode) {
                    gridRef.current.api.ensureNodeVisible(lastAddedRowNode, 'middle');
                    //setTimeout(() => {gridRef.current?.api.setFocusedCell(rowIndex, 'label');}, 100);
                }
            }
        }
    }, [rowData]);

    const handleAddRow = () => {
        
        if(locateLabel.trim().length > 0) 
            dispatch(addLabel(locateLabel.trim()));
        else
            dispatch(addRow());

        scrollToLastAddedRow();

    };

    const handleRemoveAll = () => {
        dispatch(setRows([]));
    };

    const removeRow = (id: string) => {
        const rowId: number = Number(id);
        dispatch(_removeRow(rowId));
    };  

    // Handle the cell value change
    const onCellValueChanged = (event: CellValueChangedEvent) => {
            const { data, colDef } = event;
            switch(colDef.field )
            {
                case 'label':
                    dispatch(updateLabel({ index: data.id, value: event.newValue}));
                    break;

                case 'rate':
                    dispatch(updateRate({ index: data.id, value: event.newValue}));
                    break;

            }
    };


    const scrollToSearchedLabelRow = useCallback(() => {
        if (gridRef.current && gridRef.current.api) {
           const rowIndex = rowData.findIndex(row => row.label === locateLabel); 
           if (rowIndex !== -1 ) {                
                const foundRowNode = gridRef.current.api.getRowNode(`${rowIndex}`);
                if (foundRowNode) {
                    gridRef.current.api.ensureNodeVisible(foundRowNode, 'bottom');
                    setTimeout(() => {gridRef.current?.api.setFocusedCell(rowIndex, 'label');}, 300);
                }
            }
        }
    }, [rowData, locateLabel]);

  
    const handleLocateLabelChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLocateLabel(event.target.value);
    }


    const handleSearchLabelInRows = () => {

        const rowIndex = rowData.findIndex(row => row.label === locateLabel); 
        if (rowIndex !== -1 && gridRef.current && gridRef.current.api) 
        {
            scrollToSearchedLabelRow();
        } 
        else 
        {
            alert(`Label "${locateLabel}" not found`);
            setShowDialog(true);
        }        

    };


    const columnDefs: ColDef[] = [
        { field: 'id', hide: false, sortable: false },
        { 
            field: 'label', editable: true, sortable: false,
            singleClickEdit: true,  // Start editing on single click
            valueSetter: (params) => {
                // Create a new copy of the object to avoid direct mutation
                const newData = { ...params.data, label: params.newValue };
                params.api.applyTransaction({ update: [newData] });
                return true;  // Return true to indicate value was set
            }        

        },
        { 
            field: 'rate', editable: true, sortable: false,
            valueParser: (params) => Number(params.newValue),
            //cellEditor: DropdownCellEditor, // Use dropdown editor
            singleClickEdit: true,  // Start editing on single click
            valueSetter: (params) => {
                // Create a new copy of the object to avoid direct mutation
                const newData = { ...params.data, rate: params.newValue };
                params.api.applyTransaction({ update: [newData] });
                return true;  // Return true to indicate value was set
            }
        },
        {
        headerName: 'Actions',
        cellRenderer: (params: any) => (
            <button 
            style={{ backgroundColor: 'transparent', cursor: 'pointer', margin: 0, border: 0  }}
            onClick={() => removeRow(params.node.id)}>🗑️</button>
        ),
        },
    ];


    return (
        <div>
            <button style={{ cursor: 'pointer', margin: 1, border: 0  }} onClick={handleRemoveAll} >Remove all</button>
            <button  style={{ cursor: 'pointer', margin: 1, border: 0  }} onClick={handleAddRow}>Add Row</button>
            <input type="text"  placeholder= "Label - to Add or Search"  onChange={handleLocateLabelChange} />
            <button style={{ backgroundColor: 'transparent', cursor: 'pointer', margin: 0, border: 0  }} onClick={handleSearchLabelInRows}  disabled={locateLabel.trim().length < 1}>🔍</button>

            <div className="grid-table-container">
                <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                    <AgGridReact
                        rowHeight={25} // Set the height of rows globally (in pixels)   
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        onCellValueChanged={onCellValueChanged}
                        animateRows={false}
                        getRowId={(params) => ""+params.data.id}
                    />
                </div>
            </div>
        </div>
  );
};

export default AGGridTable;
