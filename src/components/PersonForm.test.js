// src/components/PersonForm.test.js

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PersonForm } from "./PersonForm";
import axios from "axios";

// Mock axios so that we don't make real HTTP requests
jest.mock("axios");

describe("PersonForm", () => {
  //   it('should render the form correctly', () => {
  //     render(<PersonForm />);

  //     // Check if form elements are present using data-testid
  //     expect(screen.getByTestId('full-name-input')).toBeInTheDocument();
  //     expect(screen.getByTestId('shirt-size-select')).toBeInTheDocument();
  //     expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  //   });

  //   it('should show error message if fullName is too short', async () => {
  //     render(<PersonForm />);

  //     const fullNameInput = screen.getByTestId('full-name-input');
  //     fireEvent.change(fullNameInput, { target: { value: 'Jo' } });

  //     const errorMessage = await screen.findByTestId('full-name-error');
  //     expect(errorMessage).toHaveTextContent(/Full name must be at least 3 characters/i);
  //   });

  it("should show error message if shirt size is deselected", async () => {
    render(<PersonForm />);

    // Fill in a valid full name
    fireEvent.change(screen.getByTestId("full-name-input"), {
      target: { value: "John Doe" },
    });

    // Select a valid shirt size
    fireEvent.change(screen.getByTestId("shirt-size-select"), {
      target: { value: "M" },
    });

    // Deselect the shirt size by selecting the blank option
    fireEvent.change(screen.getByTestId("shirt-size-select"), {
      target: { value: "" },
    });

    // Submit the form
    fireEvent.click(screen.getByTestId("submit-button"));

    // Verify the error message
    const errorMessage = await screen.findByTestId("shirt-size-error");
    expect(errorMessage).toHaveTextContent(/this must be one of the following values: S, M, L, XL/i);
  });

  //   it('should update the animals array when checkboxes are selected and deselected', () => {
  //     render(<PersonForm />);

  //     const dogCheckbox = screen.getByTestId('animal-checkbox-1');
  //     const catCheckbox = screen.getByTestId('animal-checkbox-2');

  //     fireEvent.click(dogCheckbox);
  //     expect(dogCheckbox).toBeChecked();

  //     fireEvent.click(catCheckbox);
  //     expect(catCheckbox).toBeChecked();

  //     fireEvent.click(dogCheckbox);
  //     expect(dogCheckbox).not.toBeChecked();
  //   });

  //   it('should disable the submit button initially', () => {
  //     render(<PersonForm />);

  //     const submitButton = screen.getByTestId('submit-button');
  //     expect(submitButton).toBeDisabled();
  //   });

  //   it('should submit the form successfully with valid data', async () => {
  //     render(<PersonForm />);

  //     fireEvent.change(screen.getByTestId('full-name-input'), { target: { value: 'Jane Doe' } });
  //     fireEvent.change(screen.getByTestId('shirt-size-select'), { target: { value: 'L' } });
  //     fireEvent.click(screen.getByTestId('animal-checkbox-3')); // Bird

  //     axios.post.mockResolvedValueOnce({ data: { message: 'Form submitted successfully' } });

  //     const submitButton = screen.getByTestId('submit-button');
  //     fireEvent.click(submitButton);

  //     const successMessage = await screen.findByText('Form submitted successfully');
  //     expect(successMessage).toBeInTheDocument();
  //   });

  //   it('should reset the form after successful submission', async () => {
  //     render(<PersonForm />);

  //     fireEvent.change(screen.getByTestId('full-name-input'), { target: { value: 'Jane Doe' } });
  //     fireEvent.change(screen.getByTestId('shirt-size-select'), { target: { value: 'S' } });
  //     fireEvent.click(screen.getByTestId('animal-checkbox-4')); // Fish

  //     axios.post.mockResolvedValueOnce({ data: { message: 'Form submitted successfully' } });

  //     fireEvent.click(screen.getByTestId('submit-button'));

  //     await waitFor(() => {
  //       expect(screen.getByTestId('full-name-input').value).toBe('');
  //       expect(screen.getByTestId('shirt-size-select').value).toBe('');
  //       expect(screen.getByTestId('animal-checkbox-4')).not.toBeChecked();
  //     });
  //   });

  //   it('should show validation errors when all fields are empty', async () => {
  //     render(<PersonForm />);

  //     fireEvent.click(screen.getByTestId('submit-button'));

  //     const fullNameError = await screen.findByTestId('full-name-error');
  //     const shirtSizeError = await screen.findByTestId('shirt-size-error');
  //     expect(fullNameError).toHaveTextContent(/Full name is required/i);
  //     expect(shirtSizeError).toHaveTextContent(/Shirt size is required/i);
  //   });

  //   it('should show error message if full name exceeds 20 characters', async () => {
  //     render(<PersonForm />);

  //     fireEvent.change(screen.getByTestId('full-name-input'), {
  //       target: { value: 'A very long name exceeding twenty chars' },
  //     });

  //     screen.debug();

  //     const errorMessage = await screen.findByTestId('full-name-error');
  //     expect(errorMessage).toHaveTextContent(/Full name must be at most 20 characters/i);
  //   });

  //   it('should remove the error message after correcting the input', async () => {
  //     render(<PersonForm />);

  //     const fullNameInput = screen.getByTestId('full-name-input');

  //     fireEvent.change(fullNameInput, { target: { value: 'Jo' } });
  //     let errorMessage = await screen.findByTestId('full-name-error');
  //     expect(errorMessage).toBeInTheDocument();

  //     fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });

  //     await waitFor(() => {
  //       expect(screen.queryByTestId('full-name-error')).not.toBeInTheDocument();
  //     });
  //   });
});
