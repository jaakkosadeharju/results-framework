import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import InPlaceEditor from "./InPlaceEditor";

describe("InPlaceEditor", () => {
  it("mount", () => {
    render(<InPlaceEditor value="test value" onChange={() => {}} />);
    expect(screen.getByText("test value")).toBeInTheDocument();
  });

  it("should open on enter", async () => {
    const initialValue = "old value";
    const onChangeCallback = vi.fn();

    const wrapper = render(
      <InPlaceEditor value={initialValue} onChange={onChangeCallback} />
    );
    const textElement = await wrapper.findByTestId("InPlaceEditor-text");
    fireEvent.keyDown(textElement, { key: "Enter", code: "Enter" });

    const textField = await screen.findByRole<HTMLInputElement>("textbox");
    expect(textField).toBeInTheDocument();
  });

  it("should open on space", async () => {
    const initialValue = "old value";
    const onChangeCallback = vi.fn();

    const wrapper = render(
      <InPlaceEditor value={initialValue} onChange={onChangeCallback} />
    );
    const textElement = await wrapper.findByTestId("InPlaceEditor-text");
    fireEvent.keyDown(textElement, { key: " ", code: "Space" });

    const textField = await screen.findByRole<HTMLInputElement>("textbox");
    expect(textField).toBeInTheDocument();
  });

  it("should call onChange on blur", async () => {
    const initialValue = "old value";
    const changedValue = "new value";
    const onChangeCallback = vi.fn();

    render(<InPlaceEditor value={initialValue} onChange={onChangeCallback} />);
    const textElement = await screen.findByTestId("InPlaceEditor-text");
    textElement.click();
    const textField = await screen.findByRole<HTMLInputElement>("textbox");
    textField.focus();
    textField.value = changedValue;
    textField.blur();

    await screen.findByTestId("InPlaceEditor-text");
    expect(onChangeCallback).toHaveBeenCalledWith(changedValue);
  });

  it("should call onChange on enter", async () => {
    const initialValue = "old value";
    const changedValue = "new value";
    const onChangeCallback = vi.fn();

    const wrapper = render(
      <InPlaceEditor value={initialValue} onChange={onChangeCallback} />
    );
    const textElement = await wrapper.findByTestId("InPlaceEditor-text");
    textElement.click();
    const textField = await screen.findByRole<HTMLInputElement>("textbox");
    textField.focus();
    textField.value = changedValue;
    fireEvent.keyDown(textField, { key: "Enter", code: "Enter" });

    await wrapper.findByTestId("InPlaceEditor-text");
    expect(onChangeCallback).toHaveBeenCalledWith(changedValue);
  });

  it("should call onChange on escape", async () => {
    const initialValue = "old value";
    const changedValue = "new value";
    const onChangeCallback = vi.fn();

    const wrapper = render(
      <InPlaceEditor value={initialValue} onChange={onChangeCallback} />
    );
    const textElement = await wrapper.findByTestId("InPlaceEditor-text");
    textElement.click();
    const textField = await screen.findByRole<HTMLInputElement>("textbox");
    textField.focus();
    textField.value = changedValue;
    fireEvent.keyDown(textField, { key: "Escape", code: "Escape" });

    await wrapper.findByTestId("InPlaceEditor-text");
    expect(onChangeCallback).toHaveBeenCalledWith(initialValue);
  });
});
