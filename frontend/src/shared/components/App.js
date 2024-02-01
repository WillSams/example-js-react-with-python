import React from 'react';
import { Provider } from 'react-redux';
import { NavLink, BrowserRouter as Router, Route, Routes, } from 'react-router-dom';

import { configureStore, history } from '../../configureStore';

import { InvalidRoute } from './';

import { default as Components } from '../../components';

const App = () => {
  return (
    <Provider store={configureStore()}>
      <Router history={history}>
        <nav className='navbar navbar-dark fixed-top bg-dark navbar-expand-md navbar-expand-lg navbar-expand-xl'>
          <div className='container'>
            <div className='row mx-auto'>
              <div className='col-md-2'>
                <NavLink className='navbar-brand site' to='/'>ACME Hotels</NavLink>
                <button className='navbar-toggler navbar-toggler-right'
                  type='button'
                  data-toggle='collapse'
                  data-target='#siteLinks'
                  aria-controls='#siteLinks'
                  aria-expanded='false'
                  aria-label='Toggle navigation'>
                  <span className='navbar-toggler-icon'></span>
                </button>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route exact path='/' element={<Components.HomeComponent />} />
          <Route exact path='/reservations/:id/edit' element={<Components.EditReservationComponent />} />
          <Route exact path='/reservations/:id' element={<Components.ShowReservationComponent />} />
          <Route exact path='/reservations/new' element={<Components.NewReservationComponent />} />
          <Route exact path='/terms' element={<Components.StaticComponent componentType={'terms'} />} />
          <Route exact path='/privacy' element={<Components.StaticComponent componentType={'privacy'} />} />
          <Route path='*' element={<InvalidRoute />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
