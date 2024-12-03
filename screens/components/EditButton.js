import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { editLogic } from '../functions/EditDeleteBtnLogics';
import { useSharedState } from '../../hooks/useSharedState';

const EditButton = ({ style, id }) => {

  const { setTask, setIdOfUpdatingData, setUpdateMode } = useSharedState();

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <MaterialCommunityIcons 
          style={[styles.delete_button, style]}
          name='pen' 
          backgroundColor='#228B22' 
          size={40}  
          onPress={() => editLogic(id, setTask, setIdOfUpdatingData, setUpdateMode)}
        />
      </TouchableOpacity>
    </View>
  );
}

export default EditButton;

const styles = StyleSheet.create({
  delete_button : {
    width: '100%',
    padding: 2,
    textAlign: 'center'
  }
});