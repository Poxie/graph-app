import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Create } from './pages/create/Create';

function App() {
  return (
    <div className="App">
      <Router>
        <Route 
          path="/"
          exact
          component={Home}
        />
        <Route 
          path="/create"
          component={Create}
        />
      </Router>
    </div>
  );
}

export default App;
