import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { Surface, List, ActivityIndicator, Text } from 'react-native-paper'

import { styles as defaultStyles } from '@/lib/ui'

type Article = {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

const Information = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          'https://hepa-rate-api.vercel.app/api/article',
        )
        const data = await response.json()
        setArticles(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching articles:', error)
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <Surface style={[defaultStyles.screen]}>
        <ActivityIndicator animating />
      </Surface>
    )
  }

  return (
    <Surface style={[styles.screen]}>
      <ScrollView>
        <List.Section
          title="Informasi Umum Hepatitis A"
          titleStyle={{ fontWeight: 'bold' }}
        >
          {articles.length > 0 ? (
            articles.map((article) => (
              <List.Accordion key={article.id} title={article.title}>
                <Text style={styles.content}>{article.content}</Text>
                <Text style={styles.date}>
                  Dibuat pada:{' '}
                  {new Date(article.createdAt).toLocaleDateString()}
                </Text>
              </List.Accordion>
            ))
          ) : (
            <Text>No articles available</Text>
          )}
        </List.Section>
      </ScrollView>
    </Surface>
  )
}

const styles = {
  screen: {
    flex: 1,
  },
  content: {
    padding: 10,
    fontSize: 14,
    lineHeight: 20,
  },
  date: {
    padding: 10,
    fontSize: 12,
    color: 'gray',
  },
}

export default Information
