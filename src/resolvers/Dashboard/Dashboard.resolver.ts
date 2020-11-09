import { Query, Resolver } from "type-graphql";

import { Ticket } from "../../entities/Ticket";
import { Customer } from "../../entities/Customer";
import { Movie } from "../../entities/Movie";

import { Chart, GeneralReportRespone, Transactions } from "./Types";

@Resolver()
export class DashboardResolver {
  @Query(() => GeneralReportRespone)
  async generalReport() {
    const users = await Customer.findAndCount({});

    const movies = await Movie.findAndCount({});

    const tickets = await Ticket.find({});

    let total = 0;

    tickets.map((ticket) => {
      total += ticket.price;
    });

    return {
      users: users[1],
      movies: movies[1],
      total,
    };
  }

  @Query(() => [Transactions])
  async transactions(): Promise<Transactions[]> {
    const tickets = await Ticket.find({
      order: {
        id: -1
      },
      take: 10,
      relations: ['customer'],
    });

    return tickets.map((ticket) => ({
      user: ticket.customer.fullname || '',
      location: locationFormat(ticket.location),
      creditCardNumber: ticket.customer.creditCardNumber,
      price: ticket.price,
    }));
  }

  // @Query(() => [Chart])
  // async chart(): Promise<Chart[]> {
  //   const monthNow = new Date().getUTCMonth() + 1;

  //   for (let i = monthNow; i > 0; i++) {

  //   }
  //   return [];
  // }
}

const locationFormat = (location: string) => {
  if (location === 'hanoi') return 'UNKNOWN Ha Noi'
  if (location === 'bmt') return 'UNKNOWN BMT'
  return 'UNKNOWN HO CHI MINH'
}