import React from 'react'
import { Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Header, Container, Segment, Icon, List } from 'semantic-ui-react'

const OrdersWindow = ({ orders }) => {
  return( 
    <Container id='orders-window'>
      <Header as='h2' >Your Orders</Header>
      <List selection verticalAlign="middle">
        { orders.map(order => {
            return(
              <List.Item key={order.id} as='a'>
                <Icon name='angle double right' />
                <List.Content >
                  <List.Header >{order.created_at}</List.Header>
                </List.Content>
              </List.Item>
            )
          })
        }
      </List>
    </Container>
  )
}

export default OrdersWindow
