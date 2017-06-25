import React, { Component } from 'react';


class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: []
    }
  }
  componentDidMount() {
    let dataURL = 'http://localhost:8888/wordpress/wp-json/wp/v2/movies?_embed'
    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        console.log('res ', res)
        this.setState({
          movies: res
        })
      })
  }
  render() {
    let movies = this.state.movies.map((movie, idx) => {
      return (
        <div key={idx}> 
          <img src={movie._embedded['wp:featuredmedia'][0].source_url} alt={movie._embedded['wp:featuredmedia'][0].alt_text} style={{height:'300px'}}/>
          <p><strong>Title:</strong> {movie.title.rendered}</p>
          <p><strong>Release Year:</strong> {movie.acf.release_year}</p>
          <p><strong>Rating:</strong> {movie.acf.rating}</p>
          <div><strong>Description:</strong><div dangerouslySetInnerHTML={ {__html: movie.acf.description} } /></div>
       </div>) 
    })
 
    return (
      <div className="App">
        <h2> React/Wordpress Starwars demo </h2>
        {movies}
      </div>
    );
  }
}

export default App;
