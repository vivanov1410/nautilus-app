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
    backgroundColor: '#FFFFFF',
  },
  listView: {
    flex: 1,
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
    const { width, height, imageStyle } = this.props
    const imageHeight = height

    return (
      <Image
        style={[imageStyle, { width, height: imageHeight }]}
        source={{ uri: image.url }}
        resizeMode="contain"
      />
    )
  }

  // handleScroll (e) {
  //   // TODO: do something here
  //   const event = e.nativeEvent
  // }

  renderScrollComponent = props => (
    <ScrollView
      horizontal
      pagingEnabled
      maximumZoomScale={3.0}
      directionalLockEnabled
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...props}
    />
  )

  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <ListView
          renderScrollComponent={this.renderScrollComponent}
          // onScroll={this.handleScroll}
          dataSource={this.props.dataSource}
          style={styles.listView}
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
  style: View.propTypes.style,
  imageStyle: View.propTypes.style,
  width: PropTypes.number,
  height: PropTypes.number,
}

ImageGallery.defaultProps = {
  initialIndex: 0,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  style: [],
  imageStyle: [],
}

export default ImageGallery
