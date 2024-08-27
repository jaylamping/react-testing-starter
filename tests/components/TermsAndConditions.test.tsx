import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import TermsAndConditions from '../../src/components/TermsAndConditions';

describe('TermsAndConditions', () => {
  const renderComponent = () => {
    render(<TermsAndConditions />);

    return {
      heading: screen.getByRole('heading'),
      checkbox: screen.getByRole('checkbox'),
      button: screen.getByRole('button'),
    };
  };
  const user = userEvent.setup();

  it('renders the component with correct initial state', () => {
    const { heading, checkbox, button } = renderComponent();

    expect(heading).toHaveTextContent(/terms & conditions/i);
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  it('enables the submit button when checkbox is checked', async () => {
    const { checkbox, button } = renderComponent();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
  });

  it('disables the submit button when checkbox is unchecked', async () => {
    const { checkbox, button } = renderComponent();

    await user.click(checkbox);
    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  it('toggles checkbox state correctly on multiple clicks', async () => {
    const { checkbox } = renderComponent();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
