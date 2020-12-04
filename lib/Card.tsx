import React from 'react'
import { elm, forwardRef, PropsOf, SystemProps, useColorModeValue } from './system'
import { useSafeLayoutEffect, useBoolean } from './hooks'
import { cx } from './util'
import { Text } from './Text'
import { NoImage } from './Image'
import { useImage } from './useImage'

const useCardStyle = (props?: CardOptions) => {
  return {
    base: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRadius: 'lg',
      background: useColorModeValue('surface.light', 'surface.dark'),
      border: props?.outlined ? '1px solid' : 'none',
      borderColor: 'inherit',
      boxShadow: 'default',
      transitionDuration: 'fast',
      transitionProperty: 'default',
      transitionTimingFunction: 'in-out',
    },

    content: {
      padding: 4,
      flexGrow: 1,
      fontSize: 'sm',
    },

    header: {
      a: {
        color: 'inherit',
        _hover: {
          color: 'link',
          textDecoration: 'none',
        },
      },
    },

    extra: {
      display: 'flex',
      flexGrow: 0,
      alignItems: 'center',
      px: [6, 4],
      py: '3',
    },
  }
}

export interface CardOptions {
  /** Show outline border in card. */
  outlined?: boolean
}

export type CardProps = CardOptions & PropsOf<typeof elm.div>

export const Card = forwardRef<CardProps, 'div'>((props: CardProps, ref: any) => {
  const { className, ...rest } = props

  const styles = useCardStyle(rest)

  return <elm.div ref={ref} className={cx('Card', className)} __css={styles.base} {...rest} />
})

// Card Content

export type CardContentProps = PropsOf<typeof elm.div> & {
  children?: React.ReactNode
  contentHeader?: React.ReactNode
  contentMeta?: React.ReactNode
  contentDescription?: React.ReactNode
}

export const CardContent = forwardRef<CardContentProps, 'div'>(
  (props: CardContentProps, ref: any) => {
    const { children, className, contentHeader, contentMeta, contentDescription, ...rest } = props

    const styles = useCardStyle()

    return (
      <elm.div ref={ref} className={cx('CardContent', className)} __css={styles.content} {...rest}>
        {contentHeader && (
          <Text variant="title3" sx={styles.header}>
            {contentHeader}
          </Text>
        )}
        {contentMeta && (
          <Text variant="subtitle1" color="gray.400">
            {contentMeta}
          </Text>
        )}
        {contentDescription && <elm.div mt="2">{contentDescription}</elm.div>}
        {children && <div>{children}</div>}
      </elm.div>
    )
  }
)

// Card Extra

export type CardExtraProps = PropsOf<typeof elm.div>

export const CardExtra = forwardRef<CardExtraProps, 'div'>((props: CardExtraProps, ref: any) => {
  const { className, ...rest } = props

  const styles = useCardStyle()

  return (
    <elm.div
      ref={ref}
      className={cx('CardExtra', className)}
      __css={{
        ...styles.extra,
      }}
      {...rest}
    />
  )
})

// Card Image

type CardImageProps = PropsOf<typeof elm.img> & {
  /**
   * The image url of the `Card Image`
   */
  src?: string
  /**
   * Fallback element to show if image is loading or image fails.
   */
  fallback?: React.ReactElement
  /**
   * How the image to fit within it's bounds.
   * It maps to css `object-fit` property.
   */
  fit?: SystemProps['objectFit']
  /**
   * How to align the image within its bounds.
   * It maps to css `object-position` property.
   */
  align?: SystemProps['objectPosition']
  /**
   * Function called when image failed to load
   */
  onError?(): void
}

export const CardImage: React.FC<CardImageProps> = ({
  src,
  onError,
  fallback,
  minH,
  minHeight,
  maxH,
  maxHeight,
  fit = 'cover',
  align,
  ...rest
}) => {
  const status = useImage({ src, onError })

  const hasLoaded = status === 'loaded'

  const showFallback = !src || (src && !hasLoaded)

  const imageMinHeight = '140px'
  const imageMaxHeight = '140px'

  // Try to solve SSR issues with showing the fallback!
  const [hasFallback, setHasFallback] = useBoolean(false)

  useSafeLayoutEffect(() => {
    setHasFallback.on()
    return () => setHasFallback.off()
  }, [])

  if (showFallback && hasFallback) {
    return (
      fallback ?? <NoImage isLoading={!hasLoaded} minHeight={minH || minHeight || imageMinHeight} />
    )
  }

  return (
    <elm.img
      src={src}
      className="CardImage"
      __css={{
        width: '100%',
        height: '100%',
        objectFit: fit,
        objectPosition: align,
        minHeight: minH || minHeight || imageMinHeight,
        maxHeight: maxH || maxHeight || imageMaxHeight,
      }}
      {...rest}
    />
  )
}
