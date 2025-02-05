import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import {
  DataTable,
  Card,
  ActivityIndicator,
  Menu,
  Button,
} from 'react-native-paper'

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

const CriteriaTable = () => {
  const [criterias, setCriterias] = useState<Criteria[]>([])
  const [loading, setLoading] = useState(true)
  const [sortAscending, setSortAscending] = useState<boolean>(true)
  const [sortByKecamatan, setSortByKecamatan] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(15)
  const [year, setYear] = useState<number | string | null>(2019)
  const [yearMenuVisible, setYearMenuVisible] = useState(false)
  const numberOfItemsPerPageList = [5, 10, 15]

  // this should be dynamically fetched from the API
  const years = [2017, 2018, 2019, '2019 Prediksi', 'Semua']

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

  const sortedCriterias = criterias
    .filter((item) => {
      if (year === 'Semua') {
        return true
      }
      return item.year.year === String(year)
    })
    .sort((a, b) => {
      // First, sort by district name
      const nameComparison = sortAscending
        ? a.district.name.localeCompare(b.district.name)
        : b.district.name.localeCompare(a.district.name)

      // If district names are equal, sort by year
      if (nameComparison === 0) {
        return sortAscending
          ? a.year.id - b.year.id // Ascending
          : b.year.id - a.year.id // Descending
      }

      return nameComparison
    })

  const from = page * itemsPerPage
  const to = Math.min((page + 1) * itemsPerPage, sortedCriterias.length)

  return (
    <Card>
      <Card.Title
        title="Histori Kasus"
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
        <ScrollView>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ width: 80 }}>No</DataTable.Title>
              <DataTable.Title
                sortDirection={
                  sortAscending && sortByKecamatan ? 'ascending' : 'descending'
                }
                onPress={() => {
                  setSortByKecamatan(true)
                  setSortAscending(!sortAscending)
                }}
                style={{ width: 120 }}
              >
                Kecamatan
              </DataTable.Title>
              <DataTable.Title style={{ width: 100 }}>Populasi</DataTable.Title>
              <DataTable.Title style={{ width: 100 }}>
                Total Kasus
              </DataTable.Title>
              <DataTable.Title style={{ width: 120 }}>Sanitasi</DataTable.Title>
              <DataTable.Title style={{ width: 120 }}>
                Air Bersih
              </DataTable.Title>
              <DataTable.Title style={{ width: 120 }}>
                Rumah Sehat
              </DataTable.Title>
              <DataTable.Title style={{ width: 80 }}>Tahun</DataTable.Title>
            </DataTable.Header>

            {sortedCriterias.slice(from, to).map((item, index) => (
              <DataTable.Row key={item.criteria.id}>
                <DataTable.Cell style={{ width: 80 }}>
                  {from + index + 1}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 120 }}>
                  {item.district.name}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}>
                  {item.criteria.total_population}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}>
                  {item.criteria.total_case}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 120 }}>
                  {item.criteria.sanitation_rate}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 120 }}>
                  {item.criteria.clean_water_rate}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 120 }}>
                  {item.criteria.safe_house_rate}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 80 }}>
                  {item.year.year}
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(sortedCriterias.length / itemsPerPage)}
              onPageChange={(newPage) => setPage(newPage)}
              label={`${from + 1}-${to} dari ${sortedCriterias.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
              showFastPaginationControls
              selectPageDropdownLabel="Data per halaman"
            />
          </DataTable>
        </ScrollView>
      </ScrollView>
    </Card>
  )
}

const styles = StyleSheet.create({
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
  },
})

export default CriteriaTable
