import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { editLogic } from '../functions/EditDeleteBtnLogics';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
//import { useSharedState } from '../../hooks/useSharedState';

const EditButton = ({ style, id, isLong }) => {

  let dispatch = useDispatch();
  let navigation = useNavigation();

  //const { setTask, setIdOfUpdatingData, setUpdateMode } = useSharedState();

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <MaterialCommunityIcons 
          style={[styles.delete_button, style]}
          name='pen' 
          size={30}  
          onPress={() => editLogic(longTask = isLong, idOfUpdatingData = id, navigation = navigation, dispatch = dispatch)}
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