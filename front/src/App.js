
import './App.css';
import Header from './Header';
import Menu from './Menu';
import Experiencias from './Experiencias';

function App() {
  return (
    <div className="App">
      <div>
        
      <Header />
      </div>
      <div className="contenido">
      <aside className="aside">
        <Menu/>
      </aside>
      <main className="main">
        <Experiencias />
        <Experiencias />
        <Experiencias />
        <Experiencias />
      </main>
      </div>
      
    </div>

  );
}

export default App;
