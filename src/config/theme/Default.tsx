import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00b7ff",
    },
    secondary: {
      main: "#202020",
    },
  },
});

export default defaultTheme;
