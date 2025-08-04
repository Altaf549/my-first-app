import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, Image, ActivityIndicator } from 'react-native';

interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
}

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const renderItem = ({ item }: { item: Country }) => (
    <View style={styles.countryCard}>
      <Image 
        source={{ uri: item.flags.png }} 
        style={styles.flag} 
        resizeMode="contain"
        alt={item.flags.alt || `${item.name.common} flag`}
      />
      <View style={styles.countryInfo}>
        <Text style={styles.countryName}>{item.name.common}</Text>
        <Text style={styles.capital}>
          {item.capital ? item.capital[0] : 'No capital'}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>Countries of the World</Text>
      <FlatList
        data={countries}
        renderItem={renderItem}
        keyExtractor={(item) => item.name.official}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },
  list: {
    padding: 10,
  },
  countryCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flag: {
    width: 60,
    height: 40,
    borderRadius: 4,
  },
  countryInfo: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  countryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  capital: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});

export default App;
