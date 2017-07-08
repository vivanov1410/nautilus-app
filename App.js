import React, { Component } from 'react'
import { StyleSheet, View, StatusBar, ListView } from 'react-native'

import Toolbar from './app/components/Toolbar'
import ImageGallery from './app/components/ImageGallery'
import Button from './app/components/Button'

import { shuffle, prettifyImages } from './app/utils'
import theme from './app/theme'
import config from './app/config'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
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
    fetch(config.images.url)
      .then(response => response.json())
      .then((json) => {
        const data = prettifyImages(json)
        this.setState({
          data,
          dataSource: this.state.dataSource.cloneWithRows(data),
        })
      })
      .done()
  }

  handleButtonClick = () => {
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
        <StatusBar backgroundColor={theme.colors.statusBar} />
        <Toolbar title="Nautilus" />
        <ImageGallery dataSource={this.state.dataSource} />
        <View style={styles.footer}>
          <Button title="Surprise me" onPress={this.handleButtonClick} />
        </View>
      </View>
    )
  }
}

export default App
