import { Table, Input, Checkbox } from 'semantic-ui-react'
import { useState, useEffect } from 'react'

const LineItem = ({ setTotalCost, item, prevTarget, totalCost, setTargetAndTotalCost }) => {

  const [ availWeight, setAvailWeight ] = useState(item.avail_weight)
  const [ orderedWeight, setOrderedWeight ] = useState(0)
  const [ cost, setCost ] = useState(0)
  const [ checked, setCheck ] = useState(false)


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

  useEffect(() => {
    setAvailWeight(item.avail_weight - orderedWeight)
    setCost(orderedWeight * item.price)
  }, [ item.price, orderedWeight ])

  useEffect(() => {
    // debugger
    setTargetAndTotalCost(document.getElementById(`${item.id}-weight`), cost)
  }, [cost])
  
  const isNum = (str) => {
    return /^\d+$/.test(str)
  }

  return(
    <Table.Row onChange={() => console.log('hi')} >
      <Table.Cell collapsing>
        <Checkbox 
          toggle={true}
          checked={checked} 
          onClick={() => {
            if (!checked) {
              setCost(0)
            }
            return setCheck(!checked)
          }} 
        />
      </Table.Cell>
      <Table.Cell>{item.description}</Table.Cell>
      <Table.Cell id='new-order-price'>{pricifyAndStringify(item.price)}</Table.Cell>
      <Table.Cell id='new-order-weight'>{availWeight}</Table.Cell>
      <Table.Cell id='weight-ordered'>
        <Input
          positive
          disabled={checked ? false : true}
          onChange={ e => {
                      // const newWeight = isNum(e.target.value) ? Number(e.target.value) : null
                      // debugger
                      // console.log(cost)
                      if (e.key === "Backspace" && e.target.value === '') {
                        setOrderedWeight(0)
                      } 
                      if (e.target.value.length > 1) {
                        setTargetAndTotalCost(e.target, 0)
                      }
                      if (e.target !== prevTarget && isNum(e.target.value)) {
                        setCost(cost + Number(e.target.value))
                        setTargetAndTotalCost(e.target, cost)
                      }
                      return setOrderedWeight(Number(e.target.value))
                    }}
          label={{ basic: true, content: 'lbs' }}
          labelPosition='right'
          id={`${item.id}-weight`}
        />
      </Table.Cell>
      <Table.Cell className='line-item-total'>
        { pricifyAndStringify(cost) }
      </Table.Cell>
    </Table.Row>
  )

}

export default LineItem