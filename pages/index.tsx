import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

const Title = styled.h1`
  color: blue;
  font-size: 50px;
`

const Home: React.FC = () => {
  return (
    <>
      <Title>My page</Title>
      <Button variant="contained" disableElevation color="primary">
        TEST
      </Button>
    </>
  )
}

export default Home
