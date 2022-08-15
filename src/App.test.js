import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Filters', () => {
  test('Renders Filters: title', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent('Filters:');
  });

  test('Renders filters form', () => {
    render(<App />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  test('Renders filters form with correct intitial values', () => {
    render(<App />);
    expect(screen.getByRole('form')).toHaveFormValues({
      department: '0',
      name: ''
    });
  });

  describe('Department Filter', () => {
    test('Managers department is selected correctly', () => {
      render(<App />);
      userEvent.selectOptions(screen.getByLabelText('Department:'), '1');
      expect(screen.getByText('Managers').selected).toBeTruthy();
      expect(screen.queryByText('All').selected).toBeFalsy();
    });

    test('Only Operators list is visible after selecting it from the department filter', () => {
      render(<App />);
      userEvent.selectOptions(screen.getByLabelText('Department:'), '2');
      expect(screen.getByLabelText('Operators:')).toBeInTheDocument();
      expect(screen.queryByLabelText('Managers:')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('No Department:')).not.toBeInTheDocument();
    });

    test('All departments are visible after selecting All from the department filter', () => {
      render(<App />);
      userEvent.selectOptions(screen.getByLabelText('Department:'), '0');
      expect(screen.getByLabelText('Operators:')).toBeVisible();
      expect(screen.getByLabelText('Managers:')).toBeVisible();
      expect(screen.getByLabelText('No Department:')).toBeVisible();
    });
  });

  describe('Name Filter', () => {
    test('Name filter has a value after typing in it', () => {
      render(<App />);
      userEvent.type(screen.getByLabelText('Name:'), 'test');
      expect(screen.getByRole('textbox', { name: 'Name:' })).toHaveValue('test');
    });

    test('Employee is visible after searching for him', () => {
      render(<App />);
      userEvent.type(screen.getByLabelText('Name:'), 'liam');
      expect(screen.getByText('Liam')).toBeVisible();
    });

    test('Employee is not visible after searching for something different from his name', () => {
      render(<App />);
      userEvent.type(screen.getByLabelText('Name:'), 'something');
      expect(screen.queryByText('Ava')).not.toBeInTheDocument();
    });
  });
});

describe('Selecting items', () => {
  test("Company name is selected after clicking on it's checkbox", () => {
    render(<App />);
    userEvent.click(screen.getByLabelText('Acme'));
    expect(screen.getByLabelText('Acme')).toBeChecked();
  });

  test('All departments are selected after clicking the company name checkbox', () => {
    render(<App />);
    userEvent.click(screen.getByLabelText('Acme'));
    expect(screen.getByLabelText('Managers:')).toBeChecked();
    expect(screen.getByLabelText('Operators:')).toBeChecked();
    expect(screen.getByLabelText('No Department:')).toBeChecked();
  });

  test('Company name is deselected after deselecting Operators department', () => {
    render(<App />);
    userEvent.click(screen.getByLabelText('Acme'));
    userEvent.click(screen.getByLabelText('Operators:'));
    expect(screen.getByLabelText('Acme')).not.toBeChecked();
  });

  test('All employees in the Managers department are selected after the department is selected', () => {
    render(<App />);
    userEvent.click(screen.getByLabelText('Managers:'));
    expect(screen.getByLabelText('Liam')).toBeChecked();
    expect(screen.getByLabelText('Mellors')).toBeChecked();
  });

  test('Managers department is selected after all employees in it are selected', () => {
    render(<App />);
    userEvent.click(screen.getByLabelText('Liam'));
    userEvent.click(screen.getByLabelText('Mellors'));
    expect(screen.getByLabelText('Managers:')).toBeChecked();
  });

  test('Managers department is deselected after an employees in it is deselected', () => {
    render(<App />);
    userEvent.click(screen.getByLabelText('Managers:'));
    userEvent.click(screen.getByLabelText('Liam'));
    expect(screen.getByLabelText('Managers:')).not.toBeChecked();
  });
});
