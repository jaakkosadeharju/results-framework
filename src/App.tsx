import { Box, Container, ThemeProvider, Typography } from "@mui/material";
import "./App.css";
import FrameworkBuilder from "./components/framework-builder/goal/FrameworkBuilder";
import { Provider } from "react-redux";
import store from "./app/store";
import defaultTheme from "./theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Evaluation from "./components/evaluation/Evaluation";

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

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <Box mb={4}>
          <RouterProvider router={router} />
        </Box>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
