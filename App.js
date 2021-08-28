import React, { useEffect } from 'react'
import { StyleSheet, Text, View, AppState } from 'react-native'
import useSWR, { SWRConfig } from 'swr'

const randomInt = (range) => Math.floor(Math.random() * range)

function Page() {
  const key1 = 'hello'
  const key2 = 'initial'
  const key3 = 'change by time'
  const key4 = 'change on foreground'
  const { data: data1 } = useSWR(key1)
  const { data: data2 } = useSWR(key2)
  const { data: data3, mutate: mutateKeyTimer } = useSWR(key3, () => `${randomInt(200)}`, {
    revalidateOnFocus: false
  })
  const { data: data4 } = useSWR(key4, () => `${randomInt(200)}`)

  useEffect(() => {
    const timer = setInterval(
      () => {
        mutateKeyTimer()
      }, 2000
    )
    return () => clearInterval(timer)
  }, [key3])

  const keyValuePairs = [
    ['KEY', 'VALUE'],
    [key1, data1],
    [key2, data2],
    [key3, data3],
    [key4, data4],
  ]

  return (
    <View style={styles.table}>
      {keyValuePairs.map(([key, value]) => (
        <View key={key} style={styles.row}>
          <Text style={{fontWeight: 'bold'}}>{key}</Text>
          <Text>{value}</Text>
        </View>
      ))}
    </View>
  )
}

function SWRCachePage() {
  return (
    <SWRConfig 
      value={{ 
        provider: () => new Map([
          ['hello', 'swr'],
          ['initialKey', 'initialValue']
        ]),
        isOnline() { return true /* customize with your own condition */ },
        isVisible() { return true /* customize with your own condition */ },
        initFocus(callback) {
          let appState = AppState.currentState
          const onAppStateChange = nextAppState => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
              callback()
            }
            console.log('state change', nextAppState)
            appState = nextAppState
          }
          AppState.addEventListener('change', onAppStateChange)
          return () => {
            AppState.removeEventListener('change', onAppStateChange)
          }
        },
        initReconnect() {
          /* Implement with your network state provider */ 
        }
      }}
    >
      <Page />
    </SWRConfig>
  )
}


export default function App() {
  return (
    <View style={styles.container}>
      <SWRCachePage />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  table: {
    maxHeight: 120,
    alignSelf: 'center',
    alignItems: 'stretch',
  },
  row: {
    flex: 1, 
    alignSelf: 'stretch',
    justifyContent: 'space-between', 
    flexDirection: 'row',
    width: 200,
  },
  cell: { 
    flex: 1, 
    alignSelf: 'stretch',
  },
})
