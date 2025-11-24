import database from "../../../plugins/database";
import type { SpaceshipsEntity } from "../../spaceship/entities/spaceship.entity";
import { SpecialistAssistanceEntity } from "../../specialist-assistance/entities/specialist_assistance.entity";
import { ManagerTicketEntity } from "../../ticket/entities/manager-ticket.entity";
import type { TicketEntity } from "../../ticket/entities/ticket.entity";
import { CallEntity } from "./call.entity";

export class ReceptionistEntity {
  __type = "ReceptionistEntity";

  manage_tickets: ManagerTicketEntity;
  specialist_assistances: SpecialistAssistanceEntity[] = [];

  constructor(data: { manage_ticket: ManagerTicketEntity }) {
    this.manage_tickets = data?.manage_ticket ?? new ManagerTicketEntity();
  }

  addSpecialistAssistance(specialist_assistance: SpecialistAssistanceEntity) {
    this.specialist_assistances.push(specialist_assistance);
  }

  createCall(
    ticket: TicketEntity,
    spaceship: SpaceshipsEntity,
    description: string
  ) {
    const call = new CallEntity({
      ticket,
      spaceship,
      description,
    });

    this.forward_call_to_specialist_assistance(call);

    this.manage_tickets.removeTicket(ticket.number_sequence);

    database.data = {
      manager_tickets: [this.manage_tickets],
      specialist_assistances: this.specialist_assistances,
    };
  }

  forward_call_to_specialist_assistance(call: CallEntity) {
    const available_moment: SpecialistAssistanceEntity[] = [];

    this.specialist_assistances.forEach((specialist_assistance) => {
      if (specialist_assistance.specialist === call.ticket.type_problem) {
        available_moment.push(specialist_assistance);
      }
    });

    console.log(this.specialist_assistances);
    console.log(available_moment);

    const with_greater_availability = available_moment.sort((a, b) => {
      return b.calls.length - a.calls.length;
    });

    console.log(with_greater_availability);

    with_greater_availability[0].addCall(call);
  }
}
