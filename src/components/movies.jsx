import React, { Component } from 'react'
import{getMovies} from '../services/fakeMovieService';
import ListGroup from '../components/common/listGroup';
import{getGenres} from '../services/fakeGenreService';
import Pagination from '../components/common/pagination';
import {paginate } from '../utils/paginate'
import MoviesTable from '../components/moviesTable';
import _ from 'lodash';

export default class movies extends Component {
    state={
        movies:[],
        currentPage : 1,
        pageSize : 4,
        genres:[],
        sortColumn:{path: 'title',order:'asc'} 
    };
    componentDidMount(){
const genres=[{ _id:"" ,name:"All Genre"}, ...getGenres()]

      this.setState({movies:getMovies(),genres});

    }
    
    handleDelete=movie=>{
        const movies =this.state.movies.filter(m=>m._id !==movie._id);
        this.setState({movies});

    }
    handleLike=movie=>{
      const movies =[...this.state.movies];
      const index = movies.indexOf(movie);
      movies[index] = {...movies[index]};
      movies[index].liked =!movies[index].liked;
      this.setState({movies});
    }
    handlePageChange=page=>{
    this.setState({currentPage : page});
    }
    handleGenreSelect=genre=>{
      this.setState({selectedGenre:genre,currentPage:1});
    }
    handleSort=sortColumn=>{
      this.setState({sortColumn});
    };
  render() {
    const {length:count}=this.state.movies;
    const{pageSize,
      currentPage,
      sortColumn, 
      selectedGenre,
      movies:allMovies}
      =this.state;

    if(count ===0 )return(<p>There are no Movies in the database</p>);
    const filtered =selectedGenre && selectedGenre._id
    ?allMovies.filter(m=>m.genre._id ===selectedGenre._id ) 
    :allMovies;
    const sorted =_.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
    const movies = paginate(sorted,currentPage,pageSize);
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup  
          items={this.state.genres}
          selectedItem={this.state.selectedGenre}
          onItemSelect={this.handleGenreSelect}/>
        </div>
        <div className="col">
        <p>There are {filtered.length}movies in the database</p>
        <MoviesTable 
        movies={movies}
        sortColumn={sortColumn}
         onLike={this.handleLike}
          onDelete={this.handleDelete}
          onSort ={this.handleSort}/>
      <Pagination 
      itemsCount={filtered.length}
       pageSize = {pageSize}
       currentPage = {currentPage}
       onPageChange={this.handlePageChange}
       />
          </div> 
      
      </div>
    )
  }
}
