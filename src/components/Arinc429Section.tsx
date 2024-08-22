import React, { useState } from 'react';
import { TextField, Button, IconButton, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  input: {
    marginRight: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  editField: {
    width: '100%',
  },
}));

interface Props {
  formData: {
    labels: { [key: string]: number };
  };
  onChange: (value: any) => void;
}

const Arinc429Section: React.FC<Props> = ({ formData, onChange }) => {
  const classes = useStyles();
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');
  const [editingLabel, setEditingLabel] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAddLabel = () => {
    if (newLabel && newValue) {
      onChange({
        labels: {
          ...formData.labels,
          [newLabel]: Number(newValue)
        }
      });
      setNewLabel('');
      setNewValue('');
    }
  };

  const handleRemoveLabel = (label: string) => {
    const newLabels = { ...formData.labels };
    delete newLabels[label];
    onChange({ labels: newLabels });
  };

  const handleEditStart = (label: string, value: number) => {
    setEditingLabel(label);
    setEditValue(value.toString());
  };

  const handleEditSave = () => {
    if (editingLabel !== null) {
      onChange({
        labels: {
          ...formData.labels,
          [editingLabel]: Number(editValue)
        }
      });
      setEditingLabel(null);
      setEditValue('');
    }
  };

  return (
    <div className={classes.root}>
      <h2>ARINC429 Labels</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="ARINC429 labels table">
          <TableHead>
            <TableRow>
              <TableCell>Label</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(formData.labels).map(([label, value]) => (
              <TableRow key={label}>
                <TableCell component="th" scope="row">
                  {label}
                </TableCell>
                <TableCell align="right">
                  {editingLabel === label ? (
                    <TextField
                      className={classes.editField}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      type="number"
                    />
                  ) : (
                    value
                  )}
                </TableCell>
                <TableCell align="right">
                  {editingLabel === label ? (
                    <Button onClick={handleEditSave} color="primary" size="small">
                      Save
                    </Button>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEditStart(label, value)} size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleRemoveLabel(label)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <TextField
          className={classes.input}
          label="New Label"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Value"
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddLabel}>
          Add Label
        </Button>
      </div>
    </div>
  );
};

export default Arinc429Section;
