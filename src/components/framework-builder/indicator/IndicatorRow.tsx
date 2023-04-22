import { Button, Grid } from "@mui/material";
import { Indicator, ResultLevel } from "../../../results";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { removeIndicator, updateIndicator } from "./indicatorSlice";
import InPlaceEditor from "../../InPlaceEditor";

export interface IndicatorRowProps {
  parent: ResultLevel;
  indicator: Indicator;
  weight: number;
  onIndicatorDelete: (indicatorId: string) => void;
}

const IndicatorRow: React.FC<IndicatorRowProps> = ({
  parent,
  indicator,
  weight,
  onIndicatorDelete,
}) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(removeIndicator(indicator?.id));
    onIndicatorDelete(indicator?.id);
  };

  const handleNameChange = (title: string) => {
    dispatch(updateIndicator({ ...indicator, title }));
  };

  return (
    <Grid container alignItems="center">
      <Grid item>
        <InPlaceEditor
          value={indicator?.title ?? "Indicator"}
          onChange={handleNameChange}
        />
      </Grid>
      <Grid item>
        <Button size="small" color="error" onClick={handleDelete}>
          <DeleteForeverIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default IndicatorRow;
