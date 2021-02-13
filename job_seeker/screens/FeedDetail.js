import React, { Component } from 'react';
import { StyleSheet, ScrollView, Dimensions, Image, FlatList, Modal } from 'react-native';
import {
    Container,
    Header,
    Content,
    View,
    Card,
    Right,
    auto,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    List,
    ListItem,
    Separator,
    Button,
    Item,
    Label,
    Input
} from 'native-base';
import Icon from '@expo/vector-icons/Ionicons';
const { width } = Dimensions.get("window");
import {auth, db, storage, firestore} from '../../config/Firebase';



export default class FeedDetail extends Component {
    constructor() {
        super();
        this.hireRef = firestore().collection('Hiring');

        this.state = {
            jobs: [],
            jobCreatorName: null,
            jobname: null,
            jobdesc: null,
            salary: null,
            peoplenum: null,
            time: null,
            worktype: null,
            chosenDate: null,
            location: { description: '' },
            url: null,
            key: '',
            dynamicAddress: [],
            skills: '',
            experience: '',
            profileImage: '',
            selfdescription: '',
            isVisible: false,
            items: [],
          

        }
    }


    componentDidMount() {
        const FeedDetailRef = firestore.collection('Job_list').doc(this.props.navigation.state.params.userkey);
        FeedDetailRef.get().then((res) => {
            if (res.exists) {
                const apply = res.data();
                this.setState({
                    key: res.id,
                    jobCreatorName: apply.jobCreatorName,
                    jobname: apply.jobname,
                    jobdesc: apply.jobdesc,
                    salary: apply.salary,
                    peoplenum: apply.peoplenum,
                    chosenDate: apply.chosenDate,
                    worktype: apply.worktype,
                    location: apply.location,
                    url: apply.url,
                    lat: apply.lat,
                    lng: apply.lng
                });
                console.log("state", this.state)

            } else {
                console.log("Whoops! Document does not exists");
            }
        });


    }

    displayModal(show) {
        this.setState({ isVisible: show })
    }


    setExperience = (value) => {
        this.setState({ ...this.state, experience: value })
    }

    setSkills = (value) => {
        this.setState({ ...this.state, skills: value })
    }

    setSelfDescription = (value) => {
        this.setState({ ...this.state, selfdescription: value })
    }


    sendApplication = (id) => {
        let dbref = firestore.collection('Job_list').doc(id).get();
        dbref.then(doc => {
            this.setState({
                ...this.state,
                uid: doc.get('uid'),
                //job_seeker_name: doc.get('username'),
                job_id: doc.get('id'),
                jobCreatorID: doc.get('uid'),
                jobCreatorName: doc.get('jobCreatorName'),
                jobDescription: doc.get('jobdesc'),
                job_seekerImage: doc.get('url'),
                jobname: doc.get('jobname'),
                jobWorkType: doc.get('worktype'),
                workingLocation: doc.get('location'),
                lat: doc.get('lat'),
                lng: doc.get('lng'),
                job_seeker_salary: doc.get('salary'),
                startDate: doc.get('chosenDate')
            }, () => {

                console.log("state", this.state)
                console.log("auth.currentUser", auth.currentUser)



                if (this.state.experience && this.state.skills && this.state.selfdescription) {

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
                        workingLocation: this.state.workingLocation.description,
                        lat: this.state.lat,
                        lng: this.state.lng,
                        startDate: this.state.startDate,
                        ref_skills: this.state.skills,
                        ref_experienece: this.state.experience,
                        ref_selfDescribe: this.state.selfdescription


                    }).then((res) => {
                        this.setState({
                            skills: '',
                            experience: '',
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

            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <View style={{ marginTop: 13, marginEnd: 350 }}>
                        <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                    </View>
                </Header>

                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.isVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has now been closed.');
                    }}>


                    <Item fixedLabel last>
                        <Label> Describe Yourself</Label>
                        <Input onChangeText={this.setSelfDescription} />
                    </Item>

                    <Item fixedLabel last>
                        <Label>Related Skills</Label>
                        <Input onChangeText={this.setSkills} />
                    </Item>

                    <Item fixedLabel last>
                        <Label>Related Experience</Label>
                        <Input onChangeText={this.setExperience} />
                    </Item>


                    <Text
                        style={styles.closeText}
                        onPress={() => {
                            this.displayModal(!this.state.isVisible);
                        }}><Icon name="md-close" size={50} />
                    </Text>

                    <Button success style={styles.addButton} onPress={() => this.sendApplication(this.state.key)}>
                        <Text>Submit</Text>
                    </Button>
                </Modal>

                <Content padder>

                    <Image source={{ uri: this.state.url }} style={{ resizeMode: 'cover', height: 300 }} />

                    <Card>
                        <CardItem bordered header>
                            <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} >{this.state.jobname}</Text>

                        </CardItem>
                        <CardItem bordered>

                            <Text style={{ height: 30, fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>{this.state.uniqueId}</Text>

                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem bordered header>

                            <Text style={{ justifyContent: "center", fontWeight: "bold" }}>Job Description</Text>

                        </CardItem>
                        <CardItem bordered cardBody>
                            <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.jobdesc}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    {/* <CardItem>   
                         <Text style={{marginTop: 5, marginBottom: 5}}>Creative World Industries</Text>
                    </CardItem> */}



                    <Card style={{ height: 200 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Requirement</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.worktype}</Text>
                            </Body>
                        </CardItem>
                        <CardItem cardBody style={{ marginTop: 20 }}>
                            <Body>
                                <Text>Number of People Required: {this.state.peoplenum}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={{ height: auto }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Salary</Text>
                        </CardItem>
                        <CardItem cardBody style={{ height: 40, marginTop: 10, marginLeft: 20 }}>
                            <Body><Text>RM {this.state.salary}</Text></Body>
                        </CardItem>
                    </Card>
                    <Card style={{ height: 200 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Date</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <Text>{this.state.chosenDate}</Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card style={{ height: 400, marginBottom: 10 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>LOCATION</Text>
                        </CardItem>
                        <CardItem header >
                            <Text style={{ fontWeight: "bold" }}>{this.state.location.description}</Text>
                        </CardItem>
                    </Card>
                </Content>
                <Card style={styles.applyFooter}>
                    <CardItem>
                        <Left>
                            <Text style={{ fontWeight: 'bold' }}>RM {this.state.salary}</Text><Text>/</Text><Text>day</Text>
                        </Left>
                        <Right>
                            <Button danger style={{ borderRadius: 12, fontWeight: "bold" }} onPress={() => { this.setState({ key: this.state.key }), this.displayModal(true) }} ><Text>Apply</Text></Button>
                        </Right>
                    </CardItem>
                </Card>


            </Container>




        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    applyFooter: {
        height: 60,
        padding: 10,
        justifyContent: 'center',
        borderColor: 'black',
        borderTopWidth: 1,
    },
    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
        marginTop: 40
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
    image: {
        marginTop: 50,
        marginBottom: 10,
        width: '100%',
        height: 190,
    },
});


