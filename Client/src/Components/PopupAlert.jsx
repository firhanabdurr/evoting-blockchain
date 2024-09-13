import React from "react";
import { Snackbar, Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";

const PopupAlert = (props) => {
  const [open, setOpen] = useState(props.open);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          User Deleted
        </Alert>
      </Snackbar>
    </>
  );
};

// // export default PopupAlert;
// const PopupAlert = (props) => {
//   const [open, setOpen] = useState(false); // Control for Snackbar
//   const [dialogOpen, setDialogOpen] = useState(false); // Control for confirmation dialog

//   // Function to open the confirmation dialog
//   const handleClickOpen = () => {
//     setDialogOpen(true);
//   };

//   // Function to close the confirmation dialog
//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//   };

//   // Function to handle deletion after confirmation
//   const handleDelete = () => {
//     // Perform deletion logic here
//     setDialogOpen(false);  // Close the dialog
//     setOpen(true);         // Show the Snackbar alert
//   };

//   // Function to close the Snackbar
//   const handleCloseAlert = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpen(false);
//   };

//   return (
//     <>
//       {/* Button to trigger delete confirmation */}
//       <Button variant="outlined" color="error" onClick={handleClickOpen}>
//         Delete User
//       </Button>

//       {/* Confirmation Dialog */}
//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>{"Delete User Confirmation"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this user? This action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDelete} color="error" autoFocus>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Popup Alert for Deletion */}
//       <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
//         <Alert onClose={handleCloseAlert} severity="error" sx={{ width: "100%" }}>
//           User Deleted
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

export default PopupAlert;
