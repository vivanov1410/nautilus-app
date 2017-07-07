import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar, ListView } from 'react-native'

import Toolbar from './app/components/Toolbar'
import ImageGallery from './app/components/ImageGallery'
import Button from './app/components/Button'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  }
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
      .then(json => {
        // const data = json.map((x, i) => ({ ...x, url: `https://source.unsplash.com/random/${i+500}x${i+500}` }))
        const data = json
        this.setState({
          data,
          dataSource: this.state.dataSource.cloneWithRows(data),
        })
      })
      .done()
  }

  randomize() {
    const shuffle  = (arr) => {
    	const tmp = [...arr]
      const result = []
      const inner = () => {
        if(tmp.length === 0) return result
        const randomIndex = Math.floor(Math.random() * tmp.length)
        result.push(tmp[randomIndex])
        tmp.splice(randomIndex, 1)

        return inner()
      }
      inner()

      return result
    }

    const { data, dataSource } = this.state
    const shuffledData = shuffle(data)
    this.setState({
      data: shuffledData,
      dataSource: dataSource.cloneWithRows(shuffledData)
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
