import {renderToString} from 'react-dom/server';
import {MemoryRouter} from 'react-router-dom';
import {SiteRoutes} from './App';
export const render = (path: string) => renderToString(<MemoryRouter initialEntries={[path]}><SiteRoutes /></MemoryRouter>);
