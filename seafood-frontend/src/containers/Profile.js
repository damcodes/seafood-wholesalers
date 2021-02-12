import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Grid, Segment } from 'semantic-ui-react'
import OrdersWindow from '../components/OrdersWindow'

function Profile({ user }) {

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

        <Grid.Row id='orders-row'>
          <Segment>
            <OrdersWindow orders={orders} />
          </Segment>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default Profile