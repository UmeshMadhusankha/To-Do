import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <View>
      <Text
        style={{
            fontSize: 75,
            fontWeight: 700,
            textAlign: 'center',
            marginTop: '50%'
        }}
      >To-Do</Text>
        <LottieView
            source={require('../../assets/Animation - 1735500321936.json')}
            autoPlay
            loop
            style={{ width: 200, height: 200, alignSelf: 'center' }}
        />
    </View>
  )
}

export default Loading