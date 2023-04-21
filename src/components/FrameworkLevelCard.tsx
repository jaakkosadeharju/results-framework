import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { ReactNode, useMemo } from "react";
import { Indicator, ResultLevel } from "../results";
import AddIcon from "@mui/icons-material/Add";
import { generateId } from "../app/generateId";
import IndicatorRow from "./framework-builder/indicator/IndicatorRow";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllIndicators,
  upsertIndicator,
} from "./framework-builder/indicator/indicatorSlice";
import { useTranslation } from "react-i18next";

export interface FrameworkLevelCardProps {
  item: ResultLevel;
  buttons?: { text: string; icon?: ReactNode; onClick: () => void }[];
  avatar?: { text: string; color?: string };
  onIndicatorCreate: (indicatorId: string) => void;
  onIndicatorDelete: (indicatorId: string) => void;
}

const FrameworkLevelCard: React.FC<FrameworkLevelCardProps> = ({
  item,
  buttons = [],
  avatar,
  onIndicatorCreate,
  onIndicatorDelete,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleAddIndicator = () => {
    const indicatorId = generateId();
    dispatch(
      upsertIndicator({
        id: indicatorId,
        title: "Indicator",
        weight: 1,
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
                {item.title}
              </Typography>
            </Box>
          </Box>

          {/* Indicators */}
          <Box my={2}>
            <Typography variant="body2">
              {item.description ??
                "Cillum incididunt est fugiat elit fugiat quis aliquip commodo nostrud duis amet qui Lorem."}
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
                parent={item}
                indicator={indicator}
                weight={indicator.weight}
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
                buttons.map(({ text, icon, onClick }, i) => (
                  <Button key={i} onClick={onClick}>
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
