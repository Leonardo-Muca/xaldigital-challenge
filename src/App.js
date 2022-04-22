import logo from './logo.svg';
import './App.css';
import { Header } from './components/header/Header';
import { Body } from './components/body/Body';
import { Footer } from './components/footer/Footer';

export const App = () => {
  return (
    <div className=''>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
