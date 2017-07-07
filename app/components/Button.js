import React, { PropTypes } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#22c0fc',
    borderRadius: 100,
  },
  title: {
    paddingLeft: 40,
    paddingRight: 40,
    color: '#22c0fc',
    fontFamily: 'Roboto',
    fontSize: 14,
  },
})

const Button = ({ title, onPress }) => (
  <TouchableHighlight
    underlayColor="#ffffff"
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View style={styles.root}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
    </View>
  </TouchableHighlight>
)

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
}

Button.defaultProps = {
  onPress: () => {},
}

export default Button
