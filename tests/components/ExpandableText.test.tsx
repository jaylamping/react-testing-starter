import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpandableText from '../../src/components/ExpandableText';

describe('ExpandableText', () => {
  const limit = 255;
  const longText = 'A'.repeat(limit + 1);
  const truncatedText = longText.substring(0, limit);
  const user = userEvent.setup();

  it('renders full text when length is less than or equal to limit', () => {
    const shortText = 'This is a short text';
    render(<ExpandableText text={shortText} />);

    expect(screen.getByText(shortText)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders truncated text with "Show More" button when text exceeds limit', () => {
    render(<ExpandableText text={longText} />);

    expect(screen.getByText(/^A{255}\.\.\./)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /more/i })).toBeInTheDocument();
  });

  it('expands text when "Show More" is clicked', async () => {
    render(<ExpandableText text={longText} />);
    const button = screen.getByRole('button');

    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /less/i })).toBeInTheDocument();
  });

  it('collapses text when "Show Less" is clicked', async () => {
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole('button', { name: /more/i });
    await user.click(showMoreButton); // expand

    const showLessButton = screen.getByRole('button', { name: /less/i });
    await user.click(showLessButton); // collapse

    expect(screen.getByText(/^A{255}\.\.\./)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /more/i })).toBeInTheDocument();
  });

  it('handles text exactly at the limit', () => {
    render(<ExpandableText text={truncatedText} />);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
