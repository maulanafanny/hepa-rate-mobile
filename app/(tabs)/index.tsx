import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Surface, Text, Card } from 'react-native-paper'

const TabsHome = () => (
  <Surface style={[styles.screen]}>
    <Text style={styles.title}>
      {`Visualisasi Spasial Temporal Tingkat Kerawanan Hepatitis-A Kabupaten Pacitan`.toUpperCase()}
    </Text>

    <Card style={styles.fullWidthCard} mode="elevated" elevation={5}>
      <Card.Content>
        <View style={styles.cardContainer}>
          <Card style={styles.card} mode="contained">
            <Card.Content>
              <Card.Title
                title="Pemetaan Kerawanan"
                style={styles.cardTitle}
                titleStyle={{ fontWeight: 'bold', textAlign: 'center' }}
              />
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={styles.image}
              />
            </Card.Content>
          </Card>

          <Card style={styles.card} mode="contained">
            <Card.Content>
              <Card.Title
                title="Grafik Kerawanan"
                style={styles.cardTitle}
                titleStyle={{ fontWeight: 'bold', textAlign: 'center' }}
              />
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={styles.image}
              />
            </Card.Content>
          </Card>

          <Card style={styles.card} mode="contained">
            <Card.Content>
              <Card.Title
                title="Histori Kasus"
                style={styles.cardTitle}
                titleStyle={{ fontWeight: 'bold', textAlign: 'center' }}
              />
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={styles.image}
              />
            </Card.Content>
          </Card>

          <Card style={styles.card} mode="contained">
            <Card.Content>
              <Card.Title
                title="Informasi Hepatitis-A"
                style={styles.cardTitle}
                titleStyle={{ fontWeight: 'bold', textAlign: 'center' }}
              />
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={styles.image}
              />
            </Card.Content>
          </Card>
        </View>
      </Card.Content>
    </Card>
  </Surface>
)

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
  card: {
    width: '48%',
    marginTop: 16,
  },
  cardTitle: {
    paddingLeft: 0,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
})

export default TabsHome
