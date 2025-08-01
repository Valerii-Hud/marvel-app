import { createRoot } from 'react-dom/client';
import App from './components/app/App';
import MarvelService from './services/MarvelService';
import './style/style.scss';

const marvelService = new MarvelService();

marvelService.getAllCharacters().then((res) =>
  res.data.results.forEach((item) => {
    console.log(item.name);
  })
);

marvelService.getCharacter(5).then((res) => console.log(res));

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
