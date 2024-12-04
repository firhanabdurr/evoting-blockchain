import React, { useEffect, useState } from "react";
import BasicTable from "../../../Components/BasicTable";
import ContentHeader from "../../../Components/ContentHeader";
import Card from "@mui/material/Card";
import "../../../style.css";
import axios from "axios";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { serverLink } from "../../../Data/Variables";
import { Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Link } from "react-router-dom";

const ViewUser = () => {
  const [data, setData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    { field: "_id", headerName: "ID", width: 220, hide: true },
    { field: "username", headerName: "NIK", width: 150 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "location", headerName: "Alamat", width: 150 },
    { field: "mobile", headerName: "No. Telepon", width: 200 },
    {
      field: "time",
      headerName: "Updated At",
      width: 200,
      valueGetter: (params) => {
        let date = new Date(params.row.updatedAt);
        return (
          date.getFullYear() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getDate()
        );
      },
      hide: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (params) => {
        const link = "edit/" + params.row._id;
        return (
          <Link to={link}>
            <Button>
              <EditIcon />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 80,
      renderCell: (params) => {
        const handleDialogOpen = () => {
          setSelectedUser(params.row);
          setDialogOpen(true);
        };
        return (
          <Button onClick={handleDialogOpen}>
            <DeleteIcon sx={{ color: "error.main" }} />
          </Button>
        );
      },
    },
  ];

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    try {
      const link = `${serverLink}user/delete/${selectedUser._id}`;
      await axios.get(link);
      setOpenSnackbar(true); // Tampilkan notifikasi
      setDialogOpen(false); // Tutup dialog
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Terjadi kesalahan saat menghapus pengguna.");
    }
  };

  useEffect(() => {
    async function getData() {
      let res = await axios.get(serverLink + "users");
      let users = res.data;
      setData(users);
    }
    getData();
  }, [openSnackbar]);

  return (
    <div className="admin__content">
      <ContentHeader title="Tambahkan" link="/admin/user/add" />
      <div className="content" style={{ paddingBottom: "20px" }}>
        <Card variant="outlined">
          <BasicTable columns={columns} rows={data} checkboxSelection={true} />
        </Card>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          User berhasil dihapus
        </Alert>
      </Snackbar>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus user dengan nama:{" "}
            {selectedUser?.username} ({selectedUser?.email})?
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

export default ViewUser;
