import { render, screen } from '@testing-library/react';
import UserAccount from '../../src/components/UserAccount';

describe('UserAccount', () => {
  it('should render user name', () => {
    const user = { name: 'John Doe', isAdmin: false };
    render(<UserAccount user={user} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render edit button for admin users', () => {
    const user = { name: 'Admin User', isAdmin: true };
    render(<UserAccount user={user} />);
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });

  it('should not render edit button for non-admin users', () => {
    const user = { name: 'Regular User', isAdmin: false };
    render(<UserAccount user={user} />);
    expect(
      screen.queryByRole('button', { name: /edit/i })
    ).not.toBeInTheDocument();
  });

  it('should render the user profile heading', () => {
    const user = { name: 'Test User', isAdmin: false };
    render(<UserAccount user={user} />);
    expect(
      screen.getByRole('heading', { name: /profile/i })
    ).toBeInTheDocument();
  });

  it('should render the name label', () => {
    const user = { name: 'Jane Doe', isAdmin: false };
    render(<UserAccount user={user} />);
    expect(screen.getByText('Name:')).toBeInTheDocument();
  });
});
