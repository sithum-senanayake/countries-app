import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../../src/components/Search";

describe("Search Component", () => {
  let mockOnSearch;
  let container; 

  beforeEach(() => {
    mockOnSearch = jest.fn();
    ({ container } = render(<Search onSearch={mockOnSearch} />));
  });

  test("calls onSearch with the search term on form submit", () => {
    const input = screen.getByPlaceholderText("Search for a country...");
    fireEvent.change(input, { target: { value: "India" } });

    const form = container.querySelector("form");
    fireEvent.submit(form);

    expect(mockOnSearch).toHaveBeenCalledWith("India");
  });

  test("clears search term and calls onSearch with an empty string when clear button is clicked", () => {
    const input = screen.getByPlaceholderText("Search for a country...");
    fireEvent.change(input, { target: { value: "India" } });

    const clearButton = screen.getByLabelText("Clear search");
    fireEvent.click(clearButton);

    expect(input.value).toBe(""); 
    expect(mockOnSearch).toHaveBeenCalledWith(""); 
  });

  test("updates the search term when typing in the input field", () => {
    const input = screen.getByPlaceholderText("Search for a country...");
    fireEvent.change(input, { target: { value: "USA" } });
    expect(input.value).toBe("USA"); 
  });
});
