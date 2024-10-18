import React from 'react'
import { Surface } from 'react-native-paper'

import Locales from '@/lib/locales'
import { ScreenInfo, styles } from '@/lib/ui'

const Mapping = () => (
  <Surface style={styles.screen}>
    <ScreenInfo title={Locales.t('profile')} path="app/(tabs)/profile.tsx" />
  </Surface>
)

export default Mapping
