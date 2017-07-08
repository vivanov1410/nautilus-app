import React, { PropTypes, Component } from 'react'
import {
  View,
  Image,
  ListView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native'

import { calculateDiagonalAngle } from '../utils'
import theme from '../theme'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  list: {
    flex: 1,
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
    const { width, height } = this.props
    const deg = calculateDiagonalAngle(image.width, image.height)
    const padding = 5
    const containerStyle = {
      width,
      height,
      paddingLeft: padding,
      paddingRight: padding,
    }
    const imageStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      width: width - (padding * 2),
      height,
      borderColor: 'rgba(34, 192, 252, 0.4)',
      borderWidth: 2,
      borderRadius: 7,
      elevation: 3,
    }
    const titleStyle = {
      transform: [{ rotate: `${deg}deg` }],
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: theme.fontFamily,
    }

    return (
      <View style={containerStyle}>
        <Image
          style={imageStyle}
          source={{ uri: image.url }}
          resizeMode="cover"
          borderRadius={5}
        >
          <Text style={titleStyle}>{image.title}</Text>
        </Image>
      </View>
    )
  }

  renderScrollComponent = props => (
    <ScrollView
      contentContainerStyle={styles.scroll}
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
      <View style={styles.root}>
        <ListView
          renderScrollComponent={this.renderScrollComponent}
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
  height: 400,
}

export default ImageGallery
