import React, { useContext } from "react";
import { View,FlatList,Text } from "react-native";
import {CallingContextType} from '../../types/callingContextTypes';
import {CallingContext} from '../../contextApi/CallingContext';

export interface IUser {
  connected: boolean;
  username: string;
}


const Item = ({data}: {data: IUser}) => (
  <View
    style={{
      backgroundColor: '#eeeeee',
      borderRadius: 10,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    }}>
    <Text style={{fontSize: 24}}>UserName: {data.username}</Text>
    {data.connected ? (
      <Text style={{fontSize: 14}}>online</Text>
    ) : (
      <Text style={{fontSize: 14}}>offline</Text>
    )}
  </View>
);


const UserList =()=>{
    const {allUsers} = useContext(CallingContext) as CallingContextType;
    console.log('===>', allUsers);
    

    
    
    
    return (
      <View>
        <FlatList
          data={allUsers}
          renderItem={({item}) => <Item data={item} />}
        //   keyExtractor={(item: IUser) => item.id}
        />
      </View>
    );
}
export default UserList