import { render, screen } from '@testing-library/react';
import ProductImageGallery from '../../src/components/ProductImageGallery';

describe('ProductImageGallery', () => {
  it('renders nothing when imageUrls is empty', () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders a list of images when imageUrls is not empty', () => {
    const imageUrls = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    render(<ProductImageGallery imageUrls={imageUrls} />);
    const listItems = screen.getAllByRole('listitem');

    expect(listItems).toHaveLength(3);
    listItems.forEach((item, index) => {
      const img = item.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', imageUrls[index]);
    });
  });

  it('renders correct number of images when imageUrls has one item', () => {
    const imageUrls = ['single-image.jpg'];
    render(<ProductImageGallery imageUrls={imageUrls} />);
    const listItems = screen.getAllByRole('listitem');
    const img = screen.getByRole('img');

    expect(listItems).toHaveLength(1);
    expect(img).toHaveAttribute('src', 'single-image.jpg');
  });

  it('handles duplicate image URLs correctly', () => {
    const imageUrls = ['image1.jpg', 'image1.jpg', 'image2.jpg'];
    render(<ProductImageGallery imageUrls={imageUrls} />);
    const listItems = screen.getAllByRole('listitem');
    const images = screen.getAllByRole('img');

    expect(listItems).toHaveLength(3);
    expect(images[0]).toHaveAttribute('src', 'image1.jpg');
    expect(images[1]).toHaveAttribute('src', 'image1.jpg');
    expect(images[2]).toHaveAttribute('src', 'image2.jpg');
  });
});
