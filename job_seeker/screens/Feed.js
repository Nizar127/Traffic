import React, { Component } from 'react';
import { StyleSheet, Share, BackHandler, LayoutAnimation, Image, Animated, Alert, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Header, TabHeading, View, Card, Tab, Form, Item, Input, CardItem, Label, Thumbnail, Text, Left, Body, Button, Right, Fab, Separator, Content, Footer, FooterTab, Textarea } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import {db, auth, storage, firestore} from '../../config/Firebase';


export default class Feed extends Component {

    constructor() {
        super();
        this.hireRef = firestore.collection('Hiring');
        this.userRef = firestore.collection('Users');
        this.applyRef = firestore.collection('Job_list');
        this.state = {
            show: true,
            jobs: [],
            job_id: '',
            userID: '',
            username: '',
            applyID: '',
            jobname: '',
            ///userId: '',
            isVisible: false,
            skills: '',
            workexperience: '',
            profileImage: '',
            selfdescription: '',
            key: '',
            url: '',
            job_seeker_name: '',
            jobCreatorID: '',
            jobCreatorName: '',
            jobDescription: '',
            job_seekerImage: '',
            jobWorkType: '',
            job_seeker_salary: '',
            job_qualification: '',
            searchText: '',
            searchList: []

        };

    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'This temporary job is incredible! Check out other tons more of similar job here at TempJob. Share it with your family and friends',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };


    static navigationOptions = {
        title: 'Feed',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-compass" style={{ color: tintColor }} size={20} />
        ),
        headerTitle: {
            title: 'GET-THE-JOB'
        },
        headerStyle: {
            backgroundColor: '#f45fff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
    //show modal
    displayModal(show) {
        this.setState({ isVisible: show })
    }


    componentDidMount() {

        this.unsubscribe = this.applyRef.onSnapshot(this.getCollection);
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }

    handleBackButtonPressAndroid = () => {
        if (!this.props.navigation.isFocused()) {
            // The screen is not focused, so don't do anything
            return false;
        }

        if (this.isSelectionModeEnabled()) {
            this.disableSelectionMode();

            // We have handled the back button
            // Return `true` to prevent react-navigation from handling it
            return true;
        } else {
            return false;
        }
    };

    getCollection = (querySnapshot) => {
        const jobs = [];
        querySnapshot.forEach((res) => {
            const { jobname, uniqueId, experience, qualification,  jobCreatorname, jobdesc, worktype, url, salary, peoplenum,} = res.data();
            jobs.push({
                key: res.id,
                res,
                jobCreatorname,
                jobname,
                uniqueId,
                jobdesc,
                url,
                worktype,
                salary,
                peoplenum,
                experience,
                qualification
            });
        });
        this.setState({
            jobs,
            isLoading: false
        })
    }




    setSkills = (value) => {
        this.setState({ ...this.state, skills: value })
    }

    setSelfDescription = (value) => {
        this.setState({ ...this.state, selfdescription: value })
    }

    setAnimation = () => {
        LayoutAnimation.configureNext({
            duration: 250,
            update: {
                type: LayoutAnimation.Types.easeIn,
                springDamping: 0.7,
            },
        });
        LayoutAnimation.configureNext({
            duration: 500,
            create: {
                type: LayoutAnimation.Types.easeIn,
                property: LayoutAnimation.Properties.scaleXY,
                springDamping: 0.7,
            },
        });
    };

    removeItem = (key) => {
        const { cards } = this.state;
        this.setAnimation();
        this.setState({
            cards: cards.slice().filter(card => card.key !== key),
        });
    };



    sendApplication = (id) => {



        let dbref = firestore.collection('Job_list').doc(id).get();
        dbref.then(doc => {
            this.setState({
                ...this.state,
                uid: doc.get('uid'),
                //job_seeker_name: doc.get('username'),
                job_id: doc.get('id'),
                jobCreatorID: doc.get('uid'),
                jobCreatorName: doc.get('jobCreatorname'),
                jobDescription: doc.get('jobdesc'),
                job_seekerImage: doc.get('url'),
                jobname: doc.get('jobname'),
                jobWorkType: doc.get('worktype'),
                workExperience: doc.get('experience'),
                job_seeker_salary: doc.get('salary'),
                job_qualification: doc.get('qualification')
            }, () => {

                console.log("state", this.state)
                console.log("auth.currentUser", auth.currentUser)



                if ( this.state.skills && this.state.selfdescription) {

                    this.hireRef.add({
                        userID: auth.currentUser.uid,
                        job_seeker_name: auth.currentUser.displayName,
                        jobCreatorID: this.state.jobCreatorID,
                        jobCreatorName: this.state.jobCreatorName,
                        jobDescription: this.state.jobDescription,
                        job_seekerImage: this.state.job_seekerImage,
                        jobName: this.state.jobname,
                        job_seekerSalary: this.state.job_seeker_salary,
                        jobWorkType: this.state.jobWorkType,                
                        job_qualification: this.state.job_qualification,
                        jobExperience: this.state.workExperience,
                        ref_skills: this.state.skills,
                        ref_selfDescribe: this.state.selfdescription


                    }).then((res) => {
                        this.setState({
                            skills: '',
                            selfdescription: '',
                        });
                        Alert.alert('Congrats!', 'Your Application Has Been Send To The Job Creator');
                        this.displayModal(!this.state.isVisible);
                        //this.removeItem(this.state.key);
                    })

                        .catch((err) => {
                            console.error("Error found: ", err);

                        });
                }
            });

        });

    }


    render() {

        return (

                    <View style={{ flex: 1, }}>

                        <Container>

                            <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 10, fontSize: 23, fontFamily: "CerealMedium", elevation: 10 }}>List of Available Job</Text>

                            <Modal
                                animationType={"slide"}
                                transparent={false}
                                visible={this.state.isVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has now been closed.');
                                }}>

