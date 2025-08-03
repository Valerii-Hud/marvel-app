import { Component } from 'react';
import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };
  marvelService = new MarvelService();
  componentDidMount() {
    this.updateChar();
  }
  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) this.updateChar();
  }

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };
  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) return;
    this.onCharLoading();
    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };
  render() {
    const { char, loading, error } = this.state,
      skeleton = !char && !loading && !error ? <Skeleton /> : null,
      errorMessage = error ? <ErrorMessage /> : null,
      spinner = loading ? <Spinner /> : null,
      content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length === 0 ? (
          <li>Comics not available.</li>
        ) : (
          comics.slice(0, 9).map((item, index) => (
            <li
              key={`${item.resourceURI}-${index}`}
              className="char__comics-item"
            >
              {item}
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default CharInfo;
