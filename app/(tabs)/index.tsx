import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import {
  Surface,
  Text,
  Card,
  TouchableRipple,
  useTheme,
} from 'react-native-paper'

const TabsHome = () => {
  const theme = useTheme()

  return (
    <Surface style={[styles.screen]}>
      <Text style={styles.title} variant="headlineLarge">
        {`Visualisasi Spasial Temporal Tingkat Kerawanan Hepatitis-A Kabupaten Pacitan`.toUpperCase()}
      </Text>

      <Card style={styles.fullWidthCard} mode="elevated" elevation={5}>
        <Card.Content style={styles.cardContainer}>
          <TouchableRipple
            onPress={() => router.push('/(tabs)/mapping')}
            rippleColor="rgba(255, 255, 255, .3)"
            style={styles.touchable}
            borderless
          >
            <Card style={styles.card} mode="elevated">
              <Card.Content>
                <Card.Title
                  title="Pemetaan Kerawanan"
                  style={styles.cardTitle}
                  titleStyle={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    paddingRight: 0,
                  }}
                />
                <MaterialCommunityIcons
                  size={90}
                  name="map-outline"
                  color={theme.colors.primary}
                />
              </Card.Content>
            </Card>
          </TouchableRipple>

          <TouchableRipple
            onPress={() => router.push('/(tabs)/graph')}
            rippleColor="rgba(255, 255, 255, .3)"
            style={styles.touchable}
            borderless
          >
            <Card style={styles.card} mode="elevated">
              <Card.Content>
                <Card.Title
                  title="Grafik Kerawanan"
                  style={styles.cardTitle}
                  titleStyle={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    paddingRight: 0,
                  }}
                />
                <MaterialCommunityIcons
                  size={90}
                  name="chart-bar-stacked"
                  color={theme.colors.primary}
                />
              </Card.Content>
            </Card>
          </TouchableRipple>

          <TouchableRipple
            onPress={() => router.push('/(tabs)/history')}
            rippleColor="rgba(255, 255, 255, .3)"
            style={styles.touchable}
            borderless
          >
            <Card style={styles.card} mode="elevated">
              <Card.Content>
                <Card.Title
                  title="Histori Kasus"
                  style={styles.cardTitle}
                  titleStyle={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    paddingRight: 0,
                  }}
                />
                <MaterialCommunityIcons
                  size={90}
                  name="clipboard-text-search-outline"
                  color={theme.colors.primary}
                />
              </Card.Content>
            </Card>
          </TouchableRipple>

          <TouchableRipple
            onPress={() => router.push('/(tabs)/information')}
            rippleColor="rgba(255, 255, 255, .3)"
            style={styles.touchable}
            borderless
          >
            <Card style={styles.card} mode="elevated">
              <Card.Content>
                <Card.Title
                  title="Informasi Hepatitis-A"
                  style={styles.cardTitle}
                  titleStyle={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    paddingRight: 0,
                  }}
                />
                <MaterialCommunityIcons
                  size={90}
                  name="newspaper"
                  color={theme.colors.primary}
                />
              </Card.Content>
            </Card>
          </TouchableRipple>
        </Card.Content>
      </Card>
    </Surface>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  fullWidthCard: {
    width: '100%',
    marginTop: 16,
    flex: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  touchable: {
    width: '48%',
    marginTop: 16,
    borderRadius: 12,
  },
  cardWrapper: {
    flex: 1,
  },
  card: {},
  cardTitle: {
    paddingLeft: 0,
  },
})

export default TabsHome
