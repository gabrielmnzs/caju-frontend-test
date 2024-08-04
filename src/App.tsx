import Router from '~/router';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import AppProvider from './hooks';

function App() {
  return (
    <AppProvider>
      <Header />
      <Router />
      <Toast />
    </AppProvider>
  );
}

export default App;
