import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import MapView, { Polygon, PROVIDER_GOOGLE } from 'react-native-maps'
import {
  ActivityIndicator,
  Button,
  Card,
  Menu,
  Surface,
  Text,
} from 'react-native-paper'

import pacitanGeoJSON from '@/assets/pacitan.json'

const { height } = Dimensions.get('window')

type Criteria = {
  criteria: {
    id: number
    total_case: number
    total_population: number
    sanitation_rate: number
    clean_water_rate: number
    safe_house_rate: number
    cluster_id: number
    district_id: number
    year_id: number
    createdAt: Date
    updatedAt: Date
  }
  district: {
    id: number
    name: string
  }
  year: {
    id: number
    year: string
    is_stale: number
  }
}

const CriteriaMap = () => {
  const [criterias, setCriterias] = useState<Criteria[]>([])
  const [loading, setLoading] = useState(true)

  const years = [2017, 2018, 2019, '2019 Prediksi']
  const [year, setYear] = useState<number | string | null>(2019)
  const [yearMenuVisible, setYearMenuVisible] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api_url = 'https://hepa-rate-api.vercel.app/api'
        const uri = `${api_url}/criteria`
        const response = await fetch(uri)
        const result = await response.json()
        setCriterias(result)
      } catch (error) {
        console.error('Error fetching data: ', error)
      } finally {
        setLoading(false)
      }
    }

    if (year) {
      fetchData()
    }
  }, [year])

  if (loading) {
    return <ActivityIndicator size="large" />
  }

  const getColorByDistrictId = (id: number) => {
    const cluster = criterias
      .filter((el) => el.year.year === String(year))
      .find((el) => el.district.id === Number(id))?.criteria.cluster_id

    switch (cluster) {
      case 0:
        return 'rgba(118, 255, 3, 0.4)' // low
      case 1:
        return 'rgba(255, 195, 0, 0.4)' // mid
      case 2:
        return 'rgba(239, 83, 80, 0.4)' // high
      default:
        return 'rgba(0, 0, 0, 0.5)'
    }
  }

  return (
    <Card style={styles.card}>
      <Card.Title
        title="Pemetaan Kerawanan"
        titleStyle={{
          fontWeight: 'bold',
          paddingRight: 0,
        }}
      />

      <View style={styles.dropdownContainer}>
        <Menu
          visible={yearMenuVisible}
          onDismiss={() => setYearMenuVisible(false)}
          anchor={
            <Button
              onPress={() => setYearMenuVisible(true)}
              icon={yearMenuVisible ? 'chevron-up' : 'chevron-down'}
              contentStyle={{ flexDirection: 'row-reverse' }}
            >
              {year ? year : 'Pilih Tahun'}
            </Button>
          }
        >
          <Menu.Item title="Pilih Tahun" disabled />
          {years.map((yearOption) => (
            <Menu.Item
              key={yearOption}
              onPress={() => {
                setYear(yearOption)
                setYearMenuVisible(false)
              }}
              title={yearOption.toString()}
            />
          ))}
        </Menu>
      </View>

      <Card.Content style={styles.cardContent}>
        <Surface style={{ borderRadius: 16, overflow: 'hidden' }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={(styles.map, { height: height - 322 })}
            initialRegion={{
              latitude: -8.2,
              longitude: 111.2,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
          >
            {pacitanGeoJSON.features.map((district, index) => (
              <Polygon
                key={index}
                coordinates={district.geometry.coordinates[0][0].map(
                  ([lng, lat]) => ({
                    latitude: lat,
                    longitude: lng,
                  }),
                )}
                fillColor={getColorByDistrictId(district.properties.State_Code)}
                strokeColor="rgba(0, 0, 0, 0.5)"
                strokeWidth={2}
              />
            ))}
          </MapView>
        </Surface>

        <Surface
          style={{
            ...styles.legend,
            backgroundColor: 'white',
            opacity: 0.9,
          }}
        >
          <Text style={styles.legendItem}>
            <Text style={{ color: 'rgba(239, 83, 80, 1)' }}>● </Text> Tinggi
          </Text>
          <Text style={styles.legendItem}>
            <Text style={{ color: 'rgba(255, 195, 0, 1)' }}>● </Text> Sedang
          </Text>
          <Text style={styles.legendItem}>
            <Text style={{ color: 'rgba(118, 255, 3, 1)' }}>● </Text> Rendah
          </Text>
        </Surface>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cardContent: {
    borderRadius: 12,
  },
  map: {
    width: '100%',
    borderRadius: 12,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
  },
  legend: {
    position: 'absolute',
    bottom: 36,
    right: 26,
    padding: 10,
    borderRadius: 8,
    elevation: 3, // Shadow effect on Android
  },
  legendItem: {
    fontSize: 14,
    marginVertical: 2,
    color: 'rgba(0, 0, 0, 0.6)',
  },
})

export default CriteriaMap
