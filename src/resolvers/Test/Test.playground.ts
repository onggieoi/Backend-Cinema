export default `
query Tests {
  tests {
    id
    title
    createAt
    updateAt
  }
}

query Test {
  test(id: 1) {
    id
    title
    createAt
    updateAt
  }
}

mutation CreateTest {
  createTest(title: "Test2") {
    id
    title
    createAt
    updateAt
  }
}

mutation UpdateTest {
  updateTest(id: 3, title: "Test3") {
    id
    title
    createAt
    updateAt
  }
}

mutation DeleteTest {
  deleteTest(id: 100)
}
`;