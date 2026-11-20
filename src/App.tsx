import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Privacy from './pages/Privacy';
import Consent from './pages/Consent';
import NotFound from './pages/NotFound';
import PageMeta from './components/PageMeta';

export function SiteRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return <Router><PageMeta /><SiteRoutes /></Router>;
}
export default App;
