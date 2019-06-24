import React from 'react'
import {Link, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Search from './Search';
import BookShelf from './BookShelf';
import './App.css'

export default class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    BooksAPI.getAll().then((books) => {console.log(books); this.setState({books})});
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">

                <BookShelf
                    books={this.state.books.filter((book) => book.shelf === 'currentlyReading')}
                    shelf={'Currently Reading'} />
                <BookShelf
                    books={this.state.books.filter((book) => book.shelf === 'wantToRead')}
                    shelf={'Want to Read'}/>
                <BookShelf
                    books={this.state.books.filter((book) => book.shelf === 'read')}
                    shelf={'Read'}/>
              </div>
              <div className="open-search">
                <Link to="/search" className="add-book">Add a book</Link>
              </div>
            </div>
        )}/>
        <Route path="/search" render={() => (
            <Search />
        )}/>
      </div>
    )
  }
}
