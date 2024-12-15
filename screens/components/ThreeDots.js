import { View, Text, TouchableWithoutFeedback, Modal, Pressable, Button } from 'react-native'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { seeStoredData } from '../functions/SeeDataBtn';
import { clearStorage } from '../functions/ClearHistoryBtn';
import { useDispatch } from 'react-redux';

const ThreeDots = ({customName, navigation}) => {

    const dispatch = useDispatch();

    const [shown,setShown] = useState(false);
    const [isPressed,setIsPressed] = useState(false);
    const tasks = useSelector((state) => state.tasks);

    const navigateFunction = () => {
        if (customName == 'See History') {
            navigation.navigate('To-Do');
        } else {
            navigation.navigate('today');
        }
    }

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
                <Pressable
                    style={[styles.btn, isPressed && styles.btn_pressed]}
                    onPress={() => navigateFunction()}
                >
                    <Text style={styles.button_text}>{customName}</Text>
                </Pressable>
                <Pressable 
                    style={[styles.btn, isPressed && styles.btn_pressed]}
                    onPress={() => clearStorage(dispatch)}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                >
                    <Text style={styles.button_text}>Clear History</Text>
                </Pressable>
                <Button title="See data" onPress={() => {seeStoredData(tasks)}}></Button>
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
    btn: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 10
    },
    btn_pressed: {
        backgroundColor: '#fff'
    },
    button_text: {
        fontWeight: 700,
        textAlign: 'center'
    },
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
        backgroundColor: '#ccc',
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