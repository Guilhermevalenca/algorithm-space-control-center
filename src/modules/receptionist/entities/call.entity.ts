import type { SpaceshipsEntity } from "../../spaceship/entities/spaceship.entity";
import type { TicketEntity } from "../../ticket/entities/ticket.entity";

export class CallEntity {
  __type = "CallEntity";

  ticket: TicketEntity;
  spaceship: SpaceshipsEntity;
  description: string;

  constructor(data: {
    ticket: TicketEntity;
    spaceship: SpaceshipsEntity;
    description: string;
  }) {
    this.ticket = data?.ticket ?? null;
    this.spaceship = data?.spaceship ?? null;
    this.description = data?.description ?? null;
  }
}
