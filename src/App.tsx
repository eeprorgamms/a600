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
import {site} from './config/site';

const legalPagesReady = site.leads.enabled && site.leads.endpoint.startsWith('https://') && Boolean(site.legal.operatorName && site.legal.contactEmail && site.legal.retentionDescription);

export function SiteRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/privacy" element={legalPagesReady ? <Privacy /> : <NotFound />} />
        <Route path="/consent" element={legalPagesReady ? <Consent /> : <NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return <Router><PageMeta /><SiteRoutes /></Router>;
}
export default App;
