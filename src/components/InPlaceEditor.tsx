import {
  Box,
  TextField,
  Tooltip,
  Typography,
  colors,
  styled,
} from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export interface Validator {
  isValid: (value: string) => boolean;
  message: string;
}

export interface InplaceEditorProps {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  number?: boolean;
  validators?: Validator[];
}

const TitleStyled = styled("div")<{ valueEmpty: boolean }>(
  ({ theme, valueEmpty }) => ({
    color: valueEmpty ? colors.grey[400] : undefined,
    cursor: "pointer",
    minWidth: theme.spacing(4),
    borderRadius: theme.spacing(0.25),
    "&:hover": {
      outline: `2px solid ${theme.palette.primary.main}`,
    },
  })
);

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  minWidth: theme.spacing(4),
  padding: theme.spacing(0),
  ".MuiOutlinedInput-input": {
    padding: theme.spacing(0.5),
  },
}));

const nl2br = (text: string) => {
  return text.split("\n").map((item, key) => {
    return (
      <Fragment key={key}>
        {item}
        <br />
      </Fragment>
    );
  });
};

const InPlaceEditor: React.FC<InplaceEditorProps> = ({
  value,
  onChange,
  number,
  multiline,
  validators,
}) => {
  const checkErrors = (val: string) =>
    validators?.filter((v) => !v.isValid(val)) ?? [];
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [savedValue, setSavedValue] = useState(value);
  const [errors, setErrors] = useState<Validator[]>(checkErrors(value));
  const inputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const save = () => {
    const newValue = inputRef.current?.value?.trim() ?? "";

    // Don't save if there are errors
    if (checkErrors(newValue).length > 0) {
      return;
    }

    onChange(newValue);
    setSavedValue(newValue);
    setIsEditing(false);
    containerRef.current?.focus();
  };

  const discard = () => {
    onChange(savedValue);
    setIsEditing(false);
    containerRef.current?.focus();
  };

  const openEditor = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (isEditing) {
      if (
        (!(multiline && e.shiftKey) && e.key === "Enter") ||
        e.key === "Tab"
      ) {
        e.preventDefault();
        save();
      } else if (e.key === "Escape") {
        discard();
      }
    } else {
      if (e.key === "Enter" || e.key === " ") {
        openEditor(e);
      }
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const valueEmpty = value === "";

  return (
    <Box
      data-testid="InPlaceEditor"
      onKeyDown={handleKeyPress}
      onClick={openEditor}
      tabIndex={0}
      ref={containerRef}
    >
      {isEditing ? (
        <Tooltip arrow describeChild title={errors[0]?.message ?? ""}>
          <TextFieldStyled
            data-testid="InPlaceEditor-input"
            type={number ? "number" : "text"}
            defaultValue={value}
            inputRef={inputRef}
            error={errors.length > 0}
            onBlur={save}
            multiline={multiline}
            fullWidth
            size="small"
            onChange={(e) => setErrors(checkErrors(e.target.value ?? ""))}
          />
        </Tooltip>
      ) : (
        <TitleStyled
          ref={titleRef}
          data-testid="InPlaceEditor-text"
          valueEmpty={valueEmpty}
        >
          <Typography noWrap>
            {valueEmpty ? t("inPlaceEditor.placeholder") : nl2br(value)}
          </Typography>
        </TitleStyled>
      )}
    </Box>
  );
};

export default InPlaceEditor;
