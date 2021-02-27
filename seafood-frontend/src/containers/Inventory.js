import { useState, useEffect } from 'react' 
import { Button, Checkbox, Icon, Table, Container, Input, Tab, Label } from 'semantic-ui-react'
import InventoryLineItem from '../components/InventoryLineItem'

const Inventory = () => {

  const [ items, setItems ] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/products', {
      method: "GET",
      headers: {
        "Content-type":"applicaton/json"
        // "Authorization": localStorage.getItem("auth_key")
      }
    })
    .then( res => res.json() )
    .then( products => setItems(products) )
  }, [])

  const isNum = (str) => {
    return /^\d+$/.test(str)
  }

  const submitOrder = e => {
    console.log('submitting')
    console.log(e.target)
  }

  const newItem = () => {
    fetch(`http://localhost:3001/products`, {
      method: "POST",
      headers: {
        "Content-type":"application/json",
        "Authorization": localStorage.getItem('auth_key')
      },
      body: JSON.stringify({
        product: {
          active: false,
          description: "New Item",
          item_number: "New Item",
          avail_weight: 0, 
          price: 0.0
        }
      })
    })
    .then( res => res.json() )
    .then( item => setItems([...items, item]))
  }

  const deleteItem = (item) => {
    fetch(`http://localhost:3001/products/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-type":"application/json",
        "Authorization": localStorage.getItem('auth_key')
      }
    })
    .then( res => res.json() )
    .then( item => {
      const newItems = items.filter( current => current.id !== item.id )
      setItems(newItems)
    })
  }

  return( 
    <Container>
      <Table striped celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Active?</Table.HeaderCell>
            <Table.HeaderCell>Item Number</Table.HeaderCell>
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell id='inventory-price-header'>$/lb.</Table.HeaderCell>
            <Table.HeaderCell id='new-order-weight-header'>Available Weight</Table.HeaderCell>
            <Table.HeaderCell id='changed-weight-header'>Weight Change</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { items.sort( (a, b) => b.avail_weight - a.avail_weight ).map(item => {
              return(
                <InventoryLineItem 
                  key={item.id} 
                  item={item}
                  deleteItem={deleteItem}
                />
              )
            }
          )}
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row >
          </Table.Row>

          <Table.Row>
            <Table.HeaderCell 
              colSpan='6'
              id='submit-order-footer'
            >
              <Button 
                floated='left'
                id='submit-order-btn'
                size='small'
                positive={true}
                onClick={newItem}
              >
                <Icon name='plus' />Add Item
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      
    </Container>
  )
}

export default Inventory