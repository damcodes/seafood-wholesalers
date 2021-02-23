import { useState, useEffect } from 'react' 
import { Button, Checkbox, Icon, Table, Container, Input, Tab, Label } from 'semantic-ui-react'
import LineItem from '../components/LineItem'

const NewOrder = () => {

  const [ items, setItems ] = useState([])
  const [ target, setTarget ] = useState(null)
  const [ cart, setCart ] = useState([])
  const [ totalCost, setTotalCost ] = useState(0)

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

  useEffect(() => {
    if (cart.length > 0) { 
      const total = cart.map( line => line.cost).reduce( (num1, num2) => num1 + num2)
      setTotalCost(total)
    } else {
      setTotalCost(0)
    }
  }, [cart])

  const countDecimals = (val) => {
    if( Math.floor(val) === val ) return 0
    return val.toString().split(".")[1].length || 0
  }

  const pricifyAndStringify = (num) => {
    const numString = num.toString()
    if (Number.isInteger(num)) return `$${num}.00`
    if (countDecimals(num) === 1) return `$${num}0`
    if (countDecimals(num) > 2) return `$${numString.slice(0, numString.indexOf('.') + 3)}`
    return `$${num}`
  }

  const isNum = (str) => {
    return /^\d+$/.test(str)
  }

  const submitOrder = e => {
    console.log('submitting')
    console.log(e.target)
  }

  return( 
    <Container>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell id='new-order-price-header'>$/lb.</Table.HeaderCell>
            <Table.HeaderCell id='new-order-weight-header'>Available Weight</Table.HeaderCell>
            <Table.HeaderCell id='weight-ordered-header'>Order Weight</Table.HeaderCell>
            <Table.HeaderCell id='line-total-header'>Cost</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { items.filter(item => item.avail_weight > 0 && item.active).map(item => {
              return(
                <LineItem 
                  key={item.id} 
                  id={item.item_number}
                  item={item} 
                  prevTarget={target}
                  totalCost={totalCost}
                  setTotalCost={setTotalCost}
                  setCart={setCart}
                  cart={cart}
                  setTargetAndTotalCost={(newTarget, cost) => {
                    if (newTarget.value.length > 1) {
                      setTotalCost(0)
                    }
                    if (cost === 0) {
                      setTotalCost(0)
                    }
                    if (isNum(newTarget.value)) {
                      setTotalCost(cost)
                    }
                    if (newTarget !== target && isNum(newTarget.value)) {
                      setTotalCost(totalCost + cost) 
                    }
                    return setTarget(newTarget)
                  }}
                />
              )
            }
          )}
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row >
            <Table.HeaderCell 
              colSpan='7'
              id='total-price-footer'
            >
              <Label as='a' tag>
                {`Order Total: ${pricifyAndStringify(totalCost)}`}
              </Label>
            </Table.HeaderCell>
          </Table.Row>

          <Table.Row>
            <Table.HeaderCell 
              colSpan='7'
              id='submit-order-footer'
            >
              <Button 
                id='submit-order-btn'
                size='small'
                positive={true}
                onClick={submitOrder}
              >
                <Icon name='paper plane' />Submit
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      
    </Container>
  )
}

export default NewOrder