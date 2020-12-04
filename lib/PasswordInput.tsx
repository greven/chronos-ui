import React, { useState, useMemo } from 'react'
import { forwardRef, elm } from './system'
import { createContext } from './util'
import { InputBaseProps } from './InputBase'
import { Input } from './Input'
import { InputRightElement, InputLeftElement, InputButton } from './InputElement'
import { InputGroup } from './InputGroup'
import { Icon, IconName } from './Icon'
import { Tooltip } from './Tooltip'
import { Flex } from './Flex'
import { Text } from './Text'

interface PasswordInputOptions {
  icon?: IconName
  leftElement?: React.ReactNode
  rulesList?: RuleItem[]
  validIcon?: IconName
  invalidIcon?: IconName
}

export type RuleItem = {
  id: string | number
  text: string
  valid?: boolean
}

type PasswordInputProps = InputBaseProps & PasswordInputOptions

const [PasswordInputContextProvider, usePasswordInputContext] = createContext<PasswordInputOptions>(
  {
    name: 'PasswordInputContext',
  }
)

export const PasswordInput = forwardRef<PasswordInputProps, 'input'>(
  (
    { inputSize = 'md', icon = 'Lock', leftElement, rulesList, validIcon, invalidIcon, ...rest },
    ref: any
  ) => {
    const [isVisible, setIsVisible] = useState(false)
    const [showRulesTooltip, setShowRulesTooltip] = useState(false)

    const context = useMemo(() => ({ rulesList, validIcon, invalidIcon }), [
      rulesList,
      validIcon,
      invalidIcon,
    ])

    const leftChild = leftElement ?? (
      <InputLeftElement>
        <Icon icon={icon} />
      </InputLeftElement>
    )

    const InputElements = (
      <InputGroup inputSize={inputSize}>
        <Input
          ref={ref}
          type={isVisible ? 'text' : 'password'}
          onFocus={() => rulesList && setShowRulesTooltip(true)}
          onBlur={() => rulesList && setShowRulesTooltip(false)}
          {...rest}
        />
        {leftChild}
        <InputRightElement>
          <InputButton
            size={inputSize}
            label="Show/hide password"
            icon={isVisible ? 'Eye' : 'EyeOff'}
            onClick={() => {
              setIsVisible(!isVisible)
            }}
          />
        </InputRightElement>
      </InputGroup>
    )

    return (
      <React.Fragment>
        {rulesList ? (
          <PasswordInputContextProvider value={context}>
            <Tooltip
              content={<RulesList />}
              isOpen={showRulesTooltip}
              placement="right"
              gutter={16}
              hasArrow
            >
              {InputElements}
            </Tooltip>
          </PasswordInputContextProvider>
        ) : (
          InputElements
        )}
      </React.Fragment>
    )
  }
)

/** Renders a Tooltip with a list of rules / condition items
 * that can be valid or invalid.
 */
export function RulesList() {
  const { rulesList } = usePasswordInputContext()

  return (
    <Flex direction="column" py={1.5} px={2.5}>
      <elm.ul color="gray.200" fontWeight="medium">
        {rulesList?.map((item) => (
          <elm.li
            as={ConditionItem}
            key={item.id}
            isValid={item.valid}
            text={item.text}
            __css={{
              _notFirst: {
                mt: 2,
              },
            }}
          />
        ))}
      </elm.ul>
    </Flex>
  )
}

type ConditionItemProps = {
  text: string
  isValid?: boolean
}

const ConditionItem = ({ isValid = false, text, ...rest }: ConditionItemProps) => {
  const { validIcon, invalidIcon } = usePasswordInputContext()

  return (
    <elm.li display="flex" {...rest}>
      <Icon
        icon={isValid ? validIcon ?? 'Check' : invalidIcon ?? 'X'}
        color={isValid ? 'green.400' : 'red.500'}
        mr="2.5"
      />

      <Text
        variant="body"
        fontSize="sm"
        color={isValid ? 'gray.500' : 'gray.100'}
        isStriked={isValid}
      >
        {text}
      </Text>
    </elm.li>
  )
}
