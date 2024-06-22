import { useEffect, useState } from 'react';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';

import getGallerySearch from '../unsplash-api';

import { Images, ErrorType, ImageItem } from './App.types';

function App() {
  const [images, setImages] = useState<Images[]>([]);
  const [topicValue, setTopic] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType[]>([false, undefined]);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [imageItem, setImageValue] = useState<ImageItem>({});

  useEffect(() => {
    if (images.length > 0) {
      page >= totalPages ? setLoadMore(false) : setLoadMore(true);
    }
    if (page > 1) {
      window.scrollBy({
        top: window.innerHeight / 1.5,
        behavior: 'smooth',
      });
    } else {
      topicValue && setPage(1);
    }
  }, [images]);

  useEffect(() => {
    if (!topicValue) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const {
          results,
          total_pages,
        }: { results: Images[]; total_pages: number } = await getGallerySearch(
          topicValue,
          page
        );
        if (results.length === 0) {
          throw new Error('No results found');
        }
        if (page === 1) {
          setTotalPages(total_pages);
          setImages(results);
        } else {
          setImages([...images, ...results]);
        }
      } catch (error: any) {
        const errMessage: string = error.message;
        setError([true, errMessage]);
        loadMore && setLoadMore(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, topicValue]);

  const handleSearch = (topic: string) => {
    setTopic(topic);
    setImages([]);
    setError([false, undefined]);
    setLoadMore(false);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleImageView = (
    evt: React.MouseEvent<HTMLDivElement>,
    values: ImageItem
  ) => {
    evt.preventDefault();
    setImageValue(values);
    setIsOpen(true);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch}></SearchBar>
      <section className="gallerySection">
        {images.length > 0 && (
          <ImageGallery items={images} handleClick={handleImageView} />
        )}
        {loading && <Loader></Loader>}
        {error[0] && <ErrorMessage value={error}></ErrorMessage>}
        {loadMore > loading && (
          <LoadMoreBtn onClick={handleLoadMore}>
            <span>
              {page} of {totalPages}
            </span>
          </LoadMoreBtn>
        )}
        {modalIsOpen && (
          <ImageModal
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            item={imageItem}
          ></ImageModal>
        )}
      </section>
    </>
  );
}

export default App;
