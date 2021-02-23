import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Grid, Segment, Card, Feed } from 'semantic-ui-react'
import OrdersWindow from '../components/OrdersWindow'
import DailyOrders from '../components/DailyOrders'

function Profile({ currentUser }) {

  const [ orders, setOrders ] = useState([])

  useEffect(() => {
    const auth = localStorage.getItem("auth_key")
    fetch('http://localhost:3001/current-user', {
      method: "GET", 
      headers: {
        "Content-type":"application/json",
        "Authorization": auth
      }
    })
    .then( res => res.json() )
    .then( user => {
      setOrders(user.orders) 
    })
  }, [])

  const ifAdmin = () => {
    if (currentUser && currentUser.admin ) {
      return(
        // <Grid.Row id='current-orders-row'>
        // <Grid.Column >
              <DailyOrders currentUser={currentUser}/>
        // </Grid.Column>
        // {/* </Grid.Row> */}
      ) 
    }
  }


  return(
    <Container>
      <Grid centered={true}>
        <Grid.Row id='new-order' columns={2}>
          <Grid.Column>
            <Segment>
              Something Here
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment>
              And something here too.
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <OrdersWindow orders={orders} currentUser={currentUser}/>

        {ifAdmin()}
        
      </Grid>
    </Container>
  )
}

export default Profile