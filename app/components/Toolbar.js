import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#22c0fc',
  },
  title: {
    color: '#ffffff',
    fontFamily: 'Roboto',
    fontSize: 20,
  }
})

const Toolbar = ({ title }) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Toolbar
