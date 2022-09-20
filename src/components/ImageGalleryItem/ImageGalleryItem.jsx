import PropTypes from 'prop-types';
import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import { ItemStyle, ItemImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {

    state = {
        showModal: false,
    }

    toggle = () => {
        this.setState(({ showModal }) => ({ showModal: !showModal }));
    };

    render() {

        const { showModal } = this.state;
        const { largeImage, smallImage, tags } = this.props;
        
        return (
            <>
                <ItemStyle onClick={this.toggle} >
                    <ItemImage src={smallImage} alt={tags} />
                </ItemStyle>
                {showModal && (
                    <Modal onMClose={this.toggle} image={largeImage} tags={tags} />
                )}
            </>
        );
    }
      
};

ImageGalleryItem.propType = {
    largeImage: PropTypes.string.isRequired,
    smallImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
};