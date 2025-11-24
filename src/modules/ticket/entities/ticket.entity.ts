import { SpecialistEnum } from "../../specialist-assistance/enums/specialist.enum";
import { PriorityEnum } from "../enums/priority.enum";

export class TicketEntity {
  __type = "TicketEntity";

  priority: PriorityEnum;
  type_problem: SpecialistEnum;

  next_ticket: TicketEntity | null = null;
  number_sequence: number;

  constructor(data: {
    priority: PriorityEnum;
    type_problem: SpecialistEnum;
    number_sequence?: number;
  }) {
    this.priority = data?.priority ?? PriorityEnum.normal;
    this.type_problem = data?.type_problem ?? SpecialistEnum.energy;
    this.number_sequence = data?.number_sequence ?? 0;
  }
}
