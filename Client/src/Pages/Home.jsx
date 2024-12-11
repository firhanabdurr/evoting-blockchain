import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const theme = createTheme();

// Rekord Transaksi Komponen
const RekordTransaksi = () => {
  // State untuk menyimpan data transaksi
  const [transactions, setTransactions] = useState([]);

  // Data dummy transaksi
  const dummyTransactions = [
    {
      id: "0x1234567890abcdef",
      timestamp: "2024-12-10 10:00:00",
      voterId: "123********",
      status: "Terverifikasi",
    },
    {
      id: "0xabcdef1234567890",
      timestamp: "2024-12-10 10:05:00",
      voterId: "123********",
      status: "Terverifikasi",
    },
    {
      id: "0x7890abcdef123456",
      timestamp: "2024-12-10 10:10:00",
      voterId: "123********",
      status: "Terverifikasi",
    },
  ];

  // Simulasi pengambilan data dari server atau blockchain
  useEffect(() => {
    setTimeout(() => {
      setTransactions(dummyTransactions);
    }, 1000);
  }, []);

  return (
    <Box sx={{ padding: "20px", marginTop: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Riwayat Transaksi Pemilih
      </Typography>
      <Table sx={{ minWidth: 650, marginTop: "20px" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>ID Transaksi</strong></TableCell>
            <TableCell><strong>Waktu</strong></TableCell>
            <TableCell><strong>NIK</strong></TableCell>
            <TableCell><strong>Status Verifikasi</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                Memuat data transaksi...
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.timestamp}</TableCell>
                <TableCell>{transaction.voterId}</TableCell>
                <TableCell>
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      color: "white",
                      backgroundColor:
                        transaction.status === "Terverifikasi" ? "green" : "red",
                    }}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

// Halaman Home dengan gambar dan tabel transaksi
export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 128px)",
            flexDirection: "column",
          }}
        >
          <RekordTransaksi />
        </Box>
      </main>
    </ThemeProvider>
  );
}
