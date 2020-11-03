export default `
mutation SignIn {
  userSignIn(data: {
    username: "",
    password: ""
  }) {
    user {
      id
      username
      fullname
    }
    errors {
      field
      message
    }
  }
}

mutation SignUp {
  userSignUp(data: {
    username: "onggieoi",
    password: "123456",
    fullname: "Quang Duc"
  }) {
    user {
      id
      username
      fullname
    }
    errors {
      field
      message
    }
  }
}

query Me {
  me {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}

mutation Logout {
  logout
}

mutation CustomerSignUp {
  customerSignUp(
    data: {
      username: "test123"
      password: "12345678"
      fullname: "test test"
      creditCardNumber: 12345678
      csv: 123
    }
  ) {
    customer {
      id
      username
      fullname
      creditCardNumber
    }
    errors {
      field
      message
    }
  }
}

mutation CustomerSignIn {
  customerSignIn(data: {
    username: "test123",
    password: "12345678"
  }) {
    customer {
      id
      username
      fullname
      creditCardNumber
      csv
    }
    errors {
      field
      message
    }
  }
}

query MeCustomer {
  meCustomer {
    customer {
      id
      username
      fullname
      creditCardNumber
      csv
    }
    errors {
      field
      message
    }
  }
}

mutation BuyTicket {
  buyTicket(options: {
    location: "hochiminh",
    seatId: 1,
    scheduleTimeId: 1,
    price: 50000
  })
}

`;