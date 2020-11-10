import { Between, Like } from "typeorm";
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
      date: ticket.createAt,
      price: ticket.price,
    }));
  }

  @Query(() => [Chart])
  async chart(): Promise<Chart[]> {
    const charts: Chart[] = [];

    for (let i = 11; i >= 0; i--) {
      const tickets = await Ticket.find({
        where: {
          createAt: Between(firstDay(i), lastDay(i))
        }
      });
      let price = 0;
      tickets.map((ticket) => {
        price += ticket.price;
      });
      const newChart: Chart = {
        month: `${monthFormat(i)}`,
        price,
      }
      charts.push(newChart);
    }

    return charts;
  }
}

const locationFormat = (location: string) => {
  if (location === 'hanoi') return 'UNKNOWN Ha Noi'
  if (location === 'bmt') return 'UNKNOWN BMT'
  return 'UNKNOWN HO CHI MINH'
}

const firstDay = (subMonth: number) => {
  const date = new Date(), y = date.getFullYear(), m = date.getMonth() - subMonth;

  return new Date(y, m, 1).toLocaleString();
}

const lastDay = (subMonth: number) => {
  const date = new Date(), y = date.getFullYear(), m = date.getMonth() - subMonth;

  return new Date(y, m + 1, 0).toLocaleString();
}

const monthFormat = (subMonth: number) => {
  const date = new Date(), y = date.getFullYear(), m = date.getMonth() - subMonth;

  return new Date(y, m, 1).toLocaleString([], { month: '2-digit', year: 'numeric' });
}