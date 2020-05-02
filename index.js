import React, {useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import allActions from './actions'
import { render } from 'react-dom';
import './style.css';

import {createStore} from 'redux'
import rootReducer from './reducers'
import {Provider} from 'react-redux'

import Button from '@tds/core-button'
import FlexGrid from '@tds/core-flex-grid'
import Paragraph from '@tds/core-paragraph'
import Heading from '@tds/core-heading'
import Input from '@tds/core-input'
import Box from '@tds/core-box'


const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
)

const App = () => {
  const counter = useSelector(state => state.counter)
  const currentUser = useSelector(state => state.currentUser)

  const dispatch = useDispatch()

  const [user,setUser]=useState({
    name:'Default'
  })

  // useEffect(() => {
  //   dispatch(allActions.userActions.setUser(user))
  // }, [])

  const changeHandler =(e)=>{
    setUser({
      name:e.target.value
    })
  }

  return (
    <div className="App">
      <FlexGrid>
        <FlexGrid.Row>
        <FlexGrid.Col>
           {
            currentUser.loggedIn ? 
            <>
              <Heading level='h2'>Hello, {currentUser.user.name}</Heading>
              <Button onClick={() => dispatch(allActions.userActions.logOut())}>Logout</Button>
            </> 
            : 
            <>
              <Heading level='h2'>Login</Heading>
              <Input label='Name' type='text' onChange={(e)=>changeHandler(e)}/>
              <br/>
              <Button onClick={() => dispatch(allActions.userActions.setUser(user))}>Login</Button>
            </>
            }
        </FlexGrid.Col>
        </FlexGrid.Row>
        <FlexGrid.Row>
          <FlexGrid.Col xs={4} sm={4} md={4} lg={4} xl={4}>
          <Paragraph align='center'>
          <Box vertical={2}>
            <Button onClick={() => dispatch(allActions.counterActions.decrement())}>-</Button>
          </Box>
          </Paragraph>
          </FlexGrid.Col>
          <FlexGrid.Col  xs={4} sm={4} md={4} lg={4} xl={4}>
          <Box vertical={2}>
            <Paragraph align='center'>
              Counter: {counter}
            </Paragraph>
          </Box>
          </FlexGrid.Col>
          <FlexGrid.Col  xs={4} sm={4} md={4} lg={4} xl={4}>
          <Paragraph align='center'>
          <Box vertical={2}>
            <Button onClick={() => dispatch(allActions.counterActions.increment())}>+</Button>
          </Box>
          </Paragraph>
          </FlexGrid.Col>
        </FlexGrid.Row>


        <FlexGrid.Row>
          <FlexGrid.Col xs={2} sm={2} md={4} lg={4} xl={4}>
  
          </FlexGrid.Col>
          <FlexGrid.Col  xs={8} sm={8} md={4} lg={4} xl={4}>
          <Box vertical={2}>
            <Paragraph align='center'>
              <Button onClick={() => dispatch(allActions.counterActions.reset())}>Reset</Button>
            </Paragraph>
          </Box>
          </FlexGrid.Col>
          <FlexGrid.Col  xs={2} sm={2} md={4} lg={4} xl={4}>
        
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
       
    </div>
  );
}

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
