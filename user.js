import firebase from "firebase";

var userCache = {
    info: {
        gmail: undefined,
        pfp: undefined,
        locale: undefined,
        firstName: undefined,
        lastName: undefined,
        lightTheme: true,
    },
    uid: undefined,
    update: (info, uid) =>
    {
        console.log("updating userCache cache");
        console.log("update info", info);
        console.log("update uid", uid);
        
        userCache.info = info;
        console.log("updated to", userCache);

        userCache.updateRefreshers();
    },
    changeTheme: (isLight) =>
    {
        var info = userCache.info;
        info.lightTheme = isLight;
        userCache.updateInDatabase(info);
    },
    toggleTheme: () =>
    {
        var newTheme = !userCache.info.lightTheme;
        userCache.changeTheme(newTheme);
    },
    // ref_: firebase.database().ref("/users/").child(firebase.auth().currentUser.uid),
    fetchInfo: () =>
    {
        firebase.database()
        .ref("/users/" + firebase.auth().currentUser.uid)
        .once("value", (data) => {
            userCache.update(data.val());
        })
    },
    updateInDatabase: (info) =>
    {
        firebase.database()
        .ref("/users/" + firebase.auth().currentUser.uid)
        .update(info, (a) => {
            console.log("completed updating db user info")
            console.log("a", a);
        }).then((v) => {
            console.log("onfullfilled", v);
            userCache.update(info);
        })
    },
    addRefresher: (c) =>
    {
        userCache.refreshers.push(c);
    },
    removeRefresher: (c) =>
    {
        var i = userCache.refreshers.indexOf(c);
        if (i != -1)
        {
            userCache.refreshers.splice(i, 1);
        }
    },
    refreshers: [],
    updateRefreshers: () =>
    {
        for (var r in userCache.refreshers)
        {
            userCache.refreshers[r].forceUpdate(() => {console.log("refreshed component", r)});
        }
    }
};

export default userCache;