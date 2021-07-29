import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './pages/About';
import ArticalsList from './pages/ArticalsList';
import Article from './pages/Article';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='max-w-screen-md mx-auto pt-10'>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/article-list'>
            <ArticalsList />
          </Route>
          <Route exact path='/article/:name' component={Article} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
