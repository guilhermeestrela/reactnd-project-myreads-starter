import React from 'react';

export default class Book extends React.Component{
    backgroundImage = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : '';

    handleChange = (event) => {
        this.props.update({
            id: this.props.book.id,
            shelf: event.target.value
        })
    }

    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                             style={{
                                 width: 128,
                                 height: 193,
                                 backgroundImage: `url("${this.backgroundImage}")`
                             }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={this.handleChange} defaultValue={this.props.book.shelf ? this.props.book.shelf : 'none'}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.props.book.author}</div>
                </div>
            </li>
        )
    }
}
