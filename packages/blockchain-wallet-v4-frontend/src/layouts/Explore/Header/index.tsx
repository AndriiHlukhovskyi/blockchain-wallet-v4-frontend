import React from 'react'
import { FormattedMessage } from 'react-intl'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink } from 'react-router-dom'

import { Button, Image } from 'blockchain-info-components'
import { Logo, NavContainer, NavLeft, NavRight } from 'components/NavbarV2/Navbar'

const ExploreHeader: React.FC<Props> = () => {
  return (
    <NavContainer>
      <NavLeft>
        <Logo>
          <NavLink to='/home' data-e2e='homeLink'>
            <Image width='25px' name='blockchain-icon' />
          </NavLink>
        </Logo>
      </NavLeft>
      <NavRight>
        <LinkContainer style={{ marginRight: '8px' }} to='/login' data-e2e='loginLink'>
          <Button small data-e2e='signup' nature='empty-blue'>
            <FormattedMessage id='scenes.login.login' defaultMessage='Login' />
          </Button>
        </LinkContainer>
        <LinkContainer to='/signup' data-e2e='signupLink'>
          <Button small data-e2e='signup' nature='primary'>
            <FormattedMessage id='buttons.signup' defaultMessage='Sign Up' />
          </Button>
        </LinkContainer>
      </NavRight>
    </NavContainer>
  )
}

type Props = {}

export default ExploreHeader
