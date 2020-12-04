import React from 'react'
import {
  Container,
  Box,
  Image,
  Img,
  NoImage,
  Stack,
  Card,
  CardContent,
  CardImage,
  CardExtra,
  Button,
  ButtonGroup,
} from '../lib'

export default function Images() {
  return (
    <Container>
      {/* <Image
        src="https://images.unsplash.com/photo-1597286039335-b0d08ca3fd56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9"
        loading="lazy"
        boxSize="400px"
        fit="cover"
        align="center"
        fallbackSrc="https://images.unsplash.com/photo-1597085551304-403d03a61e72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
      />

      <Image
        boxSize="300px"
        htmlWidth="200px"
        htmlHeight="200px"
        objectFit="cover"
        // src="https://bit.ly/dan-abramov"
        fallbackSrc="https://images.unsplash.com/photo-1597085551304-403d03a61e72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
        alt="Dan Abramov"
        mt="8"
        // loading="lazy"
      /> */}

      <Image
        src="https://images.unsplash.com/photo-1599328893291-04090faa22be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"
        // htmlWidth="200px"
        // htmlHeight="100px"
        mt="8"
      />

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum, dignissimos a,
        consectetur est odio iure explicabo accusamus aut placeat praesentium illo tenetur delectus
        optio recusandae quaerat. Enim perspiciatis recusandae qui!
      </p>
    </Container>
  )
}
