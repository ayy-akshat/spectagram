import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import userCache from '../user';

export default class ViewPostScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        userCache.addRefresher(this);
    }
    componentWillUnmount() {
        userCache.removeRefresher(this);
    }

    render() {
        const post = this.props.route.params.post;

        const styles = userCache.info.lightTheme ? lightStyles : darkStyles;

        console.log("post", post);
        console.log("props", this.props);

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={[styles.postPoster, { marginBottom: 10, marginRight: 20, fontSize: 10, opacity: 0.4, alignSelf: 'flex-end' }]}>
                        Posted on {(() => {
                            var d = new Date(post.more.date);
                            return d.toLocaleDateString() + " at " + d.toLocaleTimeString()
                        })()}
                    </Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginLeft: 20
                    }}>
                        <Image
                            source={{ uri: post.user.pfp }}
                            style={{ width: 38, height: 38, marginRight: 10, borderRadius: 25 }}
                        />
                        <View>
                            <Text style={styles.postTitle}>
                                {post.content.title}
                            </Text>
                            <Text style={styles.postPoster}>
                                {post.user.name}
                            </Text>
                        </View>
                    </View>
                    <Image
                        source={require("../assets/post.jpeg")}
                        style={styles.postImg}
                    />
                    <Text style={styles.postCaption}>
                        {post.content.caption}
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
            </ScrollView>
        );
    }
}

const lightStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 25,
        paddingHorizontal: 0,
        minHeight: "100%",
        paddingBottom: 100
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
    container: {
        backgroundColor: "black",
        padding: 25,
        paddingHorizontal: 0,
        minHeight: "100%",
        paddingBottom: 100
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
