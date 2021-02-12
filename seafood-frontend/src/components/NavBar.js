import React, { useState } from 'react'
import { input, Menu } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'

const NavBar = () => {
  const [ activeItem, setActiveItem ] = useState(null)

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }

  const isLoggedIn = () => {
    const authToken = localStorage.getItem('auth_key')
    return authToken === null ? false : true
  }
  
  return (
    <Menu pointing widths={10}>
      <Menu.Item
        as={NavLink} to='/home'
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
      />

      <Menu.Item
        as={NavLink} to='/about'
        name='about'
        active={activeItem === 'about'}
        onClick={handleItemClick}
      />

      {isLoggedIn ? <Menu.Item 
          name='profile'
          as={NavLink} to='/profile'
          active={activeItem === 'profile'}
          onClick={handleItemClick}/> : null }

      {isLoggedIn ? <Menu.Item
        name='new order'
        as={NavLink} to='/newOrder'
        active={activeItem === 'new order'}
        onClick={handleItemClick}/> : null }

      <Menu.Item
        name={isLoggedIn ? 'logout' : 'login'}
        as={NavLink} to={ isLoggedIn ? '/logout' : '/login' }
        active={activeItem === 'login'}
        onClick={handleItemClick}
      />
    </Menu>
  )
}

export default NavBar