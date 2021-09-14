import './App.css';
import GiveawayList from './components/GiveawayList/GiveawayList';
import Giveaway from './components/Giveaway/Giveaway';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/grid'>Grid</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/grid'>
          <GiveawayList />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/giveaway/:id'>
          <Giveaway />
        </Route>
      </Switch>

      <div className='App'></div>
    </Router>
  );
}

export default App;
