import React from 'react'
import { StyleSheet } from 'react-native'
import { Surface } from 'react-native-paper'

import CriteriaChart from '@/lib/ui/components/CriteriaChart'

const Graph = () => {
  return (
    <Surface style={[styles.screen]}>
      <CriteriaChart />
    </Surface>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Graph
