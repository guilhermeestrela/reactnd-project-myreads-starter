import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Search from './Search';
import BookList from './BookList';
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <BookList />
        )}/>
        <Route path="/search" render={() => (
            <Search />
        )}/>
      </div>
    )
  }
}

export default BooksApp
