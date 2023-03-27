import './App.css'
import Detail from './components/Detail/Detail'
import Form from './components/Form/Form'
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import { Routes, Route, useLocation } from 'react-router-dom';
import Favorites from './components/Favorites/Favorites'


function App () {
  const { pathname } = useLocation();


  if(pathname !== '/'){
      return(
      <div className='App'>
        <Routes>
          <Route exact path={'/home'} element={<Home/>}/>
          <Route path={'/detail/:id'} element={<Detail />}/>
          <Route path={'/favorites'} element={<Favorites/>}/>
          <Route path={'/form'} element={<Form/>}/>
        </Routes>
      </div>
    );
  }else{
    return(
      <div className='App'>
        <Routes>
          <Route exact path={'/'} element={<Landing/>}></Route>
          <Route path={'/home'} element={<Home/>}/>
        </Routes>
      </div>
    );
  }   
  
}

export default App;
