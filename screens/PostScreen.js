import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';
import userCache from '../user';

import firebase from 'firebase';

import { RFValue } from 'react-native-responsive-fontsize';
import SpectagramHeader from '../components/header';

export default class Post extends React.Component {
    constructor() {
        super();
        this.state = {
            titleInput: "",
            captionInput: "",
            imageChoice: 0,
            // dropdownHeight: 40,
        }
    }

    componentDidMount() {
        userCache.addRefresher(this);
    }
    componentWillUnmount() {
        userCache.removeRefresher(this);
    }

    render() {
        const imgs = {
            i1: require("../assets/image_1.jpg"),
            i2: require("../assets/image_2.jpg"),
            i3: require("../assets/image_3.jpg"),
            i4: require("../assets/image_4.jpg"),
            i5: require("../assets/image_5.jpg"),
            i6: require("../assets/image_6.jpg"),
            i7: require("../assets/image_7.jpg"),
        }

        const imgChoices = [
            require("../assets/image_1.jpg"),
            require("../assets/image_2.jpg"),
            require("../assets/image_3.jpg"),
            require("../assets/image_4.jpg"),
            require("../assets/image_5.jpg"),
            require("../assets/image_6.jpg"),
            require("../assets/image_7.jpg"),
        ]

        const styles = userCache.info.lightTheme ? lightStyles : darkStyles;

        return (
            <KeyboardAvoidingView behavior="position">
                <ScrollView contentContainerStyle={styles.container}>
                    <SpectagramHeader />

                    <View style={styles.post}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: "100%",
                        }}>
                            <Image
                                source={{ uri: userCache.info.pfp }}
                                style={{ width: 38, height: 38, marginRight: 10, borderRadius: 25 }}
                            />
                            <View style={{ width: "90%" }}>
                                <TextInput
                                    style={styles.postTitle}
                                    placeholder="Enter Title"
                                    onChangeText={(titleInput) => { this.setState({ titleInput }) }}
                                    value={this.state.titleInput}
                                />
                                <Text style={styles.postPoster}>
                                    Posting as <Text style={{ fontStyle: 'italic' }}>{userCache.info.firstName + " " + userCache.info.lastName}</Text>
                                </Text>
                            </View>
                        </View>
                        <Image
                            source={imgChoices[this.state.imageChoice]}
                            style={styles.postImg}
                        />
                        <View style={{ height: 40, alignItems: 'center', padding: 5, marginBottom: 30 }}>

                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => { this.changeImgChoice(-1) }}>
                                    <Ionicons name="chevron-back-circle" size={30} color={userCache.info.lightTheme ? "black" : "white"} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 20, marginHorizontal: 20, color: userCache.info.lightTheme ? "black" : "white" }}>
                                    Image {(this.state.imageChoice + 1).toString()}
                                </Text>
                                <TouchableOpacity onPress={() => { this.changeImgChoice(1) }}>
                                    <Ionicons name="chevron-forward-circle" size={30} color={userCache.info.lightTheme ? "black" : "white"} />
                                </TouchableOpacity>
                            </View>

                        </View>
                        <TextInput
                            style={styles.postCaption}
                            placeholder="Enter Caption"
                            value={this.state.captionInput}
                            onChangeText={(captionInput) => { this.setState({ captionInput }) }}
                        />
                        <TouchableOpacity style={styles.postButton} onPress={this.post}>
                            <View style={styles.postBtnContentContainer}>
                                <Ionicons name="add-circle" size={RFValue(20)} color="white" />
                                <Text style={styles.postBtnTxt}>
                                    Post
                                </Text>
                            </View>

                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 100 }}></View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

    changeImgChoice = (amt) => {
        var i = this.state.imageChoice;
        i += amt;
        i = (i > 6 ? 6 : (i < 0 ? 0 : i));
        this.setState({ imageChoice: i });
    }

    post = () => {
        if (this.state.titleInput.length < 3)
        {
            alert("Title is too short (must be at least 3 chars).");
            return;
        }
        if (this.state.captionInput.length < 5)
        {
            alert("Caption is too short (must be at least 5 chars).");
            return;
        }

        
        var post = {
            content: {
                title: this.state.titleInput,
                caption: this.state.captionInput,
                image: this.state.imageChoice
            },
            user: {
                name: userCache.info.firstName + " " + userCache.info.lastName,
                pfp: userCache.info.pfp
            },
            more: {
                date: firebase.database.ServerValue.TIMESTAMP,
                likes: 0
            }
        }

        firebase.database().ref("/posts/").push(post).then((data) => {
            this.emptyInputs();
            console.log("posted", data);
            alert("Posted story.");
            data.once("value", (data) => {
                console.log("data value", data.val());
                this.props.navigation.navigate("ViewPostS", {post: data.val()});
            })
        }).catch((reason) => {
            alert("error in posting story.\n" + reason);
        });
    }

    emptyInputs = () => {
        this.setState({ titleInput: "", captionInput: "", });
    }
}

const lightStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    header: {
        marginVertical: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    headerImg: {
        width: RFValue(60),
        height: RFValue(60),
        marginHorizontal: 10
    },
    headerTxt: {
        fontWeight: 'bold',
        marginHorizontal: 10,
        fontSize: RFValue(30)
    },
    post: {
        backgroundColor: "white",
        margin: 20,
        borderRadius: 25,
        padding: 25,
        width: (Platform.OS === "ios" || Platform.OS === "android") ? (Dimensions.get("window").width * 0.9) : "70vw",
        paddingHorizontal: 20
    },
    postTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        borderWidth: "2",
        borderColor: "#696969",
        borderRadius: 5,
        borderWidth: 2,
        width: "100%",
        paddingHorizontal: 10,
    },
    postPoster: {
        fontSize: 12
    },
    postImg: {
        width: "100%",
        height: 300,
        marginTop: 20,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    postCaption: {
        alignSelf: 'center',
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 5,
        marginBottom: 20,
        fontWeight: 'bold',
        borderRadius: 5,
        borderColor: "#696969",
        borderWidth: 2,
        width: "70%"
    },
    postButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingHorizontal: 100,
        width: "90%",
        alignSelf: 'center',
        backgroundColor: "#05A1BD",
        borderRadius: 100,
        marginVertical: 20
    },
    postBtnContentContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    postBtnTxt: {
        color: "white",
        textAlignVertical: 'center',
        marginTop: 7,
        fontSize: RFValue(10),
        textAlign: 'center'
    }
});

const darkStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: "#161616"
    },
    header: {
        marginVertical: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    headerImg: {
        width: RFValue(60),
        height: RFValue(60),
        marginHorizontal: 10
    },
    headerTxt: {
        fontWeight: 'bold',
        marginHorizontal: 10,
        fontSize: RFValue(30)
    },
    post: {
        backgroundColor: "black",
        margin: 20,
        borderRadius: 25,
        padding: 25,
        width: (Platform.OS === "ios" || Platform.OS === "android") ? (Dimensions.get("window").width * 0.9) : "70vw",
        paddingHorizontal: 20
    },
    postTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        borderWidth: "2",
        borderColor: "#696969",
        borderRadius: 5,
        borderWidth: 2,
        width: "100%",
        paddingHorizontal: 10,
        backgroundColor: "#aaaaaa",
        color: "white",
    },
    postPoster: {
        fontSize: 12,
        color: "lightgray"
    },
    postImg: {
        width: "100%",
        height: 300,
        marginTop: 20,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    postCaption: {
        alignSelf: 'center',
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 5,
        marginBottom: 20,
        fontWeight: 'bold',
        borderRadius: 5,
        borderColor: "#696969",
        backgroundColor: "#aaaaaa",
        color: "white",
        borderWidth: 2,
        width: "70%"
    },
    postButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingHorizontal: 100,
        width: "90%",
        alignSelf: 'center',
        backgroundColor: "#05A1BD",
        borderRadius: 100,
        marginVertical: 20
    },
    postBtnContentContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    postBtnTxt: {
        color: "white",
        textAlignVertical: 'center',
        marginTop: 7,
        fontSize: RFValue(10),
        textAlign: 'center'
    }
});
