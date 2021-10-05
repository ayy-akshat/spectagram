import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, StatusBar, Image, Dimensions, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import SpectagramHeader from '../components/header';
import Post from '../components/Post';
import userCache from '../user';

export default class FeedScreen extends React.Component
{
    constructor()
    {
        super();
        this.state = { posts: require("../screens/temp_posts.json") };
    }

    componentDidMount() {
        userCache.addRefresher(this);
    }

    render()
    {
        const styles = userCache.info.lightTheme ? lightStyles : darkStyles;
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.sav}/>

                <FlatList
                data={[{isHeader: true}, ...this.state.posts]}
                keyExtractor={(item, index) => (index.toString())}
                renderItem={this.renderPost}
                style={{width: "100%"}}
                contentContainerStyle={{alignItems: 'center', width: "100%", paddingBottom: 100}}
                />

            </View>
        );
    }

    renderPost = ({item}) =>
    {
        if (item.isHeader)
        {
            return (
                <SpectagramHeader/>
            )
        }
        else
        {
            return (
                <Post post={item} onGoToPost={this.goToPost}/>
            )
        }
    }

    goToPost = (post) =>
    {
        this.props.navigation.navigate("ViewPostS", {post: post});
    }
}

const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    sav: {
        height: Platform.OS === "android" ? StatusBar.currentHeight : 0
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
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#161616"
    },
    sav: {
        height: Platform.OS === "android" ? StatusBar.currentHeight : 0
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
