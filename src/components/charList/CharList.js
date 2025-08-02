import React, { Component } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharCard extends Component {
  render() {
    const { thumbnail, name } = this.props;
    return (
      <li className="char__item">
        <img src={thumbnail} alt={name} />
        <div className="char__name">{name}</div>
      </li>
    );
  }
}

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.loadCharacters();
  }

  getRandomId = () => Math.floor(Math.random() * 20) + 1;

  loadCharacters = async () => {
    const requests = Array.from({ length: 9 }, () =>
      this.marvelService.getCharacter(this.getRandomId())
    );

    try {
      const chars = await Promise.all(requests);
      this.setState({ chars, loading: false, error: false });
    } catch (e) {
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { chars, loading, error } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    const content = !(loading || error) ? (
      <ul className="char__grid">
        {chars.map((char) => (
          <CharCard key={char.id} name={char.name} thumbnail={char.thumbnail} />
        ))}
      </ul>
    ) : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          onClick={this.loadCharacters}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
