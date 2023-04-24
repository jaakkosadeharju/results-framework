import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Hidden,
  Typography,
} from "@mui/material";
import { ReactNode, useLayoutEffect, useMemo, useRef } from "react";
import { Indicator, ResultLevel } from "../framework.types";
import AddIcon from "@mui/icons-material/Add";
import { generateId } from "../app/generateId";
import IndicatorRow from "./framework-builder/indicator/IndicatorRow";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllIndicators,
  insertIndicator,
} from "./framework-builder/indicator/indicatorSlice";
import { useTranslation } from "react-i18next";
import InPlaceEditor from "./InPlaceEditor";

export interface FrameworkLevelCardProps {
  item: ResultLevel;
  buttons?: {
    text: string;
    icon?: ReactNode;
    onClick: () => void;
    testid?: string;
  }[];
  avatar?: { text: string; color?: string };
  onIndicatorCreate: (indicatorId: string) => void;
  onIndicatorDelete: (indicatorId: string) => void;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
}

const FrameworkLevelCard: React.FC<FrameworkLevelCardProps> = ({
  item,
  buttons = [],
  avatar,
  onIndicatorCreate,
  onIndicatorDelete,
  onTitleChange,
  onDescriptionChange,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleAddIndicator = () => {
    const indicatorId = generateId();
    dispatch(
      insertIndicator({
        id: indicatorId,
        title: t("frameworkBuilder.newIndicator"),
        weight: 1,
        baseline: 0,
        target: 100,
        unit: "%",
        description: "",
        dueDate: new Date().toISOString(),
        valueInterval: 1,
        valueIntervalType: "month",
      })
    );
    onIndicatorCreate(indicatorId);
  };
  const allIndicators = useSelector(selectAllIndicators);
  const indicators = useMemo(
    () => allIndicators.filter((i) => item.indicatorIds.includes(i.id)),
    [allIndicators, item.indicatorIds]
  );

  return (
    <Box m={1}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Box
            sx={{
              flexDirection: "row",
              alignItems: "center",
              display: "flex",
            }}
          >
            {/* General info */}
            {avatar && (
              <Avatar sx={{ bgcolor: avatar.color }}>{avatar.text}</Avatar>
            )}
            <Box ml={2}>
              <Typography variant="h6" component="div">
                <InPlaceEditor
                  value={item.title}
                  onChange={onTitleChange}
                  validators={[
                    {
                      isValid: (value: string) => value !== "",
                      message: t("validate.cannotBeEmpty"),
                    },
                  ]}
                />
              </Typography>
            </Box>
          </Box>

          {/* Indicators */}
          <Box my={2}>
            <Typography variant="body2">
              <InPlaceEditor
                multiline
                value={item.description ?? ""}
                onChange={onDescriptionChange}
              />
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              {t("frameworkBuilder.indicators")}{" "}
              <Chip label={indicators?.length} size="small" />
            </Typography>
          </Box>
          <Box>
            {indicators.map((indicator) => (
              <IndicatorRow
                key={indicator.id}
                indicator={indicator}
                onIndicatorDelete={onIndicatorDelete}
              />
            ))}
          </Box>
          <Box>
            <Button size="small" onClick={handleAddIndicator}>
              <AddIcon /> {t("frameworkBuilder.addIndicator")}
            </Button>
          </Box>
        </CardContent>
        <CardActions>
          <Box
            mt={2}
            sx={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              display: "flex",
            }}
          >
            <>
              {buttons &&
                buttons.map(({ text, icon, onClick, testid }, i) => (
                  <Button key={i} onClick={onClick} data-testid={testid}>
                    {icon}
                    {text}
                  </Button>
                ))}
            </>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default FrameworkLevelCard;
