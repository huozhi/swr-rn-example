# SWR React Native Example

## About

This example is aimed to show users how to play swr with react native. swr is targeted to web platform previously, now with very few customization in swr beta versions, you're able to make it fully functional in react native runtime. After swr v1 is rolling out, should be able to safely upgrade smoothly.


## Showcase

#### Initial State in Cache

Use `createCache` API to consume initial state for swr.

#### Revalidation during Application State Switching

Use `AppState` to determine if user is in the foreground, then decide wether to schedule a revalidation.

#### Polyfill Runtime Conditions

Use `option.isVisible()` and `option.isOnline()` to set your own bar for revalidation.

