import React from 'react'
import { StyleSheet } from 'react-native'
import { Surface } from 'react-native-paper'

import CriteriaChart from '@/lib/ui/components/CriteriaChart'

const Graph = () => {
  const dataValues = [3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2, 1]

  return (
    <Surface style={[styles.screen]}>
      <CriteriaChart dataValues={dataValues} />
    </Surface>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Graph
