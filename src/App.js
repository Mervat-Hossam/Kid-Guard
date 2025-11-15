import './components/Header';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features'
import Work from './components/Work';
import Download from './components/Download';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Hero/>
      <Features/>
      <Work/>
      <Download/>
      <Footer/>
    </div>
  );
}

export default App;
