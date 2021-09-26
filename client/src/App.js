import './App.css';
import GiveawayList from './components/GiveawayList/GiveawayList';
import Giveaway from './components/Giveaway/Giveaway';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <h1>
          <Link to='/'>Acme Giveaways</Link>
        </h1>

        <Switch>
          <Route exact path='/'>
            <GiveawayList />
          </Route>
          <Route path='/giveaway/:id'>
            <Giveaway />
          </Route>
        </Switch>

        <div className='spring' />
        <footer>
          <p>Copypasta</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
