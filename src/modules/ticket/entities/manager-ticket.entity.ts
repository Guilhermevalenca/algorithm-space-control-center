import database from "../../../plugins/database";
import type { SpaceshipsEntity } from "../../spaceship/entities/spaceship.entity";
import { PriorityEnum } from "../enums/priority.enum";
import { TicketEntity } from "./ticket.entity";

export class ManagerTicketEntity {
  __type = "ManagerTicketEntity";

  first_ticket: TicketEntity | null = null;
  total_tickets: number = 0;
  relation_spaceship_ticket: {
    spaceship: SpaceshipsEntity;
    ticket_number_sequence: number;
  }[] = [];

  constructor(data?: { first_ticket: TicketEntity; total_tickets: number }) {
    if (data?.first_ticket && data?.total_tickets) {
      this.first_ticket = data.first_ticket;
      this.total_tickets = data.total_tickets;
    }
  }

  addTicket(ticket: TicketEntity, spaceship: SpaceshipsEntity) {
    if (this.first_ticket === null) {
      this.first_ticket = ticket;
      this.relation_spaceship_ticket.push({
        spaceship,
        ticket_number_sequence: 0,
      });
    } else {
      let current_ticket = this.first_ticket;
      for (let i = 0; i < this.total_tickets; i++) {
        if (current_ticket.next_ticket === null) {
          ticket.number_sequence = i + 1;
          current_ticket.next_ticket = ticket;

          this.relation_spaceship_ticket.push({
            spaceship,
            ticket_number_sequence: ticket.number_sequence,
          });

          setTimeout(() => {
            let total_number_request_day =
              database.statistics.total_number_request_day;
            const spaceships_with_number_calls =
              database.statistics.spaceships_with_number_calls;

            total_number_request_day++;

            const verify = spaceships_with_number_calls.find(
              (item) => item.spaceship_name === spaceship.name
            );
            if (!verify) {
              spaceships_with_number_calls.push({
                spaceship_name: spaceship.name,
                number_calls: 1,
              });
            } else {
              spaceships_with_number_calls.forEach((item) => {
                if (item.spaceship_name === spaceship.name) {
                  item.number_calls++;
                }
              });
            }

            database.updateStatistics({
              total_number_request_day,
              spaceships_with_number_calls,
            });
          }, 1);

          break;
        }
        current_ticket = current_ticket.next_ticket;
      }
    }
    this.total_tickets++;
  }

  removeTicket(number_sequence: number) {
    console.log("started");
    if (number_sequence === 0) {
      this.first_ticket = this.first_ticket?.next_ticket ?? null;
      this.total_tickets--;
      if (this.findTicket === null) {
        this.total_tickets = 0;
      }
      return;
    } else {
      const corresponding_ticket: TicketEntity | null =
        this.findTicket(number_sequence)?.ticket ?? null;

      if (corresponding_ticket) {
        const previous_ticket: TicketEntity | null =
          this.findTicket(number_sequence - 1)?.ticket ?? null;

        if (previous_ticket) {
          previous_ticket.next_ticket = corresponding_ticket.next_ticket;

          this.relation_spaceship_ticket =
            this.relation_spaceship_ticket.filter(
              (item) => item.ticket_number_sequence !== number_sequence
            );
          this.total_tickets--;
        }
      }
    }

    this.relation_spaceship_ticket = this.relation_spaceship_ticket.filter(
      (item) => item.ticket_number_sequence !== number_sequence
    );

    database.data = {
      manager_tickets: [this],
    };
  }

  findTicket(
    number_sequence: number
  ): { ticket: TicketEntity; spaceship: SpaceshipsEntity } | null {
    let ticket = this.first_ticket;

    for (let i = 0; i < this.total_tickets; i++) {
      if (ticket?.number_sequence === number_sequence) {
        const spaceship = this.relation_spaceship_ticket.find(
          (item) => item.ticket_number_sequence === number_sequence
        )?.spaceship;

        if (!spaceship) {
          return null;
        }

        return {
          ticket,
          spaceship,
        };
      }
      if (ticket?.next_ticket === null) {
        return null;
      }
      ticket = ticket!.next_ticket;
    }
    return null;
  }

  get ticket_with_higher_priority() {
    if (this.first_ticket === null) {
      return null;
    }
    let ticket = this.#findByPriority(PriorityEnum.emergency);
    console.log("emergency", ticket);

    if (ticket === null) {
      ticket = this.#findByPriority(PriorityEnum.high_priority);
      console.log("high_priority", ticket);

      if (ticket === null) {
        ticket = this.#findByPriority(PriorityEnum.normal);
        console.log("normal", ticket);
      }
    }

    if (ticket) {
      const spaceship = this.relation_spaceship_ticket.find(
        (item) => item.ticket_number_sequence === ticket.number_sequence
      )?.spaceship;
      console.log(spaceship);
      return {
        ticket,
        spaceship,
      };
    } else {
      return null;
    }
  }

  #findByPriority(priority: PriorityEnum): TicketEntity | null {
    let ticket: TicketEntity | null = this.first_ticket;

    for (let i = 0; i < this.total_tickets; i++) {
      if (ticket?.priority === priority) {
        return ticket;
      }
      if (ticket?.next_ticket) {
        return null;
      }
      ticket = ticket?.next_ticket ?? null;
    }

    return ticket;
  }
}
