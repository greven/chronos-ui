import React, { Fragment, useState } from 'react'
import {
  useColorMode,
  useColorModeValue,
  Stack,
  Container,
  Button,
  Input,
  Badge,
  Toolbar,
  Navbar,
  Text,
  IconButton,
  Flex,
  Avatar,
  Status,
  useToast,
} from '../lib'

const passwordRulesInitial = [
  { id: 1, text: 'Minimum 12 characters', valid: false },
  { id: 2, text: 'Maximum 80 characters', valid: false },
  { id: 3, text: 'At least one lower case character', valid: false },
  { id: 4, text: 'At least one upper case character', valid: false },
  { id: 5, text: 'At least one digit or punctuation character', valid: false },
]

export default function Tests2() {
  const { toggleColorMode } = useColorMode()
  const [] = useState(false)

  const [] = useState(passwordRulesInitial)

  const toast = useToast()

  const intents = ['primary', 'secondary', 'light', 'dark', 'info', 'success', 'warning', 'danger']
  const random = () => Math.floor(Math.random() * 8)

  return (
    <Fragment>
      <Navbar position="absolute" bg={useColorModeValue('dark.800', 'dark.600')} color="white">
        <Toolbar justifyContent="space-between">
          <Text as="h1" color="inherit" my="0" fontSize="2xl" fontWeight="normal">
            Ikari
          </Text>
          <Stack direction="row" alignItems="center">
            <IconButton
              onClick={toggleColorMode}
              icon={useColorModeValue('Moon', 'Sun')}
              variant="unstyled"
              color="gray.100"
              size="xl"
            />
            <Badge
              count={7}
              intent={useColorModeValue('info', 'danger')}
              variant="dot"
              overlap="circle"
              anchorVertical="top"
            >
              <Avatar
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                size="sm"
                showBorder
                borderColor="white"
                shadow="md"
              />
            </Badge>
          </Stack>
        </Toolbar>
      </Navbar>

      <Container mt="8">
        <Stack my={8} spacing="4">
          <Stack direction="row" spacing="4">
            <Status />
            <Status color="red.500" />
            <Status color="yellow.400" />
            <Status color="green.500" />
          </Stack>
        </Stack>

        <Button
          onClick={() =>
            toast({
              title: 'Account created.',
              description: "We've created your account for you.",
              intent: intents[random()],
              position: 'bottom',
              duration: 10000,
              isClosable: true,
            })
          }
        >
          Show Toast
        </Button>

        {/* <Tooltip label="Hey, I'm here!" hasArrow>
          <Button mb="8">Hover me</Button>
        </Tooltip> */}

        {/* <Box width="1/2" mt="4">
          <FormControl>
            <FormLabel>Hello</FormLabel>
            <InputGroup inputSize="xs">
              <Input name="standard" placeholder="XS..." variant="standard" />
              <InputRightElement>
                <Icon icon="Check" color="green.500" />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>

        <Box width="1/2" mt="4">
          <FormControl>
            <FormLabel>Hello</FormLabel>
            <InputGroup inputSize="sm">
              <Input name="standard" placeholder="SM..." variant="standard" />
              <InputRightElement>
                <Icon icon="Check" color="green.500" />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>

        <Box width="1/2" mt="4">
          <FormControl>
            <FormLabel>Hello</FormLabel>
            <InputGroup inputSize="md">
              <Input name="standard" placeholder="MD..." variant="standard" />
              <InputRightElement>
                <Icon icon="Check" color="green.500" />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>

        <Box width="1/2" mt="4">
          <FormControl>
            <FormLabel>Hello</FormLabel>
            <InputGroup inputSize="lg">
              <Input name="standard" placeholder="LG..." variant="standard" />
              <InputRightElement>
                <Icon icon="Check" color="green.500" />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>

        <Box width="1/2" mt="4">
          <FormControl>
            <FormLabel>Hello</FormLabel>
            <InputGroup inputSize="xl">
              <Input name="standard" placeholder="XL..." variant="standard" />
              <InputRightElement>
                <Icon icon="Check" color="green.500" />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box> */}

        <Flex width="1/2" mt="4">
          <Input name="first" placeholder="First name..." variant="flushed" inputSize="xl" />
          <Input name="last" placeholder="Last name..." variant="flushed" inputSize="xl" ml="4" />
        </Flex>

        {/* <Box width="1/2" mt="4">
          <FormControl>
            <Input name="modern" placeholder="Modern..." variant="modern" />
          </FormControl>
        </Box> */}

        {/* <Box width="1/2" mt="4">
          <Input name="unstyled" placeholder="Unstyled..." variant="unstyled" />
        </Box> */}

        {/* <Button
          mt="8"
          rounded="full"
          intent="warning"
          leftIcon="Trash2"
          onClick={() => {
            setStriked(!striked)
          }}
        >
          Strike
        </Button>

        <Text mt="4" isStriked={striked}>
          Striked?
        </Text> */}
        {/*
        <Box my="8" width="1/2">
          <PasswordInput
            name="password"
            placeholder="Password"
            rulesList={passwordRules}
            onChange={(e) => {
              setPasswordRules([
                { id: 1, text: 'Minimum 12 characters', valid: e.target.value >= 12 },
                { id: 2, text: 'Maximum 80 characters', valid: e.target.value < 80 },
                { id: 3, text: 'At least one lower case character', valid: true },
                { id: 4, text: 'At least one upper case character', valid: false },
                { id: 5, text: 'At least one digit or punctuation character', valid: false },
              ])
            }}
          />
        </Box> */}

        <Flex mt="8" px="4" py="3" bg="white" alignItems="center" rounded="full" shadow="default">
          <Button
            leftIcon="ArrowLeft"
            rounded="full"
            intent="light"
            variant="secondary"
            iconStyle={{
              color: 'blue.600',
            }}
            iconSize="6"
          >
            Back
          </Button>

          <IconButton icon="Archive" ml="2" intent="light" variant="secondary" shape="circle" />
          <IconButton
            icon="MoreHorizontal"
            ml="2"
            intent="light"
            variant="secondary"
            shape="circle"
          />
        </Flex>
      </Container>
    </Fragment>
  )
}
