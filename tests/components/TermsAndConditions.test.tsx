import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import TermsAndConditions from '../../src/components/TermsAndConditions';

describe('TermsAndConditions', () => {
  it('renders the component with correct initial state', () => {
    const { getByText, getByLabelText } = render(<TermsAndConditions />);

    expect(getByText('Terms & Conditions')).toBeInTheDocument();
    expect(
      getByText(
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, delectus.'
      )
    ).toBeInTheDocument();
    expect(
      getByLabelText('I accept the terms and conditions.')
    ).not.toBeChecked();
    expect(getByText('Submit')).toBeDisabled();
  });

  it('enables the submit button when checkbox is checked', async () => {
    const { getByLabelText, getByText } = render(<TermsAndConditions />);
    const checkbox = getByLabelText('I accept the terms and conditions.');
    const submitButton = getByText(/submit/i);

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(submitButton).toBeEnabled();
  });

  it('disables the submit button when checkbox is unchecked', async () => {
    const { getByLabelText, getByText } = render(<TermsAndConditions />);
    const checkbox = getByLabelText('I accept the terms and conditions.');
    const submitButton = getByText(/submit/i);

    await userEvent.click(checkbox);
    await userEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(submitButton).toBeDisabled();
  });

  it('toggles checkbox state correctly on multiple clicks', async () => {
    const { getByLabelText } = render(<TermsAndConditions />);
    const checkbox = getByLabelText('I accept the terms and conditions.');

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
