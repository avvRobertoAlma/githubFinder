export default {
  getUsers: username => {
    let user = username
    let url = `https://api.github.com/users/${user}`
    return fetch(url)
      .then(res => {
        return res.json()
      })
      .then(json => {
        console.log("Called", json)
        return json
      })
      .catch(err => {
        alert(err)
      })
  },
}
