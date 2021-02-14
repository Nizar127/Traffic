import React, { Component } from 'react';
//import { removeStudent } from '../services/DataService';
import { StyleSheet, Alert, FlatList, View, ActivityIndicator } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, TabHeading, Tabs, Text, List, ListItem, Left, Right, Header, Body } from 'native-base';
import {auth, firestore, storage,db} from '../config/Firebase';
import SubmittedHiring from './SubmittedHiring';
import SuccessHiring from './SuccessHiring';


//let job = db.ref('/Job');

export default class HiringStatus extends Component {
    constructor() {
        super();
    }




    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (

            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <View style={{ marginTop: 13, marginEnd: 350 }}>
                        <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                    </View>

                </Header>

                <Header hasTabs/>

                <Content padder>
                    <Text style={{ textAlign: "center", fontSize:22,height: 40, fontWeight: "bold", marginTop: 20 }}>Hiring Status</Text>
                    <Tab heading={ <TabHeading><Text style={{color:'#0D56F2'}}>In Progress</Text></TabHeading>}>
                             <SubmittedHiring />
                        </Tab>
                         <Tab heading={ <TabHeading><Text style={{color:'#2CF20D'}}>Success</Text></TabHeading>}>
                             <SuccessHiring />
                        </Tab>
                   
                </Content>



               

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
