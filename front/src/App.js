
import { Router, Switch } from 'react-router-dom';
import Acordeon from './Acordeon';
import './App.css';
import Header from './Header';
import CreateExperience from './routes/CreateExperience'
import Experiencias from './routes/Experiencias';
import Auth from './user/Auth';


function App() {
  return (
    <div className="App">
      <div>
        <Header />

        <Auth />

        <Experiencias/>
        <CreateExperience/>

      </div>


    </div>

  );
}

export default App;
