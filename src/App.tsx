import { BrowserRouter } from "react-router-dom";
import CryptoMarket from "./components/CryptoMarket/CryptoMarket";
import { Box, ThemeProvider, Typography, createTheme } from "@mui/material";
import { bgBG } from "@mui/x-data-grid";
import "./App.scss";
import Footer from "./components/Footer";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  }, bgBG);

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Box
          display={"flex"}
          flexDirection={"column"}
          className="app"
        >
          <Typography variant="h3" component="h1" mt={5}>Criptos en Argentina</Typography>
          <CryptoMarket />
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
