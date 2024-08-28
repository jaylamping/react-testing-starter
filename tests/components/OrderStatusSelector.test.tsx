import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Theme } from '@radix-ui/themes';
import OrderStatusSelector from '../../src/components/OrderStatusSelector';

describe('OrderStatusSelector', () => {
  const renderOrderStatusSelector = () => {
    const onChange = vi.fn();
    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );

    return {
      button: screen.getByRole('combobox'),
      getOptions: () => screen.findAllByRole('option'),
      getOption: (label: RegExp) => screen.getByRole('option', { name: label }),
      onChange,
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

  it.each([
    { label: /processed/i, value: 'processed' },
    { label: /fulfilled/i, value: 'fulfilled' },
  ])(
    'should call onChange with $value when the $label option is selected',
    async ({ label, value }) => {
      const { button, getOption, onChange, user } = renderOrderStatusSelector();

      await user.click(button);

      const option = getOption(label);
      await user.click(option);

      expect(onChange).toHaveBeenCalledWith(value);
    }
  );

  it("should call onChange with 'new' when the 'New' option is selected", async () => {
    const { button, getOption, onChange, user } = renderOrderStatusSelector();

    await user.click(button);

    const processedOption = getOption(/processed/i);
    await user.click(processedOption);

    await user.click(button);

    const newOption = getOption(/new/i);
    await user.click(newOption);

    expect(onChange).toHaveBeenCalledWith('new');
  });
});
