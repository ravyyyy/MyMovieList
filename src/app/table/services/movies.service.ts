import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private moviesList: Movie[] = [
    { title: 'Titanic', year: 1997, director: 'James Cameron', genre: 'Drama', review: '84 years later, a 100 year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancé, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning.'},
    { title: 'Transformers: Rise of the Beasts', year: 2023, director: 'Steven Caple Jr.', genre: 'Action', review: 'Returning to the action and spectacle that have captured moviegoers around the world, Transformers: Rise of the Beasts will take audiences on a 90s globetrotting adventure with the Autobots and introduce a whole new faction of Transformers - the Maximals - to join them as allies in the existing battle for earth. Directed by Steven Caple Jr. and starring Anthony Ramos and Dominique Fishback.'},
    { title: 'The Dark Knight', year: 2008, director: 'Christopher Nolan', genre: 'Action', review: 'Set within a year after the events of Batman Begins (2005), Batman, Lieutenant James Gordon, and new District Attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City, until a mysterious and sadistic criminal mastermind known only as "The Joker" appears in Gotham, creating a new wave of chaos. Batmans struggle against The Joker becomes deeply personal, forcing him to confront everything he believes" and improve his technology to stop him. A love triangle develops between Bruce Wayne, Dent, and Rachel Dawes.'},
    { title: 'Jurassic Park', year: 1993, director: 'Steven Spielberg', genre: 'Action', review: 'Huge advancements in scientific technology have enabled a mogul to create an island full of living dinosaurs. John Hammond has invited four individuals, along with his two grandchildren, to join him at Jurassic Park. But will everything go according to plan? A park employee attempts to steal dinosaur embryos, critical security systems are shut down and it now becomes a race for survival with dinosaurs roaming freely over the island.'},
    { title: 'Thor', year: 2011, director: 'Kenneth Branagh', genre: 'Fantasy', review: 'The powerful but arrogant god Thor is cast out of Asgard to live amongst humans in Midgard (Earth), where he soon becomes one of their finest defenders.'},
    { title: 'Dungeons & Dragons: Honor Among Thieves', year: 2023, director: 'John Francis Daley', genre: 'Adventure', review: 'A charming thief and a band of unlikely adventurers embark on an epic quest to retrieve a lost relic, but things go dangerously awry when they run afoul of the wrong people.'},
    { title: 'Django Unchained', year: 2012, director: 'Quentin Tarantino', genre: 'Western', review: 'With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation owner in Mississippi.'},
    { title: 'Avengers: Endgame', year: 2019, director: 'Anthony & Joe Russo', genre: 'Action', review: 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.'},
    { title: 'Star Wars: Episode III - Revenge of the Sith', year: 2005, director: 'George Lucas', genre: 'Fantasy', review: 'Three years into the Clone Wars, Obi-Wan pursues a new threat, while Anakin is lured by Chancellor Palpatine into a sinister plot to rule the galaxy.'},
    { title: 'The Hunger Games', year: 2012, director: 'Gary Ross', genre: 'Action', review: 'Katniss Everdeen voluntarily takes her younger sisters place in the Hunger Games: a televised competition in which two teenagers from each of the twelve Districts of Panem are chosen at random to fight to the death.'},
    { title: 'Thor: Ragnarok', year: 2017, director: 'Taika Waititi', genre: 'Action', review: 'Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela.'},
    { title: 'Avatar: The Way of Water', year: 2022, director: 'James Cameron', genre: 'Adventure', review: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Navi race to protect their home.'},
    { title: 'Indiana Jones and the Dial of Destiny', year: 2023, director: 'James Mangold', genre: 'Adventure', review: 'Archaeologist Indiana Jones races against time to retrieve a legendary artifact that can change the course of history.'},
    { title: 'Barbie', year: 2023, director: 'Greta Gerwig', genre: 'Comedy', review: 'To live in Barbie Land is to be a perfect being in a perfect place. Unless you have a full-on existential crisis. Or youre a Ken.'},
    { title: 'Inception', year: 2010, director: 'Christopher Nolan', genre: 'Sci-Fi', review: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.'},
    { title: 'The Matrix', year: 1999, director: 'Lana & Lilly Wachowski', genre: 'Sci-Fi', review: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.'},
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977, director: 'George Lucas', genre: 'Fantasy', review: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empires world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.'},
    { title: 'Back to the Future', year: 1985, director: 'Robert Zemeckis', genre: 'Sci-Fi', review: 'Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.'},
    { title: 'Spider-Man: Into the Spider-Verse', year: 2018, director: 'Bob Persichetti, Peter Ramsey, Rodney Rothman', genre: 'Animation', review: 'Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.'},
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