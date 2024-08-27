import { render, screen } from '@testing-library/react';
import UserList from '../../src/components/UserList';

describe('UserList', () => {
  it('renders a list of users', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    render(<UserList users={users} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);

    users.forEach((user) => {
      const link = screen.getByText(user.name);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/users/${user.id}`);
    });
  });

  it('renders "No users available." when users array is empty', () => {
    render(<UserList users={[]} />);

    const message = screen.getByText('No users available.');
    expect(message).toBeInTheDocument();

    const list = screen.queryByRole('list');
    expect(list).not.toBeInTheDocument();
  });

  it('renders correct number of list items', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    render(<UserList users={users} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  it('renders user names as links', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    render(<UserList users={users} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent('Alice');
    expect(links[1]).toHaveTextContent('Bob');
  });

  it('renders correct href for each user', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    render(<UserList users={users} />);

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/users/1');
    expect(links[1]).toHaveAttribute('href', '/users/2');
  });
});
