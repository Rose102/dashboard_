/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import { Router,Route,Routes } from '@solidjs/router';

import App from './app';
import Login from './pages/login';
import Register from './pages/register';
import Aggrid from './agGrid/agGrid';
import Amchart from './amchart/chart';
import Chart2 from './amchart/piechartgolongandarah';
import Navbar from './agGrid/navbar';
import Maps from './agGrid/maps';




const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
    <Router>
      <Routes>

        <Route path='/' component={Login}/>
        <Route path='Register'component={Register}/>
        <Route path='/Aggrid'component={Aggrid}/>
        <Route path='/Amchart'component={Amchart}/>
        <Route path='/Pie'component={Chart2}/>
        <Route path='/navbar'component={Navbar}/>
        <Route path='/maps'component={Maps}/>
       
      </Routes>
    </Router>
  ),
  root,
);
