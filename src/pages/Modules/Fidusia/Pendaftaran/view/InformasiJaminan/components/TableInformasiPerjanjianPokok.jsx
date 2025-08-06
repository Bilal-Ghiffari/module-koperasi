import React, { useMemo, useState } from 'react';
import {
  Checkbox,
  TextField,
  InputAdornment,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from '@mui/material';
import { formatRupiah } from '@/helpers/services/changeFormatRupiah';

const TableInformasiPerjanjianPokok = ({
  data = [],
  formik,
  showSelect = true,
  exchangeRates,
  onEditRow,
  onDeleteRow,
  calculateNominalRupiah,
  kurs,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleCheckboxChange = (row) => {
    const current = formik.values.perjanjian_pokok || [];
    const exists = current.some((item) => item.id === row.id);
    const newSelected = exists
      ? current.filter((item) => item.id !== row.id)
      : [...current, row];

    formik.setFieldValue('information_jaminan.perjanjianPokok', newSelected);
  };

  const columns = [
    ...(showSelect
      ? [
          {
            id: 'pilih',
            label: 'Pilih',
            cell: (row) => (
              <Checkbox
                color="primary"
                checked={formik.values?.perjanjian_pokok?.some(
                  (item) => item.id === row.id
                )}
                onChange={() => handleCheckboxChange(row)}
              />
            ),
          },
        ]
      : []),
    { id: 'no', label: 'No', align: 'center' },
    { id: 'kurs', label: 'Kurs', align: 'center' },
    {
      id: 'nominal',
      label: 'Nominal',
      align: 'center',
      cell: (row) => (
        <TextField
          variant="standard"
          onChange={(e) => {
            const value = parseFloat(e.target.value) || 0;
            const updatedData = data.map((item) =>
              item.id === row.id
                ? {
                    ...item,
                    nominal: value,
                    nominalRupiah: calculateNominalRupiah(item.kurs, value),
                  }
                : item
            );
            formik.setFieldValue(
              'information_jaminan.perjanjianPokok',
              updatedData
            );
          }}
          value={row.nominal}
          type="number"
        />
      ),
    },
    {
      id: 'nominalRupiah',
      label: 'Nominal Rupiah',
      align: 'center',
      cell: (row) => {
        const nominalRupiah =
          row.nominalRupiah !== undefined
            ? row.nominalRupiah
            : calculateNominalRupiah(row.kurs, row.nominal, exchangeRates);

        return formatRupiah(nominalRupiah);
      },
    },

    { id: 'sebutan', label: 'Sebutan', align: 'center' },
    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
      cell: (row) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onEditRow(row)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            sx={{ ml: 1 }}
            onClick={() => onDeleteRow(row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerSearch = searchTerm.toLowerCase();
    return data.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [data, searchTerm]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow hover key={row.id}>
                {columns.map((column) => {
                  const cell = column.cell
                    ? column.cell(row, index)
                    : row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {cell}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableInformasiPerjanjianPokok;
