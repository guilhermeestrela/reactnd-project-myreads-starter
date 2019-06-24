import React from 'react';
import { Link } from 'react-router-dom'
import Book from "./Book";

export default class Search extends React.Component {
    handleChange = (event) => {
        this.props.search(event.target.value);
    };

    render() {
        return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={this.handleChange}/>
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {this.props.books.length > 0 ? (
                        this.props.books.map((book) => <Book book={book} key={book.id} update={this.props.update}/>)
                    ) : 'Not found results! :('}
                </ol>
            </div>
        </div> )
    }
}
