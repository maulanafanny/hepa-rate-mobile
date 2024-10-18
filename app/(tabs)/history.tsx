import React from 'react'
import { StyleSheet } from 'react-native'
import { Surface } from 'react-native-paper'

import CriteriaTable from '@/lib/ui/components/CriteriaTable'

const History = () => {
  return (
    <Surface style={[styles.screen]}>
      <CriteriaTable />
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

export default History
