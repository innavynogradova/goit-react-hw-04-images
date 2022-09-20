import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyle } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.onClose);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onClose);
    }
    
    onClose = e => {
        if (e.target === e.currentTarget) {
            this.props.onMClose();
            return;
        }
        
        if (e.code === 'Escape') {
            this.props.onMClose();
        }
    };

    render() {

        const { image, tags } = this.props;
    
        return createPortal(
          <Overlay onClick={this.onClose}>
            <ModalStyle>
              <img src={image} alt={tags} />
            </ModalStyle>
          </Overlay>,
          modalRoot,
        );
      }
}

Modal.propTypes = {
    image: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };