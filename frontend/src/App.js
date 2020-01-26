import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { setUser, removeUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'
import { handleNotification } from './reducers/notificationReducer'
import { getFiles } from './reducers/filesReducer'
import Login from './components/Login'
import Registration from './components/Registration'
import Notification from './components/Notificiation'
import Home from './components/Home'
import Upload from './components/Upload'
import Error from './components/Error'
import { Button } from 'react-bootstrap'
import AllFiles from './components/AllFiles'
import Profile from './components/Profile'
import Admin from './components/Admin'
import Footer from './components/Footer'
import './stylesheets/general.css'
const App = ( props ) => {
  //window.localStorage.removeItem('loggedappUser')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedappUser')
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      props.setUser(newUser)
        if(newUser.role === 'admin'){
          props.getUsers(newUser)
        }
    }
// eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [])



  
  if (props.user === null){
    return (
      <div className='bg'>
      <Error />
      <Notification />
      <div className='container3'>
      <div className='row'>
      <div className='col-md-15'>
        <Router>
        <a className='header'>SecureBox</a>
          <br></br>
          <Link className='link' to='/'>Login</Link>
          <Link className='link' to='/registration'>Registration</Link>  
          <br></br>
          <Route exact path='/' render={() => <Login/> } />
          <Route exact path='/registration' render={() => <Registration /> } />
        </Router>
      </div>
      </div>
      </div>
      </div>
    )
  }else{
    const priorityStyle = { color: 'white', textDecoration: 'none', padding: 5, display: props.user.role === 'admin' ? '' : 'none' }
    return(
      <div className='bg'>
        <Error />
        <Notification />
        <Router>
        <div className='mainContainer'>
        <div className='container1'>
          <div className='row'>
            <div className='col-md-18'>
                <br></br>
                <a className='header'>SecureBox</a>
                <Link className='link' to='/'>Home</Link>
                <Link className='link' to='/upload'>Upload</Link>
                <Link className='link' to='/allfiles'>Files</Link>
                <Link className='link' to ='/profile'>Profile</Link>
                <Link className='link' to='/admin'>Admin</Link>
              </div>
            </div>
          </div>
          <br></br>
          <div className='container2'>
            <div className='row'>
              <div className='col-md-15'>
                
                <Route exact path='/' render={() => <Home /> }/>
                <Route exact path='/upload' render={(props) => <Upload {...props}/> } />
                <Route exact path='/allfiles' render={(props) => <AllFiles {...props}/> } />
                <Route exact path='/profile' render={(props) => <Profile {...props}/> } />
                <Route exact path='/admin' render={(props) => <Admin {...props}/> } />
              <br></br>
              <br></br>
              </div>
            </div>

          </div>
          <br></br>
          <Footer />

          </div>

          </Router>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
  }
}

const mapDispatchToProps = {
  setUser,
  getUsers,
  removeUser,
  handleNotification,
  getFiles
}

export default connect(mapStateToProps, mapDispatchToProps)(App)