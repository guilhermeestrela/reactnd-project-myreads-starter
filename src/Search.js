import React from 'react';
import { Link } from 'react-router-dom'
import Book from "./Book";

export default class Search extends React.Component {
    state = {
        query: '',
        searchedBooks: []
    };

    handleChange = (event) => {
        this.setState({query: event.target.value});
        if (event.target.value) {
            this.props.search(event.target.value)
                .then((searchedBooks) => {
                    if (searchedBooks.length > 0 && !searchedBooks.error) {
                        searchedBooks.map((searchedBook) => {
                            return this.props.books.filter((book) => book.id === searchedBook.id);
                        })

                        this.setState({searchedBooks});
                    } else {
                        this.setState({searchedBooks: []});
                    }
                });
        }
    };

    render() {
        let searchedBooks = this.state.searchedBooks.length > 0 ? (
            this.state.searchedBooks.map((book) => <Book book={book} key={book.id} update={this.props.update}/>)
        ) : 'Not found results! :(';

        return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={this.handleChange} value={this.state.query}/>
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.query ? searchedBooks : ''}
                </ol>
            </div>
        </div> )
    }
}
