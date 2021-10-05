import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import userCache from '../user';

export default class Post extends React.Component {
    constructor(props)
    {
        super(props)
    }

    componentDidMount() {
        userCache.addRefresher(this);
    }

    render() {
        const styles = userCache.info.lightTheme ? lightStyles : darkStyles;
        return (
            <TouchableOpacity onPress={() => {
                this.props.onGoToPost(this.props.post);
            }}>
                <View style={styles.post}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Image
                            source={require("../assets/profile_img.png")}
                            style={{ width: 38, height: 38, marginRight: 10, borderRadius: 25 }}
                        />
                        <View>
                            <Text style={styles.postTitle}>
                                {this.props.post.title}
                            </Text>
                            <Text style={styles.postPoster}>
                                {this.props.post.op}
                            </Text>
                        </View>
                    </View>
                    <Image
                        source={require("../assets/post.jpeg")}
                        style={styles.postImg}
                    />
                    <Text style={styles.postCaption}>
                        {this.props.post.caption}
                    </Text>
                    <TouchableOpacity style={styles.likeButton}>
                        <View style={styles.likeBtnContentContainer}>
                            <Ionicons name="heart" size={RFValue(30)} color="white" />
                            <Text style={styles.likeTxt}>
                                12k Likes
                            </Text>
                        </View>

                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }
}

const lightStyles = StyleSheet.create({
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
        fontWeight: 'bold'
    },
    likeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingHorizontal: 100,
        maxWidth: "90%",
        alignSelf: 'center',
        backgroundColor: "tomato",
        borderRadius: 100,
        marginVertical: 20
    },
    likeBtnContentContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    likeTxt: {
        color: "white",
        textAlignVertical: 'center',
        marginTop: 7,
        fontSize: RFValue(10),
        textAlign: 'center'
    }
});

const darkStyles = StyleSheet.create({
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
        color: "white"
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
        color: "lightgray"
    },
    likeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingHorizontal: 100,
        maxWidth: "90%",
        alignSelf: 'center',
        backgroundColor: "tomato",
        borderRadius: 100,
        marginVertical: 20
    },
    likeBtnContentContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    likeTxt: {
        color: "white",
        textAlignVertical: 'center',
        marginTop: 7,
        fontSize: RFValue(10),
        textAlign: 'center'
    }
});
