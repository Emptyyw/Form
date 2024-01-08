import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ActionToggle } from './components/shared/ActionToggle/ActionToggle';
import Profile from './components/Profile';
import Form, { ProfileFormData } from './components/Form';
import { ProfileProvider } from './context/ProfileContext';
import { Provider } from 'react-redux';
import store from './redux/store';
function App() {
  const handleFormSubmit = (formData: ProfileFormData) => {
    console.log('Form submitted with data:', formData);
  };

  return (
    <Provider store={store}>
      <ProfileProvider>
        <Router>
          <div>
            <ActionToggle />
            <Routes>
              <Route path="/form" element={<Form onFormSubmit={handleFormSubmit} />} />
              <Route path="/" element={<Profile />} />
            </Routes>
          </div>
        </Router>
      </ProfileProvider>
    </Provider>
  );
}

export default App;
