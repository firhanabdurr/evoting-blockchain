import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";

const theme = createTheme();

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
          }}
        >
          <img
            style={{ width: "50vw" }}
            src="https://aptika.kominfo.go.id/wp-content/uploads/2022/04/online-vote-F-678x381.jpg"
            alt="random"
          />
        </Box>
      </main>
    </ThemeProvider>
  );
}