                                <Thumbnail
                                    source={{ uri: this.state.profileImage }}
                                    style={Style.image} />


                                <Item style={Style.inputGroup} fixedLabel last>
                                    <Label> Describe Yourself</Label>
                                    <Input style={Style.inputText} onChangeText={this.setSelfDescription} />
                                </Item>

                                <Item style={Style.inputGroup} fixedLabel last>
                                    <Label>Related Skills</Label>
                                    <Input style={Style.inputText} onChangeText={this.setSkills} />
                                </Item>


                                <Text
                                    style={Style.closeText}
                                    onPress={() => {
                                        this.displayModal(!this.state.isVisible);
                                    }}><Icon name="md-close" size={50} />
                                </Text>

                                <Button success style={Style.addButton} onPress={() => this.sendApplication(this.state.key)}>
                                    <Text>Submit</Text>
                                </Button>
                            </Modal>

                            <View style={{ flex: 1, padding: 10, marginBottom: 10, backgroundColor: '#242836' }}>


                                <FlatList
                                    data={this.state.jobs}
                                    //contentContainerStyle={{ flexGrow: 1 }}
                                    renderItem={({ item, index }) => {
                                        return (

                                            <Card key={index} style={Style.listing}>
                                                <CardItem><Text style={Style.text_title}>{item.worktype}</Text></CardItem>
                                                <CardItem cardBody bordered button onPress={() => this.props.navigation.navigate('FeedDetail', {
                                                    userkey: item.key
                                                })}>
                                                    <Image source={{ uri: item.url }} style={{ height: 200, width: null, flex: 1 }} />
                                                </CardItem>
                                                <CardItem style={{ flexDirection: 'row' }}>
                                                    <Body>
                                                        <Text style={Style.text_header}>{item.jobname}</Text>
                                                    </Body>
                                                    <Button style={Style.startRouteBtn} onPress={this.onShare}>
                                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Share</Text>
                                                    </Button>
                                                </CardItem>

                                                <CardItem>
                                                    <Text style={{color:'#0D79F2'}}>{item.jobCreatorname}</Text>
                                                </CardItem>
                                                <CardItem style={Style.jobDesc}>
                                                    <Text style={{fontWeight: 'bold', fontSize:13}}>Experience Required:</Text>
                                                   
                                                </CardItem>
                                                <View>
                                            
                                                        <Text>{item.experience}</Text>
                                                    
                                                </View>
                                                <CardItem style={Style.jobDesc}>
                                                    <Text style={{fontWeight: 'bold', fontSize:13}}>Qualification Required:</Text>
                                                   
                                                </CardItem>
                                                <View>
                                                    <Text>{item.qualification}</Text>
                                                </View>
                                                <CardItem >
                                                    <Text style={Style.text_price}>RM  {item.salary}/job</Text>
                                                </CardItem>
                                                <CardItem style={{ justifyContent: 'center' }}>

                                                    <Button rounded primary onPress={() => { this.setState({ key: item.key }), this.displayModal(true) }}>
                                                        <Text style={{ fontWeight: 'bold', fontFamily: "CerealMedium" }}>Apply Now</Text>
                                                    </Button>
                                                </CardItem>
                                            </Card>

                                        )
                                    }}
                                />
                            </View>

