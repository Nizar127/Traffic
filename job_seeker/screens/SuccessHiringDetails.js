import React, { Component } from 'react';
//import { removeStudent } from '../services/DataService';
import { Alert, View, Image, StyleSheet, Dimensions } from 'react-native';
import { Container, auto, Content, Footer, FooterTab, Body, Button, Icon, Text, List, Header, Card, CardItem, ListItem } from 'native-base';
import {auth, firestore, storage,db} from '../../config/Firebase'
//import JobList from '../../components/chat/JobList';

const { width, height } = Dimensions.get('window')


export default class SuccessHiringDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            jobCreatorID: null,
                job_creator_name: null, 
                job_creator_Image: null, 
                jobSeekerName: null,
                 jobSeekerID: null, 
                 jobDescription: null, 
                 job_seekerImage: null, 
                 jobName: null,
                 job_seekerSalary: null, 
                 type_of_job: null,
                  task: null
        }

    }

    componentDidMount() {
        const detailRef = firestore.collection('Job_Hired').doc(this.props.route.params.userkey);
        detailRef.get().then((res) => {
            if (res.exists) {
                const job = res.data();
                this.setState({
                    key: res.id,

                    jobCreatorID: job.jobCreatorID,
                    job_creator_name: job.job_creator_name, 
                    job_creator_Image: job.job_creator_Image, 
                    jobSeekerName: job.jobSeekerName,
                     jobSeekerID: job.jobSeekerID, 
                     jobDescription: job.jobDescription, 
                     job_seekerImage: job.job_seekerImage, 
                     jobName: job.jobName,
                     job_seekerSalary: job.job_seekerSalary, 
                     type_of_job: job.type_of_job,
                      task: job.task
                });
                console.log("state", this.state)
            } else {
                console.log("Whoops! Document does not exists");
            }
        })
    }


    setUniqueId = (value) => {
        this.setState({ uniqueId: value });
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <View style={{ marginTop: 13, marginEnd: 350 }}>
                        <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                    </View>
                </Header>

                <Content padder>
                    <Card>
                       <CardItem bordered header>
                            <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} >{this.state.jobName}</Text>

                        </CardItem>
                    </Card>
                    <Card style={{ height: 300 }}>
                        <Image source={{ uri: this.state.job_seekerImage }} style={{ height: 300 }} />
                    </Card>

                    <Card>
                        <CardItem bordered header>
                            <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} >Employer Email</Text>

                        </CardItem>
                        <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.job_creator_name}</Text>
                            </Body>
                        <CardItem bordered>

                            <Text style={{ height: 30, fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>Working Type</Text>

                        </CardItem>
                        <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.type_of_job}</Text>
                            </Body>
                    </Card>

                    <Card>
                        <CardItem bordered header>

                            <Text style={{ justifyContent: "center", fontWeight: "bold" }}>Job Description</Text>

                        </CardItem>
                        <CardItem bordered cardBody>
                            <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.jobDescription}</Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem bordered header>

                            <Text style={{ justifyContent: "center", fontWeight: "bold" }}>Task</Text>

                        </CardItem>
                        <CardItem bordered cardBody>
                            <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.task}</Text>
                            </Body>
                        </CardItem>
                    </Card>


    
                    <Card style={{ height: auto }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Salary</Text>
                        </CardItem>
                        <CardItem cardBody style={{ height: 40, marginTop: 10, marginLeft: 20 }}>
                            <Body><Text>$ {this.state.job_seekerSalary}</Text></Body>
                        </CardItem>
                    </Card>

                </Content>




            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
/*     map: {
        height: 300,
        // disabledwidth: 100,
        width: 370,
        //...StyleSheet.absoluteFillObject
    }, */
});

