import React from 'react'
import { Surface } from 'react-native-paper'

import Locales from '@/lib/locales'
import { ScreenInfo, styles } from '@/lib/ui'

const Information = () => (
  <Surface style={styles.screen}>
    <ScreenInfo
      title={Locales.t('titleInformation')}
      path="app/(tabs)/information.tsx"
    />
  </Surface>
)

export default Information
