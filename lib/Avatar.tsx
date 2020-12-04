import React, { cloneElement, ReactElement, ReactNode } from 'react'
import {
  elm,
  PropsOf,
  SystemProps,
  SystemStyleObject,
  forwardRef,
  StylesProvider,
  ElementSize,
  useColorModeValue,
  useTheme,
} from './system'
import { useSafeLayoutEffect, useBoolean } from './hooks'
import { cx, omit, getValidChildren } from './util'
import { randomColor, isDark } from './theme'
import { useImage } from './useImage'

type AvatarSize = ElementSize

export function useAvatarStyle(props?: AvatarOptions) {
  const theme = useTheme()

  const bg = props?.name ? randomColor({ string: props?.name }) : 'gray.400'
  const color = props?.name ? (isDark(bg)(theme) ? 'white' : 'gray.800') : 'white'
  const borderColor = useColorModeValue('white', 'gray.800')

  return {
    container: {
      bg,
      color,
      borderColor,
      verticalAlign: 'top',
    },

    badge: {
      borderRadius: 'full',
      border: '0.2em solid',
      borderColor: useColorModeValue('white', 'gray.800'),
      transform: 'translate(25%, 25%)',
    },

    label: {},

    excessLabel: {
      bg: useColorModeValue('gray.200', 'whiteAlpha.400'),
    },

    size: {
      xs: {
        container: {
          width: 4,
          height: 4,
          fontSize: 'xs',
        },
        label: {
          fontSize: 'xs',
          lineHeight: 'normal',
        },
        excessLabel: {
          width: 4,
          height: 4,
          fontSize: 'xs',
        },
      },
      sm: {
        container: {
          width: 8,
          height: 8,
          fontSize: 'xs',
        },
        label: {
          fontSize: 'xs',
          lineHeight: 'normal',
        },
        excessLabel: {
          width: 8,
          height: 8,
          fontSize: 'xs',
        },
      },
      md: {
        container: {
          width: 12,
          height: 12,
          fontSize: 'base',
        },
        label: {
          fontSize: 'base',
          lineHeight: 'normal',
        },
        excessLabel: {
          width: 12,
          height: 12,
          fontSize: 'base',
        },
      },
      lg: {
        container: {
          width: 16,
          height: 16,
          fontSize: 'xl',
        },
        label: {
          fontSize: 'xl',
          lineHeight: 'normal',
        },
        excessLabel: {
          width: 16,
          height: 16,
          fontSize: 'xl',
        },
      },
      xl: {
        container: {
          width: 24,
          height: 24,
          fontSize: '2xl',
        },
        label: {
          fontSize: '2xl',
          lineHeight: 'normal',
        },
        excessLabel: {
          width: 24,
          height: 24,
          fontSize: '2xl',
        },
      },
    },
  }
}

interface AvatarOptions {
  /**
   * The name of the person in the avatar.
   *
   * - if `src` has loaded, the name will be used as the `alt` attribute of the `img`
   * - If `src` is not loaded, the name will be used to create the initials
   */
  name?: string
  /**
   * The size of the avatar.
   */
  size?: AvatarSize
  /**
   * If `true`, the `Avatar` will show a border around it.
   *
   * Best for a group of avatars
   */
  showBorder?: boolean
  /**
   * The badge at the bottom right corner of the avatar.
   */
  children?: ReactNode
  /**
   * The image url of the `Avatar`
   */
  src?: string
  /**
   * List of sources to use for different screen resolutions
   */
  srcSet?: string
  /**
   * The border color of the avatar
   */
  borderColor?: SystemProps['borderColor']
  /**
   * Function called when image failed to load
   */
  onError?(): void
  /**
   * The default avatar used as fallback when `name`, and `src`
   * is not specified.
   */
  icon?: ReactElement
  /**
   * Function to get the initials to display
   */
  getInitials?(name?: string): string
}

export type AvatarBadgeProps = PropsOf<typeof elm.div>

/**
 * AvatarBadge used to show extra badge to the top-right
 * or bottom-right corner of an avatar.
 */
export const AvatarBadge = forwardRef<AvatarBadgeProps, 'div'>(function AvatarBadge(props, ref) {
  const styles = useAvatarStyle()
  const badgeStyles = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: '0',
    bottom: '0',
    ...styles.badge,
  }

  return (
    <elm.div
      ref={ref}
      {...props}
      className={cx('AvatarBadge', props.className)}
      __css={badgeStyles}
    />
  )
})

function initials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return firstName && lastName ? `${firstName.charAt(0)}${lastName.charAt(0)}` : firstName.charAt(0)
}

type InitialsProps = PropsOf<typeof elm.div> & Pick<AvatarOptions, 'name' | 'getInitials'>

/**
 * The avatar name container
 */
const Initials: React.FC<InitialsProps> = (props) => {
  const { name, getInitials, ...rest } = props
  const styles = useAvatarStyle()

  return (
    <elm.div aria-label={name} {...rest} __css={styles.label}>
      {name ? getInitials?.(name) : null}
    </elm.div>
  )
}