                        </Container>
                        
                    </View>
              
        );

    }
}

const Style = StyleSheet.create({

    card: {
        elevation: 10,
        //borderColour: 'black',
        borderWidth: 1,
        marginHorizontal: 20,

    },
    startBtn: {
        backgroundColor: 'white',
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20
    },
    roundedBtn: {
        height: 31,
        marginEnd: 50,
        width: 200
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 235,
        backgroundColor: '#E91E63',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    thumbnailOverlay: {
        ...StyleSheet.absoluteFillObject,
        padding: 16,

    },
    startRouteBtn: {
        backgroundColor: 'blue',
        height: 30,
        width: 80,
        borderRadius: 35,

    },
    inputText: {

        backgroundColor: 'white',
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        shadowColor: 'black',
        margin: 20,
        elevation: 10,
        margin: 10

    },
    searchBar: {
        justifyContent: 'center',
        padding: 5,
        opacity: 5.0,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderRadius: 20,
        borderColor: 'black',
        margin: 13,
        height: 47,

    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    image: {
        marginTop: 50,
        marginBottom: 10,
        width: '100%',
        height: 190,
    },
    logo: {
        width: '100%',
        height: 90
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 24,
        marginBottom: 30,
        padding: 40,
    },
    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
        marginTop: 40
    },
    closeButton: {
        display: 'flex',
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF3974',
        shadowColor: '#2AC062',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 22,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    text_header: {
        color: 'black',
        fontFamily: "CerealMedium",
        fontWeight: 'bold',
        fontSize: 18,
        padding: 9
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    text_price: {
        color: 'black',
        fontFamily: "CerealMedium",
        fontWeight: 'bold',
        fontSize: 20,
        padding: 7,
        elevation: 6
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'column'
    },
    listing: {
        marginBottom: 25,
        elevation: 10,
        borderColor: 'black',
        borderWidth: 3,
        marginHorizontal: 20,
        padding: 3,
        marginRight: 6,
        marginLeft: 6
    },
    startTextBtn: {
        backgroundColor: 'white',
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'grey',
        shadowColor: 'black',
        margin: 35,
        elevation: 10
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        marginTop: 5
    },
    // image: {
    //     height: 150,
    //     width: width - 32,
    //     marginVertical: 8,
    // },
    text_title: {
        fontFamily: "CerealMedium",
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
        color: 'green',
        alignItems: 'center',
        justifyContent: 'center'
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    listText: {
        fontFamily: "CerealMedium",
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    jobDesc: {
        padding: 2,
        margin: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'grey',
        fontFamily: "CerealMedium",
        color: 'black',
        fontSize: 15,
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingLabel: {
        fontFamily: "CerealBook",
        marginLeft: 4,
    },
    jobCreator: {
        borderColor: 'black',
        // borderColor: "black",
        borderRadius: 5,
        borderWidth: 1,
        padding: 6,
        marginTop: 10,
        marginBottom: 20,
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: "CerealMedium",
        backgroundColor: '#000000',
        color: 'black',
        opacity: 1.0
    },

    superhostLabel: {
        fontSize: 10,
        fontFamily: "CerealMedium",
    },

})

