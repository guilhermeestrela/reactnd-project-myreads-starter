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
    BooksAPI.getAll().then((books) => this.setState({books}));
  }

  updateBook = (book) => {
    BooksAPI.update(book, book.shelf).then(() => this.getBooks());
  }

  searchBooks = (query) => {
    if (query) {
      BooksAPI.search(query)
          .then((searchedBooks) => {
              if (searchedBooks.length > 0 && !searchedBooks.error) {
                  searchedBooks.map((searchedBook) => {
                     this.state.books.filter((book) => {
                         searchedBook.shelf = 'none';
                         if (book.id === searchedBook.id) {
                             return searchedBook.shelf = book.shelf;
                         }
                     });
                  });
              } else {
                  searchedBooks = []
              }

              this.setState({books: searchedBooks})
          })
          .catch((e) => console.error('Error searching books', e));
    }
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
                    shelf={'Currently Reading'}
                    update={this.updateBook}
                />
                <BookShelf
                    books={this.state.books.filter((book) => book.shelf === 'wantToRead')}
                    shelf={'Want to Read'}
                    update={this.updateBook}
                />
                <BookShelf
                    books={this.state.books.filter((book) => book.shelf === 'read')}
                    shelf={'Read'}
                    update={this.updateBook}
                />
              </div>
              <div className="open-search">
                <Link to="/search" className="add-book">Add a book</Link>
              </div>
            </div>
        )}/>
        <Route path="/search" render={() => (
            <Search
                books={this.state.books}
                search={this.searchBooks}
                update={this.updateBook}
            />
        )}/>
      </div>
    )
  }
}
