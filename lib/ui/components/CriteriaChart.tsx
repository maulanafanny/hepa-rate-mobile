import React, { useEffect, useState } from 'react'
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import {
  ActivityIndicator,
  Button,
  Card,
  Menu,
  useTheme,
} from 'react-native-paper'

const { width, height } = Dimensions.get('window')

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

const CriteriaChart = () => {
  const { colors } = useTheme()

  const [criterias, setCriterias] = useState<Criteria[]>([])
  const [loading, setLoading] = useState(true)

  const [year, setYear] = useState<number | string | null>(2019)
  const [yearMenuVisible, setYearMenuVisible] = useState(false)
  const years = [2017, 2018, 2019, '2019 Prediksi']

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

  const chartData = {
    labels: criterias
      .filter((el: Criteria) => el.year.year === String(year))
      .map((el: Criteria) => el.district.name),

    datasets: [
      {
        data: criterias
          .filter((el: Criteria) => el.year.year === String(year))
          .map((el: Criteria) => el.criteria.cluster_id + 1),
        colors: criterias
          .filter((el: Criteria) => el.year.year === String(year))
          .map((el: Criteria) => {
            if (el.criteria.cluster_id < 1) {
              return (opacity = 1) => `rgba(165, 214, 167, ${opacity})`
            } else if (el.criteria.cluster_id < 2) {
              return (opacity = 1) => `rgba(255, 195, 0, ${opacity})`
            } else {
              return (opacity = 1) => `rgba(239, 83, 80, ${opacity})`
            }
          }),
      },
    ],
  }

  return (
    <Card>
      <Card.Title
        title="Grafik Kerawanan"
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

      <ScrollView horizontal>
        <Card.Content
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <BarChart
            data={chartData}
            width={width * 2}
            height={height - 250}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: colors.background,
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              decimalPlaces: 0,
              color: () => colors.secondary,
              labelColor: () => colors.secondary,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            flatColor
            withCustomBarColorFromData
            verticalLabelRotation={30}
            fromZero
            showValuesOnTopOfBars
          />
        </Card.Content>
      </ScrollView>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
  },
})

export default CriteriaChart
