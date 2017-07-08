import React, { PropTypes } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

import theme from '../theme'

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 100,
  },
  title: {
    paddingLeft: 40,
    paddingRight: 40,
    color: theme.colors.primary,
    fontFamily: theme.fontFamily,
    fontSize: 14,
  },
})

const Button = ({ title, onPress }) => (
  <TouchableHighlight
    underlayColor="#FFFFFF"
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
