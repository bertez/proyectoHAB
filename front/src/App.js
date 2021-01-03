
import { Router, Switch } from 'react-router-dom';

import './App.css';
import Header from './Header';
import CreateExperience from './routes/CreateExperience'
import Experiencias from './routes/Experiencias';



function App() {
  return (
    <div className="App">
      <div>
        <Header />
       

        <Experiencias />
        <CreateExperience />

      </div>


    </div>

  );
}

export default App;
