
import { Route, Switch } from 'react-router-dom';


import './App.css';
import Header from './Header';
//import Experiencias from './routes/Experiencias';
//import Header from './Header';
import CreateExperience from './routes/CreateExperience'
import Menu from './Menu';
//import Experiencias from './routes/Experiencias';
//import Register from './user/Register';
//import Login from './user/Login';
//import Experiencias from './routes/Experiencias';
//import Auth from './user/Auth';



function App() {
  return (
    <div className="App">
      <div>
        <Header/>
         <CreateExperience/> 
        <Switch>
          <Route path='/'>
        <Menu/>
          </Route>
        </Switch>
        
        

      </div>


    </div>

  );
}

export default App;
