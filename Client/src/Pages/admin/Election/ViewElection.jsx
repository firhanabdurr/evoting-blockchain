import React, { useEffect, useState } from "react";
import BasicTable from "../../../Components/BasicTable";
import ContentHeader from "../../../Components/ContentHeader";
import Card from "@mui/material/Card";
import "../../../style.css";
import axios from "axios";
import { serverLink } from "../../../Data/Variables";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const ViewElection = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const columns = [
    { field: "_id", headerName: "Id", width: 220, hide: true },
    { field: "name", headerName: "Judul", width: 220 },
    { field: "candidates", headerName: "Kandidat", width: 220 },
    {
      field: "delete",
      headerName: "Delete",
      width: 80,
      renderCell: (params) => {
        const handleDeleteClick = () => {
          setSelectedId(params.row._id); // Simpan id dari row yang akan dihapus
          setConfirmDialogOpen(true); // Buka dialog konfirmasi
        };
        return (
          <Button onClick={handleDeleteClick}>
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
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    const link = `${serverLink}election/delete/${selectedId}`;
    await axios.get(link);
    setOpen(true);
    setConfirmDialogOpen(false); // Tutup dialog konfirmasi
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false); // Tutup dialog konfirmasi tanpa menghapus
  };

  useEffect(() => {
    async function getData() {
      let res = await axios.get("http://localhost:1322/api/auth/elections");
      let users = res.data;
      setData(users);
    }
    getData();
  }, [open]);

  return (
    <>
      <div className="admin__content">
        <ContentHeader title="Tambahkan" link="/admin/election/add" />
        <div className="content" style={{ paddingBottom: "20px" }}>
          <Card variant="outlined">
            <BasicTable columns={columns} rows={data} />
          </Card>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
            Election Deleted
          </Alert>
        </Snackbar>

        {/* Dialog Konfirmasi */}
        <Dialog open={confirmDialogOpen} onClose={handleCancelDelete}>
          <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Apakah Anda yakin ingin menghapus election ini? Tindakan ini tidak dapat dibatalkan.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="secondary">
              Batal
            </Button>
            <Button onClick={handleConfirmDelete} color="primary" autoFocus>
              Hapus
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ViewElection;
