import React, { Component } from 'react';

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchField: {
                value: '',
                error: false,
            }
        }
    }

    changeHandler = ({ target: { value } }) => {
        this.setState({
            searchField: {
                value,
                error: false
            }
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.search(this.state.searchField.value)
    }

    render() {
        return (
            <>
                <form onSubmit={this.submitHandler}>
                    <input type="text" value={this.state.searchField.value} onChange={this.changeHandler} />
                    <input type="submit" value="Recherche dans les gifs Tenor" />
                </form>
            </>
        )
    }
}