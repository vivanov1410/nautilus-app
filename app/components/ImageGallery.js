import React, { PropTypes, Component } from 'react'
import {
  View,
  Image,
  ListView,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

class ImageGallery extends Component {
  constructor(props) {
    super(props)
    this.refListView = null
  }

  componentDidMount() {
    this.refresh()
  }

  componentWillReceiveProps() {
    this.refresh()
  }

  refresh() {
    const { initialIndex, width } = this.props
    this.refListView.scrollTo({ x: initialIndex * width, animated: false })
  }

  handleRenderRow = (image) => {
    console.log(image)
    const { width, height } = this.props

    return (
      <Image
        style={{ width, height }}
        source={{ uri: image.url }}
        resizeMode="contain"
      />
    )
  }

  // handleScroll (e) {
  //   // TODO: do something here
  //   const event = e.nativeEvent
  // }

  renderScrollComponent = () => (
    <ScrollView
      contentContainerStyle={styles.scroll}
      horizontal
      pagingEnabled
      maximumZoomScale={3.0}
      directionalLockEnabled
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  )

  render() {
    return (
      <View style={styles.root}>
        <ListView
          renderScrollComponent={this.renderScrollComponent}
          // onScroll={this.handleScroll}
          dataSource={this.props.dataSource}
          style={styles.list}
          renderRow={this.handleRenderRow}
          ref={comp => (this.refListView = comp)}
          enableEmptySections
        />
      </View>
    )
  }
}

ImageGallery.propTypes = {
  dataSource: PropTypes.instanceOf(ListView.DataSource).isRequired,
  initialIndex: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
}

ImageGallery.defaultProps = {
  initialIndex: 0,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

export default ImageGallery
