import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Form, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.scss']
})
export class MovieTableComponent implements OnInit{
  moviesList!: Movie[];
  isModalVisible: boolean = false;
  movieForm!: FormGroup;
  isEditModalVisible: boolean = false;
  editMovieForm!: FormGroup;
  actualTitle!: string;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((res) => {
      console.log(res);
    });

    this.moviesService.moviesListSubject.subscribe((res) => {
      this.moviesList = [...res];
      console.log('in subscribe ');
    });
  }

  ngOnInit(): void {
      this.moviesList = this.moviesService.movies;
      this.initializeForm();
      console.log(this.moviesList);
  }

  initializeEditForm(movie: Movie): void {
    this.editMovieForm = new FormGroup({
      title: new FormControl(movie.title, [Validators.required]),
      year: new FormControl(movie.year, [Validators.required]),
      director: new FormControl(movie.director, [Validators.required]),
      genre: new FormControl(movie.genre, [Validators.required]),
      review: new FormControl(movie.review, [Validators.required])
    });
  }

  initializeForm(): void {
    this.movieForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      year: new FormControl(null, [Validators.required]),
      director: new FormControl(null, [Validators.required]),
      genre: new FormControl(null, [Validators.required]),
      review: new FormControl(null, [Validators.required])
    });
  }

  add() {
    this.showModal();
  }

  delete(movie: Movie) {
    const index = this.moviesList.indexOf(movie);
    if (index !== -1) {
      this.moviesList.splice(index, 1);
      this.moviesService.moviesListSubject.next(this.moviesList);
    }
  }

  edit(movie: Movie) {
    this.showEditModal();
    this.actualTitle = movie.title;
    this.initializeEditForm(movie);
  }

  handleOk(): void {
    if(this.movieForm.valid) {
      const newMovie: Movie = {
        title: this.title.value,
        year: this.year.value,
        director: this.director.value,
        genre: this.genre.value,
        review: this.review.value
      };

      this.moviesList.push(newMovie);
      this.moviesService.moviesListSubject.next(this.moviesList);
    }

    this.isModalVisible = false;
  }

  handleEditOk(): void {
    if (this.editMovieForm.valid) {
      const editedMovie: Movie = {
        title: this.editMovieForm.get('title')?.value,
        year: this.editMovieForm.get('year')?.value,
        director: this.editMovieForm.get('director')?.value,
        genre: this.editMovieForm.get('genre')?.value,
        review: this.editMovieForm.get('review')?.value
      };

      const index = this.moviesList.findIndex(movie => movie.title === this.actualTitle);
    
      if(index !== -1) {
        this.moviesList[index] = editedMovie;
        this.moviesService.moviesListSubject.next(this.moviesList);
      }
    }

    this.isEditModalVisible = false;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  handleEditCancel(): void {
    this.isEditModalVisible = false;
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  showEditModal(): void {
    this.isEditModalVisible = true;
  }

  get title(): FormControl {
    return this.movieForm.get('title') as FormControl;
  }

  get year(): FormControl {
    return this.movieForm.get('year') as FormControl;
  }

  get director(): FormControl {
    return this.movieForm.get('director') as FormControl;
  }

  get genre(): FormControl {
    return this.movieForm.get('genre') as FormControl;
  }

  get review(): FormControl {
    return this.movieForm.get('review') as FormControl;
  }
}