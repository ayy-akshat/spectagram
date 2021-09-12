import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';

export default class ViewPostScreen extends React.Component {
    constructor(props)
    {
        super(props);
    }


    render() {
        const post = this.props.route.params.post;

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginLeft: 20
                    }}>
                        <Image
                            source={require("../assets/profile_img.png")}
                            style={{ width: 38, height: 38, marginRight: 10, borderRadius: 25 }}
                        />
                        <View>
                            <Text style={styles.postTitle}>
                                {post.title}
                            </Text>
                            <Text style={styles.postPoster}>
                                {post.op}
                            </Text>
                        </View>
                    </View>
                    <Image
                        source={require("../assets/post.jpeg")}
                        style={styles.postImg}
                    />
                    <Text style={styles.postCaption}>
                        {post.caption}
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 25,
        paddingHorizontal: 0,
        minHeight: "100%",
        paddingBottom: 100
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
