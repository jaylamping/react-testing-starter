import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Theme } from '@radix-ui/themes';
import OrderStatusSelector from '../../src/components/OrderStatusSelector';

describe('OrderStatusSelector', () => {
  const renderOrderStatusSelector = () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    );

    return {
      button: screen.getByRole('combobox'),
      getOptions: () => screen.findAllByRole('option'),
      user: userEvent.setup(),
    };
  };

  it('should render New as the default value', () => {
    const { button } = renderOrderStatusSelector();

    expect(button).toHaveTextContent(/new/i);
  });

  it('should render correct statuses', async () => {
    const { button, getOptions, user } = renderOrderStatusSelector();

    await user.click(button);

    const options = await getOptions();
    expect(options).toHaveLength(3);
    const labels = options.map((option) => option.textContent);
    expect(labels).toEqual(['New', 'Processed', 'Fulfilled']);
  });
});
