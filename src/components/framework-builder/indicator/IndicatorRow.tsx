import { Box, Button, Grid, Typography, colors, styled } from "@mui/material";
import { Indicator } from "../../../framework.types";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { removeIndicator, updateIndicator } from "./indicatorSlice";
import InPlaceEditor from "../../InPlaceEditor";
import { useTranslation } from "react-i18next";
import IndicatorCellTitle from "./IndicatorCellTitle";

export interface IndicatorRowProps {
  indicator: Indicator;
  onIndicatorDelete: (indicatorId: string) => void;
}

const IndicatorRowStyled = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: colors.blueGrey[50],
}));

const IndicatorRow: React.FC<IndicatorRowProps> = ({
  indicator,
  onIndicatorDelete,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(removeIndicator(indicator?.id));
    onIndicatorDelete(indicator?.id);
  };

  const handleNameChange = (title: string) => {
    dispatch(updateIndicator({ ...indicator, title }));
  };
  const handleWeightChange = (weight: string) => {
    dispatch(updateIndicator({ ...indicator, weight: Number(weight) }));
  };
  const handleBaselineChange = (baseline: string) => {
    dispatch(updateIndicator({ ...indicator, baseline: Number(baseline) }));
  };
  const handleTargetChange = (target: string) => {
    dispatch(updateIndicator({ ...indicator, target: Number(target) }));
  };
  const handleUnitChange = (unit: string) => {
    dispatch(updateIndicator({ ...indicator, unit }));
  };
  const handleDescriptionChange = (description: string) => {
    dispatch(updateIndicator({ ...indicator, description }));
  };

  return (
    <IndicatorRowStyled>
      <Grid
        container
        alignItems="center"
        columnSpacing={2}
        rowSpacing={2}
        justifyContent={"space-between"}
      >
        <Grid item xs={9} md={4} lg={4}>
          <IndicatorCellTitle>
            {t("frameworkBuilder.indicator.title")}
          </IndicatorCellTitle>
          <InPlaceEditor
            value={indicator?.title ?? "Indicator"}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={3} md={2} lg={1}>
          <IndicatorCellTitle>
            {t("frameworkBuilder.indicator.weight")}
          </IndicatorCellTitle>
          <InPlaceEditor
            value={indicator.weight.toFixed()}
            number
            onChange={handleWeightChange}
            validators={[
              {
                isValid: (value) => value !== "",
                message: t("validate.cannotBeEmpty"),
              },
              {
                isValid: (value) => Number(value) > 0,
                message: t("validate.mustBePositive"),
              },
            ]}
          />
        </Grid>
        <Grid item xs={3} md={2} lg={1}>
          <IndicatorCellTitle>
            {t("frameworkBuilder.indicator.baseline")}
          </IndicatorCellTitle>
          <InPlaceEditor
            value={indicator.baseline?.toFixed() || ""}
            number
            onChange={handleBaselineChange}
            validators={[
              {
                isValid: (value) => Number(value) < Number(indicator.target),
                message: t("validate.mustBeLessThan", {
                  max: t(
                    "frameworkBuilder.indicator.target"
                  ).toLocaleLowerCase(),
                }),
              },
            ]}
          />
        </Grid>
        <Grid item xs={3} md={2} lg={1}>
          <IndicatorCellTitle>
            {t("frameworkBuilder.indicator.target")}
          </IndicatorCellTitle>
          <InPlaceEditor
            value={indicator.target?.toFixed() || ""}
            number
            onChange={handleTargetChange}
            validators={[
              {
                isValid: (value) => Number(value) > Number(indicator.baseline),
                message: t("validate.mustBeGreaterThan", {
                  min: t(
                    "frameworkBuilder.indicator.baseline"
                  ).toLocaleLowerCase(),
                }),
              },
            ]}
          />
        </Grid>
        <Grid item xs={3} md={2} lg={1}>
          <IndicatorCellTitle>
            {t("frameworkBuilder.indicator.unit")}
          </IndicatorCellTitle>
          <InPlaceEditor
            value={indicator.unit || ""}
            onChange={handleUnitChange}
            validators={[
              {
                isValid: (value) => value !== "",
                message: t("validate.cannotBeEmpty"),
              },
            ]}
          />
        </Grid>
        <Grid item xs={10} md={10} lg={3}>
          <IndicatorCellTitle>
            {t("frameworkBuilder.indicator.description")}
          </IndicatorCellTitle>
          <InPlaceEditor
            value={indicator.description ?? ""}
            multiline
            onChange={handleDescriptionChange}
          />
        </Grid>
        <Grid item xs={2} md={2} lg={1}>
          <Button size="small" color="error" onClick={handleDelete}>
            <DeleteForeverIcon />
          </Button>
        </Grid>
      </Grid>
    </IndicatorRowStyled>
  );
};

export default IndicatorRow;
