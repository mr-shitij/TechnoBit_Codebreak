import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Signup } from './Signup'
import { Login } from './Login'

import { AdminLogin } from './AdminLogin'

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/admin/login" component={AdminLogin} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  )
}
