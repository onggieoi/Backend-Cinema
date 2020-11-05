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
  createMovie(data: {
    name: "test1",
      description: "Test1",
      type: "action",
      director: "test1",
      producer: "test1",
      country: "test1",
      duration: 10,
      thumbnail: "123456",
      isShow: false,
      images: ["blabal1", "blabal2"]
  })
}

mutation DeleteMovie {
  deleteMovie(id: 10)
}

`;