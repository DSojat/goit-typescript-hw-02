import { FormEvent, ChangeEventHandler } from 'react';
import toast, { Toaster, resolveValue } from 'react-hot-toast';
import css from './SearchBar.module.css';

type Props = {
  onSubmit: (topic: string) => void;
};

const SearchBar = ({ onSubmit }: Props) => {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const { topicInput }: any = form.elements;
    const topic: string = topicInput.value.trim().toLowerCase();

    if (topic === '') {
      toast.error('Please enter search term!');
      return;
    }

    onSubmit(topic);
    form.reset();
  };

  return (
    <header className={css.header}>
      <h2 className={css.title}>Search machine</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          name="topicInput"
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">
          &#128269;
        </button>
        <Toaster
          toastOptions={{ duration: 2000 }}
          containerStyle={{
            top: 100,
          }}
        >
          {t => (
            <div
              style={{
                opacity: t.visible ? 1 : 0,
                background: 'white',
                padding: 8,
                color: 'blue',
              }}
            >
              {resolveValue(t.message, t)}
            </div>
          )}
        </Toaster>
      </form>
      <h2 className={css.title}>Search machine</h2>
    </header>
  );
};

export default SearchBar;
