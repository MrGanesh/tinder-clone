
import './App.css';
import Header from './Header'
import TinderCards from './TinderCards'
import SwipeButtons from './SwipeButtons'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Chats from './Chats'
import ChatScreen from './ChatScreen'
import LandingPage from './LandingPage';
import UserDetails from './UserDetails'
import { useDataLayerValue } from './DataLayer'

function App() {
  const [{ user, messages }, dispatch] = useDataLayerValue();

  console.log(user);
  return (
    <>
      { user === null ? (
        <div className="App">
          <Router>

            {/* <Header /> */}
            <Switch>

              <Route path="/">
                <LandingPage />
              </Route>
            </Switch>
          </Router>
        </div>

      ) :

        (<div className="App">
          <Router>

            {/* <Header /> */}
            <Switch>


              <Route path="/user">
                <Header backButtonUser="/chat" />
                <UserDetails />
              </Route>

              <Route path="/chat/:person">
                <Header backButton="/chat" />
                <ChatScreen />
              </Route>

              <Route path="/chats/:person">
                <Header backButton="/" />
                <Chats />
              </Route>


              <Route path="/">
                <Header />
                <TinderCards />
                <SwipeButtons />
              </Route>

            </Switch>
          </Router>
        </div>)}
    </>
  );
}

export default App;
