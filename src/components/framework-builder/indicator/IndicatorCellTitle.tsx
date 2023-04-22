import { Box, Typography, styled } from "@mui/material";

type IndicatorCellTitleProps = {
  children: React.ReactNode;
};

const BoxStyled = styled(Box)(({ theme }) => ({
  color: theme.palette.text.disabled,
}));

const IndicatorCellTitle: React.FC<IndicatorCellTitleProps> = ({
  children,
}) => {
  return (
    <BoxStyled data-testid="IndicatorCellTitle">
      <Typography variant="body2">{children}</Typography>
    </BoxStyled>
  );
};

export default IndicatorCellTitle;
