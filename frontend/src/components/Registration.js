import React, { useState } from 'react'
import registrationService from '../services/registration'
import { Button, Form, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'
import '../stylesheets/general.css'
import parameter from '../utils/parameter'


const Registration = (props) => {



  const [ newname, setNewname ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ newpwd1, setNewpwd1 ] = useState('')
  const [ newpwd2, setNewpwd2 ] = useState('')
  const [ name, setName ] = useState('')
  const [registered, setRegistered] = useState(false)
  const [registering, setRegistering] = useState(false)

  const handleRegistration =  async (event) => {
    event.preventDefault()
    try{
      if(newpwd1 === newpwd2){
        setRegistering(true)
        await registrationService.register({ username: newname, password: newpwd1, name: name, email: email })
        props.handleNotification('Registration successfull', parameter.notificationTime)
        setRegistered(true)
        setNewname('')
        setEmail('')
        setNewpwd1('')
        setNewpwd2('')
        setName('')
      }else{
        props.handleError('Passwords do not match', parameter.errorTime)
      }
    }catch(error){
      if(error.response){
        props.handleError(error.response.data, parameter.errorTime)
      }
      else if(error.request){
        props.handleError(error.request.data, v)
      }else{
        props.handleError(error.message, parameter.errorTime)
      }
      console.error(error)
    }
  }


  if(registered){
    return(
      <div>
        <br></br>
        Registration email has been sent out. Please follow the link in the email to activate your account. 
      </div>
    )
  }else{

  
    return(

      <div>
            <Form onSubmit={handleRegistration}>
              <table className='table .table-striped' width="10">
                  <thead className='thead-dark'>

                  </thead>
                  <tbody width="10">
                      <tr>
                          <td width="10">
                              Name:
                          </td>

                          <td>
                            <input autoComplete='off' type='text' onChange={({ target }) => setName(target.value)}/>
                          </td>
                      </tr>
                      <tr>
                          <td width="10">
                              Username:
                          </td>

                          <td>
                            <input autoComplete='off' required type='text' onChange={({ target }) => setNewname(target.value)}/>
                          </td>
                      </tr>
                      <tr>
                          <td width="10">
                              E-Mail:
                          </td>

                          <td>
                            <input autoComplete='off' required type='email' onChange={({ target }) => setEmail(target.value)}/>
                          </td>
                      </tr>
                      <tr>
                          <td width="10">
                              Password:
                          </td>

                          <td>
                            <input autoComplete='off' type='password' required onChange={({ target }) => setNewpwd1(target.value)} />
                          </td>
                      </tr>
                      <tr>
                          <td width="10">
                              Repeat Password:
                          </td>

                          <td>
                            <input autoComplete='off' type='password' required onChange={({ target }) => setNewpwd2(target.value)} />
                          </td>
                      </tr>
                  </tbody>
              </table>
              <div style={{display: registering === false ? '' : 'none'}}><Button className='button' type="submit">Register</Button></div>
              <div style={{display: registering === true ? '' : 'none'}}><Button className='button' type="submit">  <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                /> Registering...</Button>
              </div>
            </Form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  handleNotification,
  handleError
}

export default connect(null, mapDispatchToProps)(Registration)
