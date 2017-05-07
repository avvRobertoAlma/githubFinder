import React, { Component } from "react"
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  Image,
  TouchableHighlight,
} from "react-native"
import { StackNavigator } from "react-navigation"

import api from "./lib/api"

class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      user: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      username: event.nativeEvent.text,
    })
  }
  handleSubmit() {
    api.getUsers(this.state.username).then(res => {
      this.props.navigation.navigate("User", { user: res })
    })
    this.setState({
      username: "",
    })
  }
  static navigationOptions = {
    title: "Search Github User",
  }

  render() {
    const { navigate } = this.props.navigation
    const help = {
      name: "Fabio",
      surname: "Pelosin",
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Search for a github user</Text>
        <TextInput
          underlineColorAndroid="white"
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange.bind(this)}
        />
        <Text />
        <Button title="Search" onPress={this.handleSubmit} />
      </View>
    )
  }
}

class UserScreen extends Component {
  constructor(props) {
    super(props)

    this.goToProfile = this.goToProfile.bind(this)
  }
  goToProfile() {
    const user = this.props.navigation.state.params.user
    api.getUsers(user.login).then(res => {
      const user = {
        name: res.name,
        followers: res.followers,
        company: res.company,
        blog: res.blog,
      }
      console.log("users", user)
      this.props.navigation.navigate("Profile", { user: user })
    })
  }
  static navigationOptions = {
    title: "Github User",
  }

  render() {
    const user = this.props.navigation.state.params.user
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{user.name}</Text>
        <ScrollView>
          <Image source={{ uri: user.avatar_url }} style={styles.image} />
          <TouchableHighlight
            style={styles.highlight}
            onPress={this.goToProfile}
          >
            <Text style={styles.details}>VIEW PROFILE</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    )
  }
}

class ProfileScreen extends Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = {
    title: "User's Profile",
  }

  render() {
    const user = this.props.navigation.state.params.user
    console.log("INSIDE PROFILE", user)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{user.name}</Text>
        <ScrollView>
          <Text style={styles.details}>Name: {user.name}</Text>
          <Text style={styles.details}>Company: {user.company}</Text>
          <Text style={styles.details}>Blog: {user.blog}</Text>
          <Text style={styles.details}>Followers: {user.followers}</Text>
        </ScrollView>
        <Button
          title="New Search"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
  },
  highlight: {
    flex: 1,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6495ED",
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    margin: 10,
    color: "white",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  searchInput: {
    height: 50,
    width: 300,
    padding: 4,
    marginRight: 5,
    borderWidth: 1,
    borderColor: "white",
    color: "white",
    fontSize: 20,
  },
  details: {
    fontSize: 18,
    color: "white",
  },
})

const App = StackNavigator({
  Home: { screen: HomeScreen },
  User: { screen: UserScreen },
  Profile: { screen: ProfileScreen },
})

AppRegistry.registerComponent("myFirstApp", () => App)
