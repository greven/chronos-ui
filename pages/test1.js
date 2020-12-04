import React from 'react'
import {
  useColorMode,
  useColorModeValue,
  Box,
  Stack,
  Container,
  Button,
  ButtonGroup,
  FormControl,
  Input,
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputLeftAddon,
  InputRightAddon,
  PasswordInput,
  InputButton,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  Checkbox,
  TextArea,
  Badge,
  Radio,
  RadioGroup,
  Toolbar,
  Navbar,
  Text,
  IconButton,
  Card,
  CardImage,
  CardContent,
  CardExtra,
  Avatar,
  AvatarGroup,
  Collapse,
  useDisclosure,
  CloseButton,
  Alert,
  AlertTitle,
  Tag,
  Status,
  Image,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
} from '../lib'

export default function Tests1() {
  const { toggleColorMode } = useColorMode()
  const [isDisabled, setDisabled] = React.useState(false)
  const [isInvalid, setInvalid] = React.useState(false)
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })
  const [value, setValue] = React.useState('1')
  const [isPwVisible, setPwVisible] = React.useState(false)
  const [currentPassword, setCurrentPassword] = React.useState('')

  return (
    <>
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
        {/* <Collapse my="4" isOpen={isOpen}>
          <Alert accent="left" intent="light" onClose={onToggle}>
            Hello this is alert with close button!
          </Alert>
        </Collapse>

        <Alert mt="4" intent="danger" variant="solid">
          Hello this is alert!
        </Alert>

        <Alert
          mt="4"
          intent="warning"
          variant="solid"
          action={
            <Button variant="ghost" intent="warning" size="sm">
              Hide
            </Button>
          }
        >
          Hello this is alert!
        </Alert>

        <Alert mt="4" intent="success" variant="solid" onClose={onToggle}>
          Hello this is alert!
        </Alert> */}

        {/* <FancyAlert mt="4" intent="danger" title="This is fancy title!">
          Hello this is FANCY alert!
        </FancyAlert> */}

        <Stack m={4} spacing="4">
          <Text variant="title2">Personal Information</Text>
          <Text variant="subtitle1">Use a permanent address where you can receive mail.</Text>
          <Stack w="1/2" spacing="4">
            <FormControl isDisabled={isDisabled} isInvalid={isInvalid}>
              <FormLabel>Age</FormLabel>
              <InputGroup>
                <Input placeholder="Your Age" />
                <InputLeftElement>
                  <Icon icon="Box" />
                </InputLeftElement>
              </InputGroup>
              <FormHelperText>Hello</FormHelperText>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={isInvalid || currentPassword.length < 8}
              isDisabled={isDisabled}
            >
              <PasswordInput
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </FormControl>

            <FormControl
              isRequired
              isInvalid={isInvalid || currentPassword.length < 8}
              isDisabled={isDisabled}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup inputSize="md">
                <Input
                  placeholder="Your password"
                  type={isPwVisible ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <InputLeftElement>
                  <Icon icon="Lock" />
                </InputLeftElement>
                <InputRightElement>
                  <InputButton
                    icon={isPwVisible ? 'Eye' : 'EyeOff'}
                    onClick={() => {
                      setPwVisible(!isPwVisible)
                    }}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>Small Password!</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={isInvalid} isDisabled={isDisabled}>
              <FormLabel>Location</FormLabel>
              <InputGroup focusBorderColor="purple.500">
                <Input placeholder="Current location" variant="modern" />
                <InputLeftAddon>
                  <Icon icon="Lock" />
                </InputLeftAddon>
              </InputGroup>
            </FormControl>

            <FormControl isInvalid={isInvalid}>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <Input placeholder="Current Email" />
                <InputRightAddon>@gmail.com</InputRightAddon>
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Profession</FormLabel>
              <InputGroup inputSize="md">
                <Input placeholder="Profession" />
                <InputLeftAddon>http://</InputLeftAddon>
              </InputGroup>
            </FormControl>

            <FormControl>
              <Checkbox
                iconColor="blue.600"
                inputSize="md"
                my="4"
                helperText="Get notified when someones posts a comment."
              >
                Notifications
              </Checkbox>
            </FormControl>

            <FormControl isInvalid={isInvalid} isDisabled={isDisabled}>
              <TextArea
                placeholder="Your bio..."
                isInvalid={isInvalid}
                isDisabled={isDisabled}
                rows="8"
              />
            </FormControl>

            <TextArea placeholder="Your bio..." isInvalid={isInvalid} isDisabled={isDisabled} />

            <RadioGroup onChange={setValue} value={value} my="4">
              <Stack direction="row">
                <Radio value="1">First</Radio>
                <Radio value="2">Second</Radio>
                <Radio value="3">Third</Radio>
              </Stack>
            </RadioGroup>
          </Stack>

          <ButtonGroup>
            <Button leftIcon="Send" intent="dark" size="md" variant="unstyled">
              Submit
            </Button>

            <Button intent="light" onClick={() => setDisabled(!isDisabled)}>
              Toggle Disabled
            </Button>

            <Button intent="light" onClick={() => setInvalid(!isInvalid)}>
              Toggle Invalid
            </Button>
          </ButtonGroup>
        </Stack>

        {/*
        <h2>Blog</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita debitis laborum alias?
          Distinctio natus totam est consectetur ipsa debitis laudantium eaque error! Ut incidunt
          nobis unde sed obcaecati ad reprehenderit. Minima sed, beatae fuga provident id dolor
          doloribus laudantium, dolorum iusto tempore sit earum ipsum aliquam itaque a voluptatum
          accusantium! Tempore ipsam dolorum harum saepe dicta molestias delectus magni ipsum?
          Asperiores velit atque reiciendis eos ut soluta quod magni odio suscipit hic quos at,
          reprehenderit aut impedit facilis odit molestias vel facere doloribus eius rem illum ipsa
          nobis? Ipsum, porro. Ipsum vel eos consectetur necessitatibus repudiandae tempore ab unde
          maxime vitae, praesentium totam modi? Quia, at. Sequi cumque nihil maiores, eligendi, et
          accusantium, molestiae quibusdam libero consequuntur id error. Ipsum. Cumque sunt
          provident exercitationem fugit qui, quasi officiis minima sit ipsa sequi facilis eligendi
          ea assumenda eius itaque, praesentium quia! Sequi, deserunt praesentium omnis fugit
          tempore architecto ratione aspernatur earum. Corporis consequatur quos voluptatem
          laboriosam voluptates eligendi nostrum voluptate odio fugiat autem officia nulla quas
          similique, totam quo nam itaque sint dicta. Quae porro voluptate iste corporis odit sequi
          veritatis! Vel, maiores assumenda officia maxime perferendis odit, velit ullam voluptatem
          magnam, architecto deserunt dolore. Harum expedita, voluptatibus fuga nostrum
          reprehenderit quas id necessitatibus, minus rem aperiam soluta provident, nisi doloremque?
          Optio ducimus libero beatae nihil cum incidunt aliquam, quam, molestiae quod aspernatur
          doloribus? Facere similique quaerat, non inventore voluptas adipisci laborum rem velit.
        </p> */}

        {/* <Wrap> */}
        {/* <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" /> */}
        {/* <Avatar name="Kola Tioluwani" src="https://bit.ly/tioluwani-kolawole" /> */}
        {/* <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" /> */}
        {/* <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" /> */}
        {/* <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" /> */}
        {/* <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" /> */}
        {/* <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" /> */}
        {/* </Wrap> */}

        <AvatarGroup size="md" max={3} borderColor="white" showBorder>
          <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
          <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
          <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
          <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
          <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
        </AvatarGroup>

        {/* <Button mt="8" mb="4" onClick={onToggle}>
          {isOpen ? 'Close' : 'Expand'}
        </Button> */}

        {/* <Collapse isOpen={isOpen}>
          <Box
            p="4"
            bg="green.200"
            border="1px solid"
            borderColor="green.500"
            rounded="default"
            boxShadow="lg"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, suscipit. Suscipit
            error praesentium fuga eius culpa libero, accusamus nulla, officiis aut nemo quod
            ducimus vero, tempora cumque! Harum, suscipit amet? Eveniet, corrupti non dolore, fugiat
            delectus porro quod, veritatis facilis sunt possimus ipsum deleniti sapiente vitae
            voluptatibus error debitis placeat labore. A exercitationem sequi, dolorum est eius
            cupiditate. Ex, mollitia. Alias fuga nam ipsam corrupti vel rem cupiditate aspernatur?
            Dolor ea explicabo aperiam eos, inventore non suscipit beatae, deserunt quae sint cum
            dolorem, quasi tempora. Excepturi, minima! Minima, aperiam mollitia.
          </Box>
        </Collapse> */}

        <Stack my="8" direction="row">
          <Card maxW="300px">
            <CardImage src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=960&q=80" />
            <CardContent contentHeader="Doggo">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum saepe repudiandae
              sint consequatur molestias deleniti inventore necessitatibus, dicta, quidem incidunt
              commodi.
            </CardContent>
            <CardExtra bg={useColorModeValue('gray.100', 'dark.700')}>
              <ButtonGroup size="sm" intent={useColorModeValue('dark', 'light')}>
                <Button>Pat</Button>
                <Button>Feed</Button>
              </ButtonGroup>
            </CardExtra>
          </Card>

          <Card maxW="300px">
            <CardImage
              src="https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80"
              align="center"
            />
            <CardContent contentHeader="Cat'o">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum saepe repudiandae
              sint consequatur molestias deleniti inventore necessitatibus, dicta, quidem incidunt
              commodi.
            </CardContent>
            <CardExtra bg={useColorModeValue('gray.100', 'dark.700')}>
              <ButtonGroup size="sm" intent={useColorModeValue('dark', 'light')}>
                <Button>Pat</Button>
                <Button>Feed</Button>
              </ButtonGroup>
            </CardExtra>
          </Card>
        </Stack>

        <Stack direction="row" my="8">
          <Tag variantColor="blue">Low</Tag>
          <Tag variantColor="green" onClose={() => console.log('Close Tag')}>
            Normal
          </Tag>
          <Tag variantColor="yellow" rounded="full" onClose={() => console.log('Close Tag')}>
            High
          </Tag>
          <Tag variantColor="red" onClose={() => console.log('Close Tag')}>
            Critical
          </Tag>
          <Tag
            size="sm"
            variantColor="green"
            variant="solid"
            rounded="full"
            onClose={() => console.log('Close Tag')}
          >
            Close
          </Tag>
          <Tag
            size="md"
            variantColor="red"
            variant="solid"
            rounded="full"
            onClose={() => console.log('Close Tag')}
          >
            Close
          </Tag>
          <Tag
            size="md"
            variantColor="orange"
            variant="outlined"
            rounded="full"
            onClose={() => console.log('Close Tag')}
          >
            Close
          </Tag>
          <Tag
            size="md"
            variantColor="blue"
            variant="solid"
            rounded="full"
            onClick={() => console.log('Tag On Click')}
          >
            Button
          </Tag>
        </Stack>

        <Popover placement="right">
          <PopoverTrigger>
            <Button intent="info" my="8">
              Popover Trigger
            </Button>
          </PopoverTrigger>
          <PopoverContent zIndex={4}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Confirmation!</PopoverHeader>
            <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
          </PopoverContent>
        </Popover>
      </Container>
    </>
  )
}
