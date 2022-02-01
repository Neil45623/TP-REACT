import React, { Component } from 'react';
import axios from 'axios';
import Form from './components/Form';
import Result from './components/Result';
import Giphy from './components/Giphy';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
    };
  }

  searchGifsTenor = (str) => {
    axios
      .get(`https://g.tenor.com/v1/search?&q=${str}&key=L84KFQYOR890`)
      .then((result) =>
        this.setState({
          gifs: result.data.results,
        })
      );
  };

  render() {
    return (
      <div className="Appli">
        <div className="Tenor">
          <h1>Rechercher un GIF dans gifs Tenor</h1>
          <Form search={this.searchGifsTenor} />
          <Result gifs={this.state.gifs} />
        </div>
        <div className="Giphy">
          <h1>Rechercher un GIF dans les gifs Giphy</h1>
          <Giphy />
        </div>
      </div>
    );
  }
}

export default App;