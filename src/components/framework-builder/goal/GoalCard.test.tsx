import { describe, it } from "vitest";
import GoalCard from "./GoalCard";
import { render } from "@testing-library/react";
import { mockGoal } from "../../../resultMocks";
import store from "../../../app/store";
import { Provider } from "react-redux";
import { renderWithProviders } from "../../../renderWithProviders";

describe("GoalCard", () => {
  it("should render with description", () => {
    const g = mockGoal({
      title: "test value",
      description: "test description",
    });
    const wrapper = render(
      <Provider store={store}>
        <GoalCard goal={g} />
      </Provider>
    );
    expect(wrapper.getByText(g.title)).toBeInTheDocument();
    expect(wrapper.getByText(g.description as string)).toBeInTheDocument();
  });

  it.only("should add new outcome", async () => {
    const wrapper = renderWithProviders(<GoalCard goal={mockGoal()} />);

    const addOutcomeButton = wrapper.getByTestId("add-outcome-button");
    addOutcomeButton.click();

    const outcomeCount = Array.from(
      wrapper.store.getState().outcomes.ids
    ).length;
    expect(outcomeCount).toBe(1);
  });
});
