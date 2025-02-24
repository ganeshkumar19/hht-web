import React from 'react'
import NavbarComponent from '../containers/NavbarComponent'
import Footer from '../containers/Footer'

const PageWithNavbarFooter = ({ component: Component }) => {
  return (
    <>
        <NavbarComponent />
        <Component />
        <Footer/>
    </>
  )
}

export default PageWithNavbarFooter