import React, { useEffect, useState } from "react";
import BasicTable from "../../../Components/BasicTable";
import Card from "@mui/material/Card";
import "../../../style.css";
import axios from "axios";
import ContentHeader from "../../../Components/ContentHeader";
import { serverLink } from "../../../Data/Variables";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";

const ViewCandidate = () => {
  const [data, setData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const dateConverter = (date) => {
    date = new Date(date);
    return (
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
    );
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleDialogOpen = (candidate) => {
    setSelectedCandidate(candidate);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const confirmDelete = async () => {
    if (!selectedCandidate) return;

    try {
      const link = `${serverLink}candidate/delete/${selectedCandidate._id}`;
      await axios.get(link);
      setOpenSnackbar(true); // Tampilkan notifikasi
      setDialogOpen(false); // Tutup dialog
    } catch (error) {
      console.error("Error deleting candidate:", error);
      alert("Terjadi kesalahan saat menghapus kandidat.");
    }
  };

  const columnVisibilityModel = {
    _id: false,
    qualification: false,
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220, hide: true },
    { field: "username", headerName: "Username", width: 150 },
    {
      field: "fname",
      headerName: "Nama Lengkap",
      valueGetter: (data) => {
        return data.row.firstName + " " + data.row.lastName;
      },
      width: 300,
    },
    { field: "location", headerName: "Alamat", width: 200 },
    {
      field: "dob",
      headerName: "Tanggal Lahir",
      valueGetter: (params) => dateConverter(params.row.dob),
      width: 120,
      hide: false,
    },
    {
      field: "qualification",
      headerName: "Pendidikan",
      width: 200,
    },
    {
      field: "time",
      headerName: "Updated At",
      width: 120,
      valueGetter: (params) => dateConverter(params.row.updatedAt),
      hide: true,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 80,
      renderCell: (params) => {
        return (
          <Button onClick={() => handleDialogOpen(params.row)}>
            <DeleteIcon sx={{ color: "error.main" }} />
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    async function getData() {
      let res = await axios.get("http://localhost:1322/api/auth/candidates");
      let users = res.data;
      setData(users);
    }
    getData();
  }, [openSnackbar]);

  return (
    <div className="admin__content">
      <ContentHeader title="Tambahkan" link="/admin/candidate/add" />
      <div className="content" style={{ paddingBottom: "20px" }}>
        <Card variant="outlined">
          <BasicTable
            columns={columns}
            rows={data}
            checkboxSelection={true}
            columnVisibilityModel={columnVisibilityModel}
          />
        </Card>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          Kandidat berhasil dihapus
        </Alert>
      </Snackbar>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus kandidat dengan nama:{" "}
            {selectedCandidate?.firstName} {selectedCandidate?.lastName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Batal</Button>
          <Button onClick={confirmDelete} color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewCandidate;
