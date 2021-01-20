
import { Route, Switch } from 'react-router-dom';


import './App.css';
import Header from './Header';
import CreateExperience from './routes/CreateExperience'
import Experiencia from './routes/Experiencia';
import Experiencias from './routes/Experiencias';
import Buscar from './routes/Buscar';
import Register from './user/Register';
import Login from './user/Login';
import Footer from './Footer';
import BuscarTipo from'./routes/BuscarTipo';
import UserExperience from './routes/UserExperience'




function App() {
  return (
    <div className="App">
      <div>
        <Header/>
        
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/experience/new'>
            <CreateExperience/> 
          </Route>
          <Route path='/experience/:id'>
            <Experiencia />
          </Route>
          <Route path='/location/:id?'>
            <Buscar/>
          </Route>
          <Route path='/tipo/:id?'>
            <BuscarTipo/>
          </Route>
            <Route path='/experiencebyuser/'>
            <UserExperience/>
          </Route>  
          <Route path='/' exact>
            <Experiencias />
          </Route>

        </Switch>
        <Footer/>
      </div>
    </div>

  );
}

export default App;
