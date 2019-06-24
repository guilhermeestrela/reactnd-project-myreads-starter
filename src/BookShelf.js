import React from 'react';
import Book from './Book';

export default class BookShelf extends React.Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelf}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) => <Book book={book} key={book.id} update={this.props.update}/>)}
                    </ol>
                </div>
            </div>
        )
    }
}
