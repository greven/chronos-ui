import React from 'react'
import { elm, PropsOf, SystemProps, forwardRef } from './system'
import { useImage, UseImageProps } from './useImage'
import { omit } from './util'
import { Icon } from './Icon'
import { spin } from './theme'

interface NativeImageOptions {
  /**
   * The native HTML `width` attribute to the passed to the `img`
   */
  htmlWidth?: string | number
  /**
   * The native HTML `height` attribute to the passed to the `img`
   */
  htmlHeight?: string | number
}

interface NativeImageProps extends PropsOf<'img'>, NativeImageOptions {}

const NativeImage = React.forwardRef(function NativeImage(
  props: NativeImageProps,
  ref: React.Ref<any>
) {
  const { htmlWidth, htmlHeight, ...rest } = props
  return <img width={htmlWidth} height={htmlHeight} ref={ref} {...rest} />
})

interface ImageOptions extends NativeImageOptions {
  /**
   * Fallback image `src` to show if image is loading or image fails.
   *
   * Note 🚨: We recommend you use a local image
   */
  fallbackSrc?: string
  /**
   * Fallback element to show if image is loading or image fails.
   */
  fallback?: React.ReactElement
  /**
   * Defines loading strategy
   */
  loading?: 'eager' | 'lazy'
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
   * If `true`, opt out of the `fallbackSrc` logic and use as `img`
   */
  ignoreFallback?: boolean
}

export interface ImageProps
  extends UseImageProps,
    Omit<PropsOf<typeof elm.img>, keyof UseImageProps>,
    ImageOptions {}

/**
 * React component that renders an image with support
 * for fallbacks
 *
 * @see Docs https://chakra-ui.com/components/image
 */
export const Image = forwardRef<ImageProps, 'img'>(function Image(props, ref) {
  const {
    fallbackSrc,
    fallback,
    src,
    align,
    fit,
    loading,
    ignoreFallback,
    crossOrigin,
    ...rest
  } = props

  /**
   * Defer to native `img` tag if `loading` prop is passed
   */
  const shouldIgnore = loading != null || ignoreFallback

  const status = useImage({
    ...props,
    ignoreFallback: shouldIgnore,
  })

  const shared = {
    ref,
    objectFit: fit,
    objectPosition: align,
    ...(shouldIgnore ? rest : omit(rest, ['as', 'onError', 'onLoad'])),
  }

  if (status !== 'loaded') {
    /**
     * If user passed a custom fallback component,
     * let's render it here.
     */
    if (fallback) return fallback

    return <elm.img as={NativeImage} className="Placeholder" src={fallbackSrc} {...shared} />
  }

  return (
    <elm.img
      as={NativeImage}
      src={src}
      crossOrigin={crossOrigin}
      loading={loading}
      className="Image"
      {...shared}
    />
  )
})

export type ImgProps = PropsOf<typeof elm.img> & NativeImageOptions

/**
 * Fallback component for most SSR users who want to use the native `img` with
 * support for system props
 */
export const Img = forwardRef<ImgProps, 'img'>(function Img(props, ref) {
  return <elm.img ref={ref} as={NativeImage} className="Image" {...omit(props, ['as'])} />
})

/** Image placeholder for content that is loading or hasn't loaded. */
export type NoImageProps = PropsOf<typeof elm.div> & {
  /** Set the loading state of the image placeholder */
  isLoading?: boolean
  /** The delay (in ms) before the spinner will appear. */
  delay?: number
}

export const NoImage: React.FC<NoImageProps> = ({ isLoading = false, delay = 2000, ...rest }) => {
  const [show, setShow] = React.useState(delay === 0 ? true : false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [delay])

  const showLoading = show && isLoading

  return (
    <elm.div
      className="NoImage"
      __css={{
        width: 'full',
        height: 'full',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bg: 'gray.100',
      }}
      {...rest}
    >
      <elm.div __css={{ h: '12' }}>
        <Icon
          icon="Image"
          size="6"
          bgShape="circle"
          sx={{
            color: showLoading ? 'transparent' : 'gray.500',
            bg: showLoading ? 'gray.100' : 'gray.200',
            borderWidth: showLoading ? 1 : 0,
            borderColor: 'gray.800',
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            transitionDuration: 'normal',
            transitionProperty: 'default',
            transitionTimingFunction: 'in-out',
            animation: showLoading ? `${spin} 400ms linear infinite` : 'none',
          }}
        />
      </elm.div>
    </elm.div>
  )
}
