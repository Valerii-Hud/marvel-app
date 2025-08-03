class MarvelService {
  _apiBase = 'https://marvel-server-zeta.vercel.app/';
  _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
  _baseOffset = 0;

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };
  getAllCharacters = async (offset = this._baseOffset) => {
    const url = `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`;
    const res = await this.getResource(url);
    return res.data.results.map(this._transofrmCharacter);
  };
  getCharacter = async (id) => {
    const url = `${this._apiBase}characters/${id}?${this._apiKey}`;
    const res = await this.getResource(url);
    return this._transofrmCharacter(res.data.results[0]);
  };
  _transofrmCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
}

export default MarvelService;
