import Modal from 'react-modal';
import { ImageItem } from '../App.types';
import { Dispatch, SetStateAction } from 'react';

// Make sure to bind modal to your AppElement
Modal.setAppElement('#root');

type Props = {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  item: ImageItem;
};

const ImageModal = ({ modalIsOpen, setIsOpen, item }: Props) => {
  const src = item.regular;
  const description = item.description;
  const alt = item.alt;

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(46, 47, 66, 0.4)',
    },
    content: {
      width: '1024px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      color: '#fafafa',
      backgroundColor: 'rgba(46, 47, 66, 1)',
    },
  };

  let subtitle: any;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#fafafa';
    subtitle.style.textTransform = 'capitalize';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3 ref={_subtitle => (subtitle = _subtitle)}>{alt}</h3>
        <div>
          <img src={src} alt={alt} />
          {description != 'null' && <p>{description}</p>}
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
