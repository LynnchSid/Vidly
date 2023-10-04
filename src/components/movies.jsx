import React, { Component } from 'react'
import{getMovies} from '../services/fakeMovieService';
import ListGroup from '../components/common/listGroup';
import Like from '../components/common/like';
import{getGenres} from '../services/fakeGenreService';
import Pagination from '../components/common/pagination';
import {paginate } from '../utils/paginate'

export default class movies extends Component {
    state={
        movies:[],
        currentPage : 1,
        pageSize : 4,
        genres:[]
    };
    componentDidMount(){
      this.setState({movies:getMovies(),genres:getGenres()});

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
      console.log(genre);
    }
  render() {
    const {length:count}=this.state.movies;
    const{pageSize,currentPage,movies:allMovies}=this.state;
    if(count ===0 )return(<p>There are no Movies in the database</p>);
    const movies = paginate(allMovies,currentPage,pageSize);
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup  
          items={this.state.genres}
          textProperty = "name"
          valueProperty = "_id"
          onItemSelect={this.handleGenreSelect}/>
        </div>
        <div className="col">
        <p>There are {count}movies in the database</p>
      <table className="table">
        <thead>
            <tr key={movies._id}>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {movies.map(movie=>(
                <tr>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like liked={movie.liked} onClick={()=>this.handleLike(movie)}/>
                    </td>
                    <td><button onClick={()=>this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
            </tr>
            ))}
            
        </tbody>
      </table>
      <Pagination 
      itemsCount={count}
       pageSize = {pageSize}
       currentPage = {currentPage}
       onPageChange={this.handlePageChange}
       />
          </div> 
      
      </div>
    )
  }
}
