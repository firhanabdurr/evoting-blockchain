import React, { useEffect, useState } from "react";
import { Button, Typography, Box, Grid, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import InputField from "../../../Components/Form/InputField";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../../Components/Form/ErrorMessage";
import axios from "axios";
import ContentHeader from "../../../Components/ContentHeader";
import { serverLink } from "../../../Data/Variables";

const AddUser = () => {
  const navigate = useNavigate();
  const [locationData, setLocation] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const validateForm = (data) => {
    const errors = {};
    if (!data.username) errors.username = "NIK wajib diisi.";
    if (!data.fname) errors.fname = "Nama depan wajib diisi.";
    if (!data.lname) errors.lname = "Nama belakang wajib diisi.";
    if (!data.email) errors.email = "Email wajib diisi.";
    if (!data.mobile) errors.mobile = "No. Telepon wajib diisi.";
    if (!data.password) errors.password = "Password wajib diisi.";
    if (data.password !== data.confirmpassword) errors.confirmpassword = "Password tidak cocok.";
    if (!data.profile) errors.profile = "Upload foto wajib.";
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profile: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      location: locationData.country_name,
    };
    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      setDialogOpen(true); // Buka dialog konfirmasi
    }
  };

  const confirmSubmit = () => {
    const { username, fname, lname, email, mobile, password, location, profile } = formData;
    const sendData = new FormData();
    sendData.append("username", username);
    sendData.append("fname", fname);
    sendData.append("lname", lname);
    sendData.append("email", email);
    sendData.append("mobile", mobile);
    sendData.append("password", password);
    sendData.append("location", location);
    sendData.append("profile", profile);
    sendData.append("avatar", username + "." + profile.name.split(".").pop());

    axios.post(serverLink + "register", sendData).then((res) => {
      if (res.status === 201) {
        navigate("/admin/user");
      }
    });
  };

  useEffect(() => {
    async function getData() {
      await axios
        .get("https://geolocation-db.com/json/")
        .then((res) => {
          setLocation(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, []);

  return (
    <div className="admin__content">
      <ContentHeader />
      <div className="content">
        <form onSubmit={handleSubmit} method="POST">
          <Paper elevation={3}>
            <Box px={3} py={2}>
              <Typography variant="h6" align="center" margin="dense">
                Tambahkan Pemilih
              </Typography>
              <Grid container pt={3} spacing={3}>
                <Grid item xs={12} sm={12}>
                  <InputField
                    label="NIK"
                    name="username"
                    fullWidth={true}
                    onChange={handleInputChange}
                    error={!!formErrors.username}
                    helperText={formErrors.username}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    label="Nama Depan"
                    name="fname"
                    fullWidth={true}
                    onChange={handleInputChange}
                    error={!!formErrors.fname}
                    helperText={formErrors.fname}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    label="Nama Belakang"
                    name="lname"
                    fullWidth={true}
                    onChange={handleInputChange}
                    error={!!formErrors.lname}
                    helperText={formErrors.lname}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <InputField
                    label="E-mail"
                    name="email"
                    fullWidth={true}
                    onChange={handleInputChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <InputField
                    label="No. Telepon"
                    name="mobile"
                    fullWidth={true}
                    onChange={handleInputChange}
                    error={!!formErrors.mobile}
                    helperText={formErrors.mobile}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    type="password"
                    label="Password"
                    name="password"
                    fullWidth={true}
                    onChange={handleInputChange}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    type="password"
                    label="Confirm Password"
                    name="confirmpassword"
                    fullWidth={true}
                    onChange={handleInputChange}
                    error={!!formErrors.confirmpassword}
                    helperText={formErrors.confirmpassword}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <input
                    type="file"
                    name="profile"
                    fullWidth={true}
                    onChange={handleFileChange}
                  />
                  {formErrors.profile && (
                    <Typography color="error" variant="body2">
                      {formErrors.profile}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Box mt={3}>
                <Button type="submit" variant="contained" color="primary">
                  Tambahkan
                </Button>
              </Box>
            </Box>
          </Paper>
        </form>
      </div>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Konfirmasi Penambahan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menambahkan pemilih ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Batal</Button>
          <Button onClick={confirmSubmit} color="primary">
            Tambahkan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddUser;
