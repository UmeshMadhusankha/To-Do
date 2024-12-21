import { View, Text, TouchableWithoutFeedback, Modal, Pressable, Button, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { seeStoredData } from '../functions/SeeDataBtn';
import { clearStorage } from '../functions/ClearHistoryBtn';
import { useDispatch } from 'react-redux';

const ThreeDots = ({customName, customName2, navigation}) => {

    const dispatch = useDispatch();

    const [shown,setShown] = useState(false);
    const [isPressed,setIsPressed] = useState(false);
    const tasks = useSelector((state) => state.tasks);
    const longTasks = useSelector((state) => state.longTermTasks);

    const navigateFunction = () => {
        if (customName == 'See History') {
            navigation.navigate('To-Do');
        } 
        else if (customName == 'Long Term Tasks') {
            navigation.navigate('long');
        }
        else {
            navigation.navigate('today');
        }
    }

    const navigateFunction2 = () => {
        if (customName2 == 'Long Term Tasks') {
            navigation.navigate('long');
        }
        else if (customName2 == 'To-Do') {
            navigation.navigate('To-Do');
        } 
        else {
            navigation.navigate('today');
        }
    }

    const showAlert = () => {
        Alert.alert(
            'Are You Sure?',
            'Do you want to remove all of your tasks from the storage?',
            [
                {
                    text: 'Yes',
                    onPress: () => clearStorage(dispatch)
                },
                {
                    text: 'No',
                }
            ],
            {cancelable: true}
        )
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
                <TouchableOpacity
                    style={[styles.btn]}
                    onPress={() => navigateFunction()}
                >
                    <Text style={styles.button_text}>{customName}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn]}
                    onPress={() => navigateFunction2()}
                >
                    <Text style={styles.button_text}>{customName2}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.btn]}
                    onPress={() => showAlert()}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                >
                    <Text style={styles.button_text}>Clear History</Text>
                </TouchableOpacity>
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

// Removed the See Data button to deliver the production
//<Button title="See data" onPress={() => {seeStoredData(tasks,longTasks)}}></Button>

export default ThreeDots

const styles = {
    btn: {
        backgroundColor: '#ddd',
        padding: 12,
        borderRadius: 10,
    },
    // clear_pressed: {
    //     backgroundColor: '#fff'
    // },
    // screen1_pressed: {
    //     backgroundColor: '#fff'
    // },
    // screen2_pressed: {
    //     backgroundColor: '#fff'
    // },
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
        backgroundColor: 'transparent',
        marginRight: 2,
        borderRadius: 10,
        width: '150',
        height: '100%',
        position: 'absolute'
    },
    mod_correct: {
        width: '100%',
        height: '100%'
    }
}