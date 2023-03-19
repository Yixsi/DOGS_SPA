//import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/Navbar/Navbar'
import Detail from './components/Detail/Detail'
import Form from './components/Form/Form'
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import { Routes, Route, useLocation } from 'react-router-dom'
//import Favorites from './components/Favorites'


function App () {
  // let [characters, setCharacters] = useState([]);
  const { pathname } = useLocation();

  
  // const onSearch = (character)=>{
  //   fetch()
  //     .then(response => response.json())
  //     .then(data => {
  //        if (data.name) {
  //           setCharacters((oldChars) => [...oldChars, data]);
  //        } else {
  //           window.alert('No hay personajes con ese ID');
  //        }
  //     });
  // }

  if(pathname !== '/'){
      return(
      <div className='App'>
        <NavBar/>
        <Routes>
          <Route exact path={'/home'} element={<Home/>}/>
          <Route path={'/detail/:id'} element={<Detail />}/>
          {/* <Route path={'/favorites'} element={<Favorites/>}/> */}
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
