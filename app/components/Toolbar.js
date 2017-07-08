import React, { PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import theme from '../theme'

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    backgroundColor: theme.colors.primary,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: theme.fontFamily,
    fontSize: 20,
  },
})

const Toolbar = ({ title }) => (
  <View style={styles.root}>
    <Text style={styles.title}>{title}</Text>
  </View>
)

Toolbar.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Toolbar
