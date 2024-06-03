import css from './ImageCard.module.css';
import { ImageItem } from '../App.types';

type Props = {
  values: ImageItem;
  onClick: (evt: React.MouseEvent<HTMLDivElement>, values: ImageItem) => void;
};

const ImageCard = ({ onClick, values }: Props) => {
  return (
    <div className={css.imgBox}>
      <img
        className={css.img}
        onClick={evt => {
          onClick(evt, values);
        }}
        src={values.src}
        alt={values.alt}
      />
    </div>
  );
};

export default ImageCard;
