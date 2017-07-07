import React, { PropTypes, Component } from 'react';
import {
  View,
  Image,
  ListView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
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
  static propTypes = {
    dataSource: PropTypes.instanceOf(ListView.DataSource).isRequired,
    initialIndex: PropTypes.number,
    renderScrollComponent: PropTypes.func,
    style: View.propTypes.style,
    imageStyle: View.propTypes.style,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  static defaultProps = {
    initialIndex: 0,
    renderScrollComponent: (props) => <ScrollView {...props} />,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };

  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
    this.renderScrollComponent = this.renderScrollComponent.bind(this)
    this._refListView = null
  }

  componentDidMount() {
    this.refresh()
  }

  componentWillReceiveProps() {
    this.refresh()
  }

  handleRenderRow = (image) => {
    const { width, height, imageStyle } = this.props
    let imageHeight = height

    return (
      <Image
        style={[imageStyle, { width, height: imageHeight }]}
        source={{uri: image.url}}
        resizeMode="contain"
      />
    )
  }

  refresh() {
    const { initialIndex, width } = this.props
    this._refListView.scrollTo({ x: initialIndex * width, animated: false })
  }

  handleScroll(e) {
    // TODO: do something herex
    const event = e.nativeEvent
  }

  renderScrollComponent(props) {
    return React.cloneElement(
      this.props.renderScrollComponent(props),
      {
        horizontal: true,
        pagingEnabled: true,
        maximumZoomScale: 3.0,
        directionalLockEnabled: true,
        showsVerticalScrollIndicator: false,
        showsHorizontalScrollIndicator: false,
        ...props,
      })
  }

  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <ListView
          renderScrollComponent={this.renderScrollComponent}
          onScroll={this.handleScroll}
          dataSource={this.props.dataSource}
          style={styles.listView}
          renderRow={this.handleRenderRow}
          ref={comp => { this._refListView = comp; return; }}
          enableEmptySections
        />
      </View>
    )
  }
}

export default ImageGallery
