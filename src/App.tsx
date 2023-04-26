import { Box, Container, ThemeProvider, Typography } from "@mui/material";
import "./App.css";
import FrameworkBuilder from "./components/framework-builder/goal/FrameworkBuilder";
import { Provider } from "react-redux";
import store from "./app/store";
import defaultTheme from "./theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Evaluation from "./components/evaluation/Evaluation";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/fi";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Evaluation />,
  },
  {
    path: "/framework-builder",
    element: <FrameworkBuilder />,
  },
]);

dayjs.extend(localizedFormat).locale("fi");

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
        <Provider store={store}>
          <Box mb={4}>
            <RouterProvider router={router} />
          </Box>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
