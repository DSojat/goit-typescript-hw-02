import css from './LoadMoreBtn.module.css';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
};

const LoadMoreBtn = ({ onClick, children }: Props) => {
  return (
    <button className={css.button} type="button" onClick={onClick}>
      Load more: {children}
    </button>
  );
};
export default LoadMoreBtn;
