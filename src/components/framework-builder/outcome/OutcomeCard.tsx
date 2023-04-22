import { Box, Button } from "@mui/material";
import { Outcome } from "../../../framework.types";
import FrameworkLevelCard from "../../FrameworkLevelCard";
import OutputCard from "../output/OutputCard";
import { generateId } from "../../../app/generateId";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { removeOutcome, updateOutcome } from "./outcomeSlice";
import { selectAllOutputs, insertOutput } from "../output/outputSlice";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export interface OutcomeCardProps {
  goalId: string;
  outcome: Outcome;
}

const OutcomeCard: React.FC<OutcomeCardProps> = ({ goalId, outcome }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const allOutputs = useSelector(selectAllOutputs);
  const outputs = useMemo(
    () => allOutputs.filter((o) => outcome.childrenIds.includes(o.id)),
    [allOutputs, outcome.childrenIds]
  );
  const handleSave = () =>
    dispatch(updateOutcome({ ...outcome, title: "Updated" }));
  const handleDelete = () => dispatch(removeOutcome(outcome.id));
  const handleNewOutput = () => {
    const outputId = generateId();
    dispatch(
      updateOutcome({
        ...outcome,
        childrenIds: [...outcome.childrenIds, outputId],
      })
    );
    dispatch(
      insertOutput({
        type: "output",
        id: outputId,
        title: t("frameworkBuilder.output.defaultName"),
        childrenIds: [],
        indicatorIds: [],
      })
    );
  };

  const handleIndicatorCreate = (indicatorId: string) => {
    dispatch(
      updateOutcome({
        ...outcome,
        indicatorIds: [...outcome.indicatorIds, indicatorId],
      })
    );
  };
  const handleIndicatorDelete = (indicatorId: string) => {
    dispatch(
      updateOutcome({
        ...outcome,
        indicatorIds: outcome.indicatorIds.filter((iId) => iId !== indicatorId),
      })
    );
  };
  const handleTitleChange = (title: string) => {
    dispatch(updateOutcome({ ...outcome, title }));
  };
  const handleDescriptionChange = (description: string) => {
    dispatch(updateOutcome({ ...outcome, description }));
  };

  return (
    <Box data-testid="OutcomeCard">
      <FrameworkLevelCard
        avatar={{ text: "OC", color: deepPurple[500] }}
        item={outcome}
        buttons={[
          { text: t("app.save"), onClick: handleSave },
          {
            text: t("frameworkBuilder.outcome.addOutput"),
            icon: <AddIcon />,
            onClick: handleNewOutput,
          },
          {
            text: t("app.delete"),
            icon: <RemoveIcon />,
            onClick: handleDelete,
          },
        ]}
        onIndicatorCreate={handleIndicatorCreate}
        onIndicatorDelete={handleIndicatorDelete}
        onTitleChange={handleTitleChange}
        onDescriptionChange={handleDescriptionChange}
      />
      <Box ml={2}>
        {outputs.map((o) => (
          <OutputCard key={o.id} output={o} />
        ))}
      </Box>
    </Box>
  );
};

export default OutcomeCard;
