import React, { Component } from 'react'
import { StyleSheet, View, StatusBar, ListView } from 'react-native'

import Toolbar from './app/components/Toolbar'
import ImageGallery from './app/components/ImageGallery'
import Button from './app/components/Button'

import { shuffle } from './app/utils'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
})

class App extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    })
    this.state = {
      dataSource: dataSource.cloneWithRows([]),
    }
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    fetch('http://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then((json) => {
        let width = 200
        let height = 200
        const data = json.map((x) => {
          width += 1
          if (width === 400) {
            width = 200
            height += 1
          }

          return {
            ...x,
            url: `https://source.unsplash.com/random/${width}x${height}`,
            width,
            height,
          }
        })
        // const data = json
        this.setState({
          data,
          dataSource: this.state.dataSource.cloneWithRows(data),
        })
      })
      .done()
  }

  randomize() {
    const { data, dataSource } = this.state
    const shuffledData = shuffle(data)
    this.setState({
      data: shuffledData,
      dataSource: dataSource.cloneWithRows(shuffledData),
    })
  }

  render() {
    return (
      <View style={styles.root}>
        <StatusBar backgroundColor="#1EACE2" />
        <Toolbar title="Nautilus" />
        <ImageGallery dataSource={this.state.dataSource} />
        <View style={styles.footer}>
          <Button title="Surprise me" onPress={() => this.randomize()} />
        </View>
      </View>
    )
  }
}

export default App
