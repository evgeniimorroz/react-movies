import React from "react";
import { Movies } from "../components/Movies";
import { Preloader } from '../components/Preloader';
import { Search } from '../components/Search';

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component {
    state = {
        movies: [],
        loading: true,
    }

    // закидываем data в state.movies
    componentDidMount() {
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=movies`)
            .then(res => res.json())
            .then(data => this.setState({movies: data.Search, loading: false}))
    }

    //запрос в поисковой строке
    searchMovies = (str, type = 'all') => {
        this.setState({loading: true})
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${
                type !== 'all' ? `&type=${type}` : ''}`)
            .then(res => res.json())
            .then(data => this.setState({movies: data.Search, loading: false}))
    }

    render() {
        const {movies, loading} = this.state;

        return <main className="container content">
            <Search searchMovies={this.searchMovies}/>
            {
    //проверка, ессли есть movies возвращаем <Movies> если нет <Preloader>
                loading.length ? (
                    <Preloader /> 
                ) : ( 
                    <Movies movies={movies} />
                )}
           
        </main>
    }
}

export {Main};