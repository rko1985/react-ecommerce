import { Routes, Route, Outlet } from 'react-router-dom';

import Home from './routes/home/home.component';

const Navigation = () => {
  return(
    <div>
      <h1>I am the navigation bar</h1>
      <Outlet/>
    </div>
  );
}

const Shop = () => {

  return (
    <div>
      <h1>I am the shop page</h1>
    </div>
    
  );
}

const App = () =>{
  
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>} />
        <Route path='shop' element={<Shop/>} /> 
      </Route>
    </Routes>
  );

}

export default App;
