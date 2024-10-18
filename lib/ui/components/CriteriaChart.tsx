import React from 'react'
import { View, Dimensions, Text, StyleSheet, ScrollView } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import { useTheme } from 'react-native-paper'

const { width, height } = Dimensions.get('window')

interface CriteriaChartProps {
  dataValues: number[]
}

const CriteriaChart: React.FC<CriteriaChartProps> = ({ dataValues }) => {
  const { colors } = useTheme()

  const labels = [
    'Arjosari',
    'Bandar',
    'Donorojo',
    'Kebonagung',
    'Nawangan',
    'Ngadirojo',
    'Pacitan',
    'Pringkuku',
    'Punung',
    'Sudimoro',
    'Tegalombo',
    'Tulakan',
  ]

  const chartData = {
    labels,
    datasets: [
      {
        data: dataValues,
        colors: dataValues.map((value) => {
          if (value < 2) {
            return (opacity = 1) => `rgba(165, 214, 167, ${opacity})`
          } else if (value < 3) {
            return (opacity = 1) => `rgba(255, 195, 0, ${opacity})`
          } else {
            return (opacity = 1) => `rgba(199, 0, 57, ${opacity})`
          }
        }),
      },
    ],
  }

  return (
    <ScrollView horizontal>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.secondary }]}>
          Tingkat Kerawanan
        </Text>
        <BarChart
          data={chartData}
          width={width * 2}
          height={height - 300}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: colors.background,
            backgroundGradientFrom: colors.background,
            backgroundGradientTo: colors.background,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})

export default CriteriaChart
