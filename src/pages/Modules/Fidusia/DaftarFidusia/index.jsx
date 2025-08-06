import React, { useState, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  TablePagination,
  IconButton,
  Stack,
  Pagination,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Save as SaveIcon,
  Visibility as ViewIcon,
  Description as StatementIcon,
  AttachFile as AttachmentIcon,
  GetApp as CertificateIcon,
} from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
// import FilterListIcon from '@mui/icons-material/FilterList';

const FidusialList = () => {
  // State Management
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  // Dummy Data
  const dummyData = useMemo(
    () => [
      {
        id: 1,
        noSertifikat: 'W4.000000006.AH.05.02 TAHUN 2025',
        pemberiFidusia: 'Alex Batubara',
        penerimaFidusia: 'sur Calisto',
        jenisFidusia: 'Pendaftaran',
        kantorWilayah: 'Jawa Timur',
        notaris: 'RUDY FAULAR SEMBIRING S.H., M.Kn.',
        tanggal: '24-09-2024',
      },
      {
        id: 2,
        noSertifikat: 'W4.000000007.AH.05.02 TAHUN 2025',
        pemberiFidusia: 'Adi Batubara',
        penerimaFidusia: 'sem Calisto',
        jenisFidusia: 'Pendaftaran',
        kantorWilayah: 'Jawa Timur',
        notaris: 'RUDY FAULAR SEMBIRING S.H., M.Kn.',
        tanggal: '25-09-2024',
      },
      // Add more dummy data
    ],
    []
  );

  // Filtering Logic
  const filteredData = useMemo(() => {
    return dummyData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [dummyData, searchTerm]);

  // Pagination Logic
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  // Selection Handlers
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredData.map((n) => n.id);
      setSelectedRows(newSelecteds);
      return;
    }
    setSelectedRows([]);
  };

  const handleRowSelect = (id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelected);
  };

  // Pagination Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilter = () => {
    // Implement filter logic
    console.log('Filter clicked');
  };

  const handleDownload = () => {
    // Implement download logic
    console.log('Download clicked');
  };
  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Daftar Fidusia
      </Typography>

      {/* Search and Action Bar */}
      {/* <Stack direction="row" spacing={2} sx={{ mb: 3, alignItems: 'center' }}> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mr: 2,
            '& .MuiOutlinedInput-root': {
              height: 40,
            },
            '& .MuiInputBase-input': {
              height: 40,
              padding: '0 14px',
              boxSizing: 'border-box',
            },
          }}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            ),
          }}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilter}
            sx={{
              borderRadius: 2,
              height: 40,
              minWidth: 'auto',
            }}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            sx={{
              borderRadius: 2,
              height: 40,
              minWidth: 'auto',
            }}
          >
            Download
          </Button>
        </Box>
      </Box>
      {/* </Stack> */}

      {/* Fidusia Table */}
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.04)', // Light gray background
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            <TableRow>
              <TableCell>NO</TableCell>
              <TableCell>No. Sertifikat</TableCell>
              <TableCell>Pemberi Fidusia</TableCell>
              <TableCell>Penerima Fidusia</TableCell>
              <TableCell>Jenis Fidusia</TableCell>
              <TableCell>Kantor Wilayah</TableCell>
              <TableCell>Notaris</TableCell>
              <TableCell sx={{ width: '110px' }}>Tanggal</TableCell>
              <TableCell align="center" sx={{ width: '200px' }}>
                Aksi
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => {
              const isSelected = selectedRows.includes(row.id);

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.noSertifikat}</TableCell>
                  <TableCell>{row.pemberiFidusia}</TableCell>
                  <TableCell>{row.penerimaFidusia}</TableCell>
                  <TableCell>{row.jenisFidusia}</TableCell>
                  <TableCell>{row.kantorWilayah}</TableCell>
                  <TableCell>{row.notaris}</TableCell>
                  <TableCell>{row.tanggal}</TableCell>
                  <TableCell align="center">
                    <Stack spacing={1}>
                      <Button
                        startIcon={<ViewIcon />}
                        variant="outlined"
                        size="small"
                        color="info"
                        sx={{ textTransform: 'none' }}
                      >
                        Lihat Detail
                      </Button>
                      <Button
                        startIcon={<StatementIcon />}
                        variant="outlined"
                        size="small"
                        color="info"
                        sx={{ textTransform: 'none' }}
                      >
                        Pernyataan
                      </Button>
                      <Button
                        startIcon={<AttachmentIcon />}
                        variant="outlined"
                        size="small"
                        color="info"
                        sx={{ textTransform: 'none' }}
                      >
                        Lampiran Obyek
                      </Button>
                      <Button
                        startIcon={<CertificateIcon />}
                        variant="outlined"
                        size="small"
                        color="info"
                        sx={{ textTransform: 'none' }}
                      >
                        Sertifikat
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 3,
        }}
      >
        <Pagination
          rowsPerPage={rowsPerPage}
          // count={filteredData.length}
          count={Math.ceil(filteredData.length / rowsPerPage)}
          page={page}
          // onChange={(_, value) => setPage(value)}
          onPageChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />
      </Box>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Box>
  );
};

export default FidusialList;
