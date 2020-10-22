export default `
mutation SignIn {
  userSignIn(data: {
    username: "",
    password: ""
  }) {
    user {
      id
      username
      createAt
      updateAt
    }
    error {
      field
      message
    }
  }
}

mutation SignUp {
  userSignUp(data: {
    username: "",
    password: ""
  }) {
    user {
      id
      username
      createAt
      updateAt
    }
    error {
      field
      message
    }
  }
}

query Me {
  me {
    id
    username
    createAt
    updateAt
  }
}

mutation Logout {
  logout
}
`;