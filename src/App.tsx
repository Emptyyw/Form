import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ActionToggle } from './components/shared/ActionToggle/ActionToggle';
import Profile from './components/Profile';
import { Provider } from 'react-redux';
import store from './redux/store';
import { type FormState } from './redux/slices/FormSlice';
import Form from './components/Form';

function App() {
  const handleFormSubmit = (formData: FormState) => {
    console.log('Form submitted with data:', formData);
  };

  return (
    <Provider store={store}>
      <Router>
        <ActionToggle />
        <Routes>
          <Route path='/form' element={<Form onFormSubmit={handleFormSubmit} />} />
          <Route path='/' element={<Profile />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
