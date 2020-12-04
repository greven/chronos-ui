# Chronos UI

Chronos UI is a set of reusable React components built on top of Styled System. It leverages code from Styled Systems, Theme UI, Sancho UI and Chakra UI, the later being its biggest inspiration / source for the API as it uses its custom Styled System.
Chronos UI is just an exploration of several technologies in order to experiment.

## Usage

In order for Chronos UI to work correctly, you need to wrap the root of your application with the global provider.

```js
import React from 'react'
import { ThemeUIProvider, theme } from '@greven/chronos-ui'

// Use at the root of your app
function App() {
  return (
    <ThemeUIProvider theme={theme}>
      <App />
    </ThemeUIProvider>
  )
}
```
