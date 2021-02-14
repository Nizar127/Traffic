import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, Animated, Dimensions, Platform, LayoutAnimation, UIManager, Slider } from 'react-native';
import {ActionSheet} from 'native-base';
import Icon from '@expo/vector-icons/Ionicons';
//import ActionSheet from 'react-native-actionsheet'
import {
    Container,
    Header,
    Content,
    View,
    Accordion,
    Card,
    Right,
    Label,
    Item,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    List,
    ListItem,
    Separator,
    Tabs,
    Tab,
    TabHeading,
    //ActionSheet,
    Button
} from 'native-base';
//import  ActionSheet from 'react-native-actionsheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
const dataArray = [
    { title: "Personal Bio", content: "Smart, Simple, Hardworking and Easy to adapt" },
    { title: "Skills", content: "Programming, Engineering, Mechanical, Design" },
    { title: "Experience", content: "Working with Creative World, Worked With Brandpacker Solution" },
    { title: "Personal Projects", content: "Develop app for ESports, Develop personal e-wallet app" },
    { title: "Education Background", content: "UITM, UIAM, Oracle Academy" },
    { title: "Interest", content: "Love to coding, loves science" },
    { title: "Achievement", content: "3 times Deans's list award" }
];



export default class UserProfile extends Component {


    constructor(props) {
        super(props);

        this.state = { expanded: false }
        // showActionSheet = () => {
        //   this.ActionSheet.show()
        // }

    }


    setExpanded(show) {
        this.setState({ expanded: show })
    }
    render() {
        if (
            Platform.OS === "android" &&
            UIManager.setLayoutAnimationEnabledExperimental
        ) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        return (
            <Container>
                <ScrollView>
                    <Header style={{ backgroundColor: 'white' }}>
                        <View style={{ marginTop: 13, marginEnd: 350 }}>
                            <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                        </View>
                    </Header>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <CardItem style={{ marginTop: 18 }} >
                            <Thumbnail large source={require('../../assets/cars.png')} style={{ alignSelf: 'center' }} />
                        </CardItem>
                        <View style={Style.rating}>
                            <Icon name="star" color="rgb(255, 56, 92)" />
                            <Icon name="star" color="rgb(255, 56, 92)" />
                            <Icon name="star" color="rgb(255, 56, 92)" />
                            <Icon name="star" color="rgb(255, 56, 92)" />
                            <Text style={Style.ratingLabel}>

                            </Text>
                        </View>
                        <CardItem>
                            <Text style={{ elevation: 10, fontWeight: 'bold', fontFamily: "CerealMedium", fontSize: 20 }}>Koez 20</Text>
                        </CardItem>
                        <CardItem>
                            <Text note><Icon name="md-pin" style={{ color: 'red' }} size={30} /> Kuala Terengganu, Malaysia</Text>
                        </CardItem>
                        <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>

                            <Button info style={{ borderRadius: 40, marginLeft: 10, elevation: 12 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 17, padding: 10 }}>Follow</Text>
                            </Button>

                        </View>
                        <Card style={{ flexDirection: 'column', marginTop: 15 }}>
                            <View style={Style.infoBoxWrapper}>
                                <View style={Style.infoBox}>
                                    <Label style={Style.text}>Job Done</Label>
                                </View>
                                <View style={Style.infoBox}>
                                    <Label style={Style.text}>Work Score</Label>
                                </View>
                                <View style={Style.infoBox}>
                                    <Label style={Style.text}>Speciality</Label>
                                </View>
                            </View>
                            <View style={Style.infoBoxWrapper}>
                                <View style={Style.infoBox}>
                                    <Label style={Style.textInfo}>100</Label>
                                </View>
                                <View style={Style.infoBox}>
                                    <Label style={Style.textInfo}>500</Label>
                                </View>
                                <View style={Style.infoBox}>
                                    <Label style={Style.textInfo}>Catering Multi-Function Staff</Label>
                                </View>
                            </View>
                        </Card>
                    </View>
                    <View>
                        <Content padder>
                            <Accordion icon="arrow-down-circle-outline" size={50} dataArray={dataArray} expandedIcon="arrow-up-circle-outline" style={{ width: 380, iconSize: 40, marginBottom: 20 }} />

                        </Content>

                    </View>

                </ScrollView>



            </Container>



        );
    }
}

const Style = StyleSheet.create({

    tab: {
        color: 'white',
        textShadowColor: 'black'
    },
    infoBoxWrapper: {

        borderTopColor: '#000000',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 70,
        marginBottom: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoBox: {
        width: '33%',
        alignItems: 'center',
        color: 'black',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 4
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'montserrat'
    },
    textInfo: {
        color: '#2B18FD',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'montserrat'

    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingLabel: {
        fontFamily: "CerealBook",
        marginLeft: 4,
    },
    btnWrapper: {
        margin: 25,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    requestBtn: {
        color: 'white',
        elevation: 30,
        borderRadius: 35

    },
    requestText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'montserrat',
    },
    followBtn: {
        // color: '#1D4AEE',
        color: 'red',
        elevation: 30,
        borderRadius: 35
    },
    followText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'montserrat',
    }
})