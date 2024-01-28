import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ActionToggle } from './components/shared/ActionToggle/ActionToggle';
import Profile from './components/Profile';
import { Provider } from 'react-redux';
import store from './redux/store';
import Form from './components/Form';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ActionToggle />
        <Routes>
          <Route path='/form' element={<Form />} />
          <Route path='/' element={<Profile />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
