export default `
query Movies {
  movies {
    id
    name
    duration
    isShow
    images {
      url
    }
  }
}

mutation CreateMovie {
  createMovie(
    data: {
      id: 2
      name: "test1"
      description: "Test1"
      type: "action"
      director: "test1"
      producer: "test1"
      country: "test1"
      duration: 10
      thumbnail: "123456"
      isShow: false
      images: [""]
    }
  )
}

mutation DeleteMovie {
  deleteMovie(id: 10)
}

`;