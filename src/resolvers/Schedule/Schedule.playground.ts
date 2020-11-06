export default `
mutation CreateSchedule {
  createSchedule (data: {
    date: "11/6/2020", 
    location: "hochiminh", 
    time: "1604671200574", 
    price: 50000, 
    movieId: 2, 
    theaterId: 1,
  })
}

query ListSchedules {
  ListSchedules(data: {
    date: "11/6/2020",
    location: "hochiminh"
  }) {
    id
    time
    movie {
      id
      name
      
    }
    theater {
      name
    }
  }
}

query Schedule {
  schedule (id: 3 ) {
    schedule {
      id
      time
      scheduleDate {
        date
      }
      theater {
        id
        name
      }
      movie {
        id
        name
      }
    }
    error
  }
}

query MoviesOption {
  moviesOption {
    id
    name
  }
}

query TheaterOptions {
  theaterOptions (location: "hochiminh") {
    id
    name
  }
}

`;