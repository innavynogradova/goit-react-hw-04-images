import { Component } from "react";
import { GlobalStyle } from "./GlobalStyle";
import { Box } from "./Box";
import { fetchApi } from '../services/api';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";

import { Notify } from "notiflix";


export class App extends Component {

  state = {
        searchQuery: '',
        page: 1,
        images: '',
        loading: false,
        totalPages: '',

  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    
    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      this.fetchImages();
    };
  };

  handleSearchQuery = value => {

    const { searchQuery } = this.state;

    if (value === '') {
      this.setState({ 
        searchQuery: '', 
        page: 1, 
        images: [] 
      });
      Notify.warning("You didn't enter anything!");
      return;
    }

    if (value === searchQuery) {
      return;
    }

    this.setState({
      loading: true,
      searchQuery: value,
      page: 1,
      images: [],
    });
  };

  fetchImages = async () => {
    const { searchQuery, page } = this.state;
    try {

      this.setState({
        loading: true,
      });

      const data = await fetchApi(searchQuery, page);
      // console.log(data.hits);

      if (data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      const imageData = data.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        })
      );
      
      this.setState(prevState => ({
        images: [...prevState.images, ...imageData],
        totalPages: Math.ceil(data.total / 12),
      }));
      // console.log(this.state.totalPages, this.state.page);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  loadMore = () => {
    this.setState((prevState) => ({
    page: prevState.page + 1
  }));    
  };

  render() {

    const { images, loading, totalPages, page } = this.state;
    const imagesExist = images.length !== 0;
    const isNotLastPage = page < totalPages;

    return (
      <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
        <Searchbar onSubmit={this.handleSearchQuery} />
        {imagesExist && <ImageGallery images={images} loadMore={this.loadMore} />}
        {loading ? (<Loader />) : (imagesExist && isNotLastPage && <Button onClick={this.loadMore} />)}
        <GlobalStyle />
      </Box>
    );
  }

  
};
