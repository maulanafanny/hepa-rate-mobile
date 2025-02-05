import React from 'react'
import { StyleSheet } from 'react-native'
import { Surface } from 'react-native-paper'

import CriteriaMap from '@/lib/ui/components/CriteriaMap'

const Mapping = () => (
  <Surface style={styles.screen}>
    <CriteriaMap />
  </Surface>
)

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Mapping
