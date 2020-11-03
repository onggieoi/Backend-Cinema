export default `
query MoviesForHome {
  moviesForHome {
    moviesShowing {
      id
      name
      thumbnail
    }
    moviesComming {
      id
      name
      thumbnail
    }
  }
}

query MoviesComming {
  moviesComming {
    id
    name
    thumbnail
  }
}

query MoviesShowing {
  moviesShowing {
    id
    name
    thumbnail
  }
}

query Movie {
  movie(id: 1) {
    movie {
      id
      name
      description
      type
      director
      producer
      country
      duration
      thumbnail
      isShow
      images {
        url
      }
    }
    error {
      field
      message
    }
  }
}

query Session {
  getTimesSession (options: {
    movieId: 1,
    location: "hochiminh",
    date: "2/11/2020"
  }) {
    id
    time
    price
    theater {
      name
    }
  }
}

query Seats {
  seats(options: {
    scheduleTimeId: 1,
    theaterId: 1,
    location: "hochiminh"
  })
  {
    seat {
      id
      name
      percent
    }
    isAvailable
  }
}

`;