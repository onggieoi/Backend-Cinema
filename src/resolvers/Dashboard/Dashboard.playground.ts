export default `
query GeneralReport {
  generalReport {
    movies
    total
    users
	}
}

query Transactions {
  transactions {
    user
    location
    price
    date
  }
}

query Chart {
  chart {
    month
    price
  }
}

`;