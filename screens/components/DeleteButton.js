import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { deleteLogic } from '../functions/EditDeleteBtnLogics';
import { useDispatch } from 'react-redux';

const DeleteButton = ({ style, id }) => {

  let dispatch = useDispatch();
  console.log("Clicked")

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <MaterialCommunityIcons 
          style={[styles.delete_button, style]}
          name='trash-can' 
          size={30}
          onPress={() => deleteLogic(id,dispatch)}  
        />
      </TouchableOpacity>
    </View>
  );
}

export default DeleteButton;

const styles = StyleSheet.create({
  delete_button : {
    width: '100%',
    padding: 2,
    textAlign: 'center'
  }
});