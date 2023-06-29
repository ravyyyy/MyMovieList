import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private moviesList: Movie[] = [
    { title: 'Into the Wild', year: 1997, director: 'Jon Kraukauer', genre: 'Biography', review: ''},
    { title: 'Mr. Penumbra s 24-Hour Bookstore', year: 2013, director: 'Robin Sloan', genre: 'Realistic Fiction', review: ''},
    { title: 'Tell the Wolves I m Home', year: 2013, director: 'Carol Rifka Brunt', genre: 'Realistic Fiction', review: ''},
    { title: 'The Shadow of the Wind', year: 2005, director: 'Carlos Ruis Zafon', genre: 'Mystery/Horror', review: ''},
    { title: 'Sharp Objects', year: 2007, director: 'Gillian Flynn', genre: 'Mystery/Horror', review: ''},
    { title: 'The Road', year: 2006, director: 'Cormac McCarthy', genre: 'Mystery/Horror', review: ''},
    { title: 'The Bride Collector', year: 2011, director: 'Ted Dekker', genre: 'Mystery/Horror', review: ''},
    { title: 'The Liars Club', year: 2005, director: 'Mary Karr', genre: 'Memoir', review: ''},
    { title: 'The Glass Castle', year: 2006, director: 'Jeannette Walls', genre: 'Memoir', review: ''},
    { title: 'Same Kind of Different', year: 2006, director: 'Ron Hall', genre: 'Memoir', review: ''},
    { title: 'Smoke Gets in Your Eyes: and Other Lessons from the Crematory', year: 2014, director: 'Caitlin Doughty', genre: 'Memoir', review: ''},
    { title: 'Brain on Fire', year: 2013, director: 'Susannah Cahalan', genre: 'Psychology/Memoir', review: ''},
    { title: 'Girl, Interrupted', year: 1994, director: 'Susanna Kaysen', genre: 'Psychology/Memoir', review: ''},
    { title: 'Darkness Visible', year: 1992, director: 'William Styron', genre: 'Psychology/Memoir', review: ''},
    { title: 'California', year: 2014, director: 'Edan Lepucki', genre: 'Dystopia', review: ''},
    { title: 'We', year: 1983, director: 'Yevgeny Zamyatin', genre: 'Dystopia', review: ''},
    { title: 'Black (series)', year: 2009, director: 'Ted Dekker', genre: 'Science Fiction/Fantasy', review: ''},
    { title: 'Black Moon', year: 2015, director: 'Kenneth Calhoun', genre: 'Science Fiction/Fantasy', review: ''},
    { title: 'The Bone Clocks', year: 2014, director: 'David Mitchell', genre: 'Science Fiction/Fantasy', review: ''},
  ]; 
  moviesListSubject = new Subject<Movie[]>();

  constructor() { }

  get movies(): Movie[] {
    return this.moviesList;
  }

  set movies(moviesToSet: any) {
    this.moviesList = moviesToSet;
    this.moviesListSubject.next(moviesToSet);
  }

  deleteMovie(movie: Movie) {
    const index = this.moviesList.findIndex(() => movie);
    this.moviesList.splice(index, 1);
    this.moviesListSubject.next(this.moviesList);
  }

  addMovie() {
    this.moviesList.push(this.emptyMovie());
    this.moviesListSubject.next(this.moviesList);
  }

  emptyMovie(): Movie {
    return {
      title: '-',
      year: 1,
      director: '-',
      genre: '-',
      review: '-'
    }
  }
}