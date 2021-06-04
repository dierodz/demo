import { Route } from 'react-router';
import './App.css';
import Home from './Home';
import UserDetail from './UserDetail';

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Home} />
      <Route path="/users/:id" exact component={UserDetail} />
    </div>
  );
}

export default App;
