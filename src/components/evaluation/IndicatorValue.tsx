import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Indicator } from "../../framework.types";
import { useTranslation } from "react-i18next";
import { FormEvent, useRef, useState } from "react";
import { Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  insertIndicatorValue,
  selectCurrentValue,
} from "../framework-builder/indicator/indicatorValueSlice";
import { RootState } from "../../app/store";
import generateId from "../../app/generateId";

export interface IndicatorValueProps {
  indicator: Indicator;
}

const DimmedBoxStyled = styled(Box)(({ theme }) => ({
  color: theme.palette.grey[500],
}));
const HighlightedBoxStyled = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
}));

const IndicatorValue: React.FC<IndicatorValueProps> = ({ indicator }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [editorOpened, setEditorOpened] = useState(false);
  const indicatorValue = useSelector((state: RootState) =>
    selectCurrentValue(state, indicator.id)
  );
  const valueInputRef = useRef<HTMLInputElement>(null);

  const open = () => {
    setEditorOpened(true);
  };
  const cancel = () => {
    setEditorOpened(false);
  };
  const save = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      insertIndicatorValue({
        id: generateId(),
        indicatorId: indicator.id,
        value: +(valueInputRef.current?.value ?? "0"),
        date: new Date().toISOString(),
      })
    );
    setEditorOpened(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Escape") {
      cancel();
    }
  };

  return (
    <Box mt={1}>
      <form onKeyDown={handleKeyDown} onSubmit={save}>
        <Stack
          direction="row"
          data-testid="IndicatorValue"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Typography noWrap>{indicator.title}</Typography>

          <div>
            {editorOpened ? (
              <Stack direction="row" spacing={2}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  inputRef={valueInputRef}
                  type="number"
                  size="small"
                  autoFocus
                  label={t("evaluation.indicatorValue.value", {
                    unit: indicator.unit,
                  })}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  type="submit"
                >
                  {t("app.save")}
                </Button>
                <Button
                  type="button"
                  variant="text"
                  color="error"
                  size="small"
                  onClick={cancel}
                >
                  {t("app.cancel")}
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" spacing={2} alignItems="center">
                <DimmedBoxStyled>
                  {`${t("frameworkBuilder.indicator.baseline")} ${
                    indicator.baseline
                  }`}{" "}
                  {indicator.unit}
                </DimmedBoxStyled>
                <DimmedBoxStyled>
                  {`${t("frameworkBuilder.indicator.target")}  ${
                    indicator.target
                  }`}{" "}
                  {indicator.unit}
                </DimmedBoxStyled>
                <HighlightedBoxStyled>
                  {`${t("evaluation.value")}  ${
                    indicatorValue?.value ?? indicator.baseline
                  }`}{" "}
                  {indicator.unit}
                </HighlightedBoxStyled>
                <IconButton color="primary" onClick={open}>
                  <Edit fontSize="small" />
                </IconButton>
              </Stack>
            )}
          </div>
        </Stack>
      </form>
    </Box>
  );
};

export default IndicatorValue;
