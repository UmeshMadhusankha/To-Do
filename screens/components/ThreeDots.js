import { View, Text, TouchableWithoutFeedback, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ThreeDots = () => {

    const [shown,setShown] = useState(false);

  return (
    <View>
        <View style={styles.dot}>
            <Pressable onPress={() => setShown(!shown)}
            >
                <MaterialCommunityIcons 
                    name='dots-vertical'
                    size={25}
                />
            </Pressable>
        </View>
      
      <Modal
        visible={shown}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setShown(false)}
      >
        <View style={styles.overlay}>
            <Pressable 
                style={styles.mod_correct}
                onPress={() => setShown(false)}
            />
            <View style={styles.opts}>

            </View>
        </View>
        <Pressable 
            style={styles.mod_correct}
            onPress={() => setShown(false)}
        />
      </Modal>
    </View>
  )
}

export default ThreeDots

const styles = {
    dot: {
        width: '30',
        zIndex: 5
    },
    overlay: {
        width: '100%',
        height: 150,
        position: 'relative',
        top: 25,
        display: 'flex',
        alignItems: 'flex-end',
        zIndex: 1    
    },
    opts: {
        backgroundColor: 'blue',
        marginRight: 2,
        borderRadius: 10,
        width: '125',
        height: '100%',
        position: 'absolute'
    },
    mod_correct: {
        width: '100%',
        height: '100%'
    }
}