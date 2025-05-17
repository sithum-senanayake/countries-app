import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../../src/components/Filter";

describe("Filter Component", () => {
  let mockOnFilter;

  beforeEach(() => {
    mockOnFilter = jest.fn();
    render(<Filter onFilter={mockOnFilter} />);
  });

    
  test("calls onFilter when a region is selected", () => {
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Asia" } });

    expect(mockOnFilter).toHaveBeenCalledWith("Asia");
  });

  test("shows the correct selected region", () => {
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Europe" } });

    expect(select.value).toBe("Europe");
  });
});
