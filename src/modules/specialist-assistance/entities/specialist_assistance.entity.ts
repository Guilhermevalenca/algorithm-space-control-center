import type { CallEntity } from "../../receptionist/entities/call.entity";
import type { SpecialistEnum } from "../enums/specialist.enum";
import type { PanelType } from "../types/panel.type";
import { ServiceQueueEntity } from "./service_queue.entity";

export class SpecialistAssistanceEntity {
  __type = "SpecialistAssistanceEntity";

  service_queue: ServiceQueueEntity;
  specialist: SpecialistEnum;
  tickets_processed: number = 0;

  constructor(data: {
    specialist: SpecialistEnum;
    service_queue?: ServiceQueueEntity;
  }) {
    this.specialist = data?.specialist;
    if (data?.service_queue) {
      this.service_queue = data.service_queue;
    } else {
      this.service_queue = new ServiceQueueEntity();
    }
  }

  addCall(call: CallEntity) {
    this.service_queue.addCall(call);
    setTimeout(() => {
      this.resolveCall(call);
    }, Math.random() * (5000 - 3000) + 3000);
  }

  get calls(): CallEntity[] {
    return this.service_queue.calls;
  }

  get panel(): PanelType[] {
    return this.calls.map(
      (call: CallEntity): PanelType => ({
        spaceship_name: call.spaceship.name,
        mission_code: call.spaceship.mission_code,
        description: call.description,
      })
    );
  }

  resolveCall(call: CallEntity) {
    this.service_queue.removeCall(call);
    this.tickets_processed++;
  }
}
