import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Tags from './Tags';

describe('Tags', () => {
  it('should render "Loading Tags..." when missing tags prop', () => {
    render(<Tags />);
    const loadingElement = screen.getByText('Loading Tags...');
    expect(loadingElement).toBeInTheDocument();
  });

  it('should render list of buttons with tags when tags props passed', () => {
    render(<Tags tags={['first', 'second']} />);
    const buttonsList = screen.queryAllByRole('button');
    expect(buttonsList).toHaveLength(2);
  });

  it('should call onClickTag prop when clicked', () => {
    const handleClick = jest.fn();
    render(<Tags tags={['first', 'second']} onClickTag={handleClick} />);
    fireEvent.click(screen.getByText(/first/i));
    expect(handleClick).toBeCalledTimes(1);
  });
});
