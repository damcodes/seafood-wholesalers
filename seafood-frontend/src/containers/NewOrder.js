import { useState, useEffect } from 'react' 
import { Button, Checkbox, Icon, Table, Container, Input, Tab, Label } from 'semantic-ui-react'
import LineItem from '../components/LineItem'

const NewOrder = () => {

  const [ items, setItems ] = useState([])
  // const [ itemCosts, setItemCosts ] = useState([])
  const [ target, setTarget ] = useState(null)
  const [ totalCost, setTotalCost ] = useState(0)
  const [ cart, setCart ] = useState([])

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

  const itemCosts = document.querySelectorAll(".line-item-total")
  let itemTotals = []
  let total

  if (itemCosts.lengh > 0) {
    itemCosts.forEach( item => {
      itemTotals.push(Number(item.textContent.slice(1)))
    })
    total = itemTotals.reduce( (num, current) => {return num + current}) 
    // setTotalCost(total)
  }
  // debugger

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
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { items.filter(item => item.avail_weight > 0 && item.active).map(item => {
              return(
                <LineItem key={item.id} setTotalCost={setTotalCost//cost => {
                            // if (cost === 0) {
                            //   return setTotalCost(0)
                            // }
                            // if (target && isNum(target))
                            //   return setTotalCost(totalCost + cost)
                              }
                          id={item.item_number}
                          item={item} 
                          prevTarget={target}
                          totalCost={totalCost}
                          setTargetAndTotalCost={(newTarget, cost) => {
                            // console.log(cost)
                            // console.log(totalCost)
                            // debugger
                            // console.log(newTarget)
                            if (newTarget.value.length > 1) {
                              setTotalCost(0)
                              // debugger
                            }
                            if (cost === 0) {
                              setTotalCost(0)
                              // debugger
                            }
                            if (isNum(newTarget.value)) {
                              setTotalCost(totalCost + cost)
                              // setCart(newTarget.value)
                              // debugger
                            }
                            return setTarget(newTarget)
                          }
                        }
                      />
              )
            }
          )}
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row >
            <Table.HeaderCell 
              colSpan='6'
              id='total-price-footer'
            >
              <Label as='a' tag>
                {`Order Total: ${totalCost ? pricifyAndStringify(totalCost) : '$0.00'}`}
              </Label>
            </Table.HeaderCell>
          </Table.Row>

          <Table.Row>
            <Table.HeaderCell 
              colSpan='6'
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