/**
 * Fallback avatar react component.
 * This should be a generic svg used to represent an avatar
 */
const DefaultIcon: React.FC<PropsOf<'svg'>> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      color="#fff"
      width="90%"
      height="90%"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  )
}

export const baseStyle: SystemStyleObject = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  textTransform: 'uppercase',
  fontWeight: 'medium',
  position: 'relative',
  flexShrink: 0,
}

export interface AvatarProps extends Omit<PropsOf<typeof elm.span>, 'onError'>, AvatarOptions {}

/**
 * Avatar component that renders an user avatar with
 * support for fallback avatar and name-only avatars
 */
export const Avatar = forwardRef<AvatarProps, 'span'>(function Avatar(props, ref) {
  const {
    src,
    className,
    name,
    showBorder,
    borderRadius = 'full',
    onError,
    size = 'md',
    getInitials = initials,
    icon = <DefaultIcon />,
    children,
    ...rest
  } = props

  const styles = useAvatarStyle(props)

  const avatarStyles = {
    borderRadius,
    borderWidth: showBorder ? '2px' : undefined,
    ...baseStyle,
    ...styles.container,
    ...styles.size[size].container,
  }

  return (
    <elm.span ref={ref} {...rest} className={cx('Avatar', className)} __css={avatarStyles}>
      <StylesProvider value={styles}>
        <AvatarImage
          src={src}
          onError={onError}
          getInitials={getInitials}
          name={name}
          borderRadius={borderRadius}
          icon={icon}
        />
        {children}
      </StylesProvider>
    </elm.span>
  )
})

type AvatarImageProps = Pick<
  AvatarProps,
  'src' | 'onError' | 'name' | 'getInitials' | 'borderRadius' | 'icon'
>

const AvatarImage: React.FC<AvatarImageProps> = ({
  src,
  onError,
  getInitials,
  name,
  borderRadius,
  icon = <DefaultIcon />,
}) => {
  /**
   * use the image hook to only show the image when it has loaded
   */
  const status = useImage({ src, onError })

  const hasLoaded = status === 'loaded'

  /**
   * Fallback avatar applies under 2 conditions:
   * - If `src` was passed and the image has not loaded or failed to load
   * - If `src` wasn't passed
   *
   * In this case, we'll show either the name avatar or default avatar
   */
  const showFallback = !src || (src && !hasLoaded)

  // Try to solve SSR issues with showing the fallback!
  const [hasFallback, setHasFallback] = useBoolean(false)

  useSafeLayoutEffect(() => {
    setHasFallback.on()
    return () => setHasFallback.off()
  }, [])

  if (showFallback && hasFallback) {
    return name ? (
      <Initials className="AvatarInitials" getInitials={getInitials} name={name} />
    ) : (
      cloneElement(icon, { role: 'img' })
    )
  }

  /**
   * If `src` was passed and the image has loaded, we'll show it
   */
  return (
    <elm.img
      src={src}
      alt={name}
      className="AvatarImage"
      __css={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius,
      }}
    />
  )
}

// Avatar Group

interface AvatarGroupOptions {
  /**
   * The children of the avatar group.
   *
   * Ideally should be `Avatar` and `MoreIndicator` components
   */
  children: ReactNode
  /**
   * The space between the avatars in the group.
   */
  spacing?: SystemProps['margin']
  /**
   * The maximum number of visible avatars
   */
  max?: number
}

export interface AvatarGroupProps
  extends AvatarGroupOptions,
    Omit<PropsOf<typeof elm.div>, 'children'> {
  size?: AvatarSize
}

/**
 * AvatarGroup displays a number of avatars grouped together in a stack.
 */
export const AvatarGroup = forwardRef<AvatarGroupProps, 'div'>(function AvatarGroup(props, ref) {
  const styles = useAvatarStyle()

  const { children, borderColor, max, size = 'md', spacing = '-0.8rem', ...rest } = props

  const otherProps = omit(rest, ['showBorder', 'borderColor'] as any)

  const validChildren = getValidChildren(children)

  /**
   * get the avatars within the max
   */
  const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren

  /**
   * get the remaining avatar count
   */
  const excess = max != null && validChildren.length - max

  /**
   * Reversing the children is a great way to avoid using zIndex
   * to overlap the avatars
   */
  const reversedChildren = childrenWithinMax.reverse()

  const clones = reversedChildren.map((child, index) => {
    const isFirstAvatar = index === 0

    return cloneElement(child, {
      mr: isFirstAvatar ? 0 : spacing,
      size: size,
      borderColor: child.props.borderColor || borderColor,
      showBorder: true,
    })
  })

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
  }

  const excessStyles = {
    borderRadius: 'full',
    ml: spacing,
    ...baseStyle,
    ...styles.excessLabel,
    ...styles.size[size].excessLabel,
  }

  return (
    <elm.div
      ref={ref}
      role="group"
      __css={groupStyles}
      {...otherProps}
      className={cx('AvatarGroup', props.className)}
    >
      {excess && <elm.span className="AvatarExcess" __css={excessStyles}>{`+${excess}`}</elm.span>}
      {clones}
    </elm.div>
  )
})
