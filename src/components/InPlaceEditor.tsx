import { Box, TextField, Typography, colors, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export interface InplaceEditorProps {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}

const StyledTitle = styled("div")<{ valueEmpty: boolean }>(
  ({ valueEmpty }) => ({
    color: valueEmpty ? colors.grey[600] : undefined,
    cursor: "pointer",
  })
);

const InPlaceEditor: React.FC<InplaceEditorProps> = ({
  value,
  onChange,
  multiline,
}) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [savedValue, setSavedValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const save = () => {
    const newValue = inputRef.current?.value?.trim() ?? "";

    onChange(newValue);
    setSavedValue(newValue);
    setIsEditing(false);
    titleRef.current?.focus();
  };

  const discard = () => {
    onChange(savedValue);
    setIsEditing(false);
    titleRef.current?.focus();
  };

  const openEditor = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (isEditing) {
      if (e.key === "Enter") {
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

  const valueEmpty = value === "";

  return (
    <Box
      data-test-id="InPlaceEditor"
      tabIndex={0}
      onKeyDown={handleKeyPress}
      onClick={openEditor}
    >
      {isEditing ? (
        <TextField
          data-test-id="InPlaceEditor-input"
          type="text"
          defaultValue={value}
          inputRef={inputRef}
          autoFocus
          onBlur={save}
          multiline={multiline}
          fullWidth
          size="small"
        />
      ) : (
        <StyledTitle
          ref={titleRef}
          data-testid="InPlaceEditor-text"
          valueEmpty={valueEmpty}
        >
          {valueEmpty ? t("inPlaceEditor.placeholder") : value}
        </StyledTitle>
      )}
    </Box>
  );
};

export default InPlaceEditor;
