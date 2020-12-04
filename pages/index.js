import React from 'react'
import NextLink from 'next/link'
import { Container, Flex } from '../lib'

export default function HomePage() {
  return (
    <Container>
      <Flex direction="column">
        <NextLink href="/">Home</NextLink>
        <NextLink href="/test1">Tests 1</NextLink>
        <NextLink href="/test2">Tests 2</NextLink>
        <NextLink href="/images">Images</NextLink>
      </Flex>
    </Container>
  )
}
