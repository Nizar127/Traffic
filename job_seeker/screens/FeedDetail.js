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
        this.hireRef = firestore.collection('Hiring');

        this.state = {
            jobs: [],
            jobCreatorName: null,
            jobname: null,
            jobdesc: null,
            salary: null,
            peoplenum: null,
            time: null,
            worktype: null,
            qualification: null,
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
        const FeedDetailRef = firestore.collection('Job_list').doc(this.props.route.params.userkey);
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
                    worktype: apply.worktype,
                    url: apply.url,
                    experience: apply.experience,
                    qualification: apply.qualification,
                    uniqueId: apply.uniqueId,

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
                workExperience: doc.get('experience'),
                job_seeker_salary: doc.get('salary'),
                job_qualification: doc.get('qualification')
            }, () => {

                console.log("state", this.state)
                console.log("auth.currentUser", auth.currentUser)



                if (this.state.skills && this.state.selfdescription) {

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
                    <Card>
                       <CardItem bordered header>
                            <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} >{this.state.jobname}</Text>

                        </CardItem>
                    </Card>
                    <Card style={{ height: 300 }}>
                        <Image source={{ uri: this.state.url }} style={{ height: 300 }} />
                    </Card>

                    <Card>
                        <CardItem bordered header>
                            <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} >Employer Email</Text>

                        </CardItem>
                        <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.jobCreatorName}</Text>
                            </Body>
                        <CardItem bordered>

                            <Text style={{ height: 30, fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>Unique Id</Text>

                        </CardItem>
                        <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.uniqueId}</Text>
                            </Body>
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


                    <Card style={{ height: 400 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Requirement</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <ListItem>
                                    <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.worktype}</Text>
                                </ListItem>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <ListItem>
                                  <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.qualification}</Text>
                                </ListItem>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <ListItem>
                                    <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.experience}</Text>
                                </ListItem>
                            </Body>
                        </CardItem>
                     </Card>
                     <Card>
                        <CardItem bordered header>

                            <Text style={{ justifyContent: "center", fontWeight: "bold" }}>Number of People Required:</Text>

                         </CardItem>
                        <CardItem cardBody style={{ marginTop: 20 }}>
                            
                            <Body>
                                <Text> {this.state.peoplenum}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={{ height: auto }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Salary</Text>
                        </CardItem>
                        <CardItem cardBody style={{ height: 40, marginTop: 10, marginLeft: 20 }}>
                            <Body><Text>$ {this.state.salary}</Text></Body>
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


