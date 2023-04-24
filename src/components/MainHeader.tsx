import { Box, Typography } from "@mui/material";

export interface MainHeaderProps {
  children: React.ReactNode;
}

const MainHeader: React.FC<MainHeaderProps> = ({ children }) => {
  return (
    <div data-testid="MainHeader">
      <Box my={2}>
        <Typography variant="h3" component="h1">
          {children}
        </Typography>
      </Box>
    </div>
  );
};

export default MainHeader;
