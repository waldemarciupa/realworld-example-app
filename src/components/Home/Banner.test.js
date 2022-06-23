import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Banner from './Banner';

describe('Banner', () => {
  const appName = 'Conduit';

  it('should render Banner component', () => {
    const { container } = render(<Banner token={null} appName={appName} />);
    const banner = container.querySelector('.banner');
    expect(banner).toBeInTheDocument();
  });

  it('should NOT render Banner component if token is true', () => {
    const { container } = render(<Banner token={true} appName={appName} />);
    const banner = container.querySelector('.banner');
    expect(banner).not.toBeInTheDocument();
  });
  it('should render Banner {appName} to lowercase', () => {
    const { container } = render(<Banner token={null} appName={appName} />);
    const appNameElement = container.querySelector('h1');
    expect(appNameElement).toHaveTextContent('conduit');
  });

  it('should render Banner paragraph', () => {
    const { container } = render(<Banner token={null} appName={appName} />);
    const paragraphElement = container.querySelector('p');
    expect(paragraphElement).toHaveTextContent('A place to share your knowledge.');
  });
});
