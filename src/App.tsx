import {
  Box,
  Container,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import "./App.css";
import GoalList from "./components/framework-builder/goal/GoalList";
import { Provider } from "react-redux";
import store from "./app/store";
import { useTranslation } from "react-i18next";
import defaultTheme from "./theme";

function App() {
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <Container className="App">
          <Typography variant="h3" component="h1">
            {t("app.title")}
          </Typography>
          <Box mt={2}>
            <GoalList />
          </Box>
        </Container>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
