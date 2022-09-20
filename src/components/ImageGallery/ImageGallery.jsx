import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyle } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
    return (
      <ImageGalleryStyle>
        {images.map(({ id, tags, webformatURL, largeImageURL }) => {
          return <ImageGalleryItem key={id} smallImage={webformatURL} largeImage={largeImageURL} tags={tags} />;
        })}
      </ImageGalleryStyle>
    );
  };

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            tags: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        })
    ),
}