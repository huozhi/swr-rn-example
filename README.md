# SWR React Native Example

## About

This example is aimed to show users how to play swr with react native. swr is targeted to web platform previously, now with very few customization in swr beta versions, you're able to make it fully functional in react native runtime. After swr v1 is rolling out, should be able to safely upgrade smoothly.


## How to Play

You need to install `expo-cli` globally

```
yarn global add expo-cli
```

Then use expo to start your project

```
yarn
expo start
```

Check the code details in [App.js](./App.js)

## Usage

### Initial State in Cache

Use `provider` option to consume initial state for SWR.

```jsx
<SWRConfig
  value={{
    provider: () => new Map(initialState)
  }}
>
```

### Revalidation during Application State Switching

Use `AppState` to determine if user is in the foreground, then decide wether to schedule a revalidation.

```jsx
import { AppState } from 'react-native'

<SWRConfig
  value={{
    initFocus(revalidate) {
      let appState = AppState.currentState
      const onAppStateChange = nextAppState => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
          revalidate()
        }
        console.log('state change', nextAppState)
        appState = nextAppState
      }
      AppState.addEventListener('change', onAppStateChange)
      return () => {
        AppState.removeEventListener('change', onAppStateChange)
      }
    }
  }}
>
```

### Polyfill Runtime Conditions

Use `option.isVisible()` and `option.isOnline()` to set your own bar for revalidation.

```jsx
<SWRConfig
  value={{
    isOnline() { return true /* customize with your own condition */ },
    isVisible() { return true /* customize with your own condition */ },
  }}
>
```

Finally run your app with all customized configurations!

```jsx
<SWRConfig
  value={{
    provider,
    initFocus,
    initReconnect,
    isOnline,
    isVisible,
  }}
>
  <App>
</SWRConfig>
```
