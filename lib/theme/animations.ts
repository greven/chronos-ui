import { keyframes } from '@emotion/core'

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const spinAnimation = `${spin} 1s linear infinite;`

export const ping = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`

export const pingAnimation = `${ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite;`

export const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`

export const pulseAnimation = `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;`

export const bounce = keyframes`
  0%, 100% {
    transform: translateY(-25%);
    animationTimingFunction: cubic-bezier(0.8,0,1,1);
  }
  50% {
    transform: translateY(0);
    animationTimingFunction: cubic-bezier(0,0,0.2,1);
  }
`

export const bounceAnimation = `${bounce} 1s infinite;`

export const heartbeat = keyframes`
  from {
    transform: scale(1);
    transform-origin: center center;
    animation-timing-function: ease-out;
  }
  10% {
    transform: scale(0.91);
    animation-timing-function: ease-in;
  }
  17% {
    transform: scale(0.98);
    animation-timing-function: ease-out;
  }
  33% {
    transform: scale(0.87);
    animation-timing-function: ease-in;
  }
  45% {
    transform: scale(1);
    animation-timing-function: ease-out;
  }
`

export const heartbeatAnimation = `${heartbeat} 1s 1.5s ease-in-out infinite both;`

export default {
  spin,
  spinAnimation,
  ping,
  pingAnimation,
  pulse,
  pulseAnimation,
  bounce,
  bounceAnimation,
  heartbeat,
  heartbeatAnimation,
}
