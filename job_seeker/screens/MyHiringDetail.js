import React, { Component } from 'react';
//import { removeStudent } from '../services/DataService';
import { Alert, View, Image, StyleSheet, Dimensions } from 'react-native';
import { Container, auto, Content, Footer, FooterTab, Body, Button, Icon, Text, List, Header, Card, CardItem, ListItem } from 'native-base';
import {auth, firestore, storage,db} from '../../config/Firebase'
//import JobList from '../../components/chat/JobList';

const { width, height } = Dimensions.get('window')


export default class MyHiringDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            jobName:null,
            jobExperience: null,
            jobDescription: null,
            jobWorkType: null,
            job_qualification: null,
            job_seekerImage: null,
            job_seekerSalary: null,
            job_seeker_name: null,
            userID: null,
            ref_selfDescribe: null, 
            ref_skills: null, 
            jobCreatorName: null,
        }

    }

    componentDidMount() {
        const detailRef = firestore.collection('Hiring').doc(this.props.route.params.userkey);
        detailRef.get().then((res) => {
            if (res.exists) {
                const job = res.data();
                this.setState({
                    key: res.id,
                    jobName: job.jobName,
                    jobExperience: job.jobExperience,
                    jobDescription: job.jobDescription,
                    jobWorkType: job.jobWorkType,
                    jobCreatorID: job.jobCreatorID,
                    job_qualification: job.job_qualification,
                    job_seekerImage: job.job_seekerImage,
                    job_seekerSalary: job.job_seekerSalary,
                    job_seeker_name: job.job_seeker_name,
                    userID: job.userID,
                    ref_selfDescribe: job.ref_selfDescribe, 
                    ref_skills: job.ref_skills, 
                    jobCreatorName: job.jobCreatorName,
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
                                <Text>{this.state.jobCreatorName}</Text>
                            </Body>
                        <CardItem bordered>

                            <Text style={{ height: 30, fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>Working Type</Text>

                        </CardItem>
                        <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.jobWorkType}</Text>
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

                            <Text style={{ justifyContent: "center", fontWeight: "bold" }}>Experience Requirement:</Text>

                        </CardItem>
                        <CardItem bordered cardBody>
                            <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.jobExperience}</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered cardBody>
                            <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>My Skills:</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered cardBody>
                            <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.ref_skills}</Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem bordered header>

                            <Text style={{ justifyContent: "center", fontWeight: "bold" }}>Qualification:</Text>

                        </CardItem>
                        <CardItem bordered cardBody>
                            <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.job_qualification}</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered cardBody>
                            <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>How I Fit In This Job:</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered cardBody>
                            <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.ref_selfDescribe}</Text>
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

