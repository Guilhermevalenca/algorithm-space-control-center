import type { CallEntity } from "../../receptionist/entities/call.entity";

export class ServiceQueueEntity {
  __type = "ServiceQueueEntity";

  calls: CallEntity[] = [];

  constructor(data?: { calls: CallEntity[] }) {
    if (data?.calls && data?.calls.length > 0) {
      this.calls = data.calls;
    }
  }

  removeCall(index: number | CallEntity) {
    if (typeof index === "number") {
      this.calls.splice(index, 1);
    } else if (typeof index === "object") {
      this.calls.splice(this.calls.indexOf(index), 1);
    }
  }

  addCall(call: CallEntity) {
    this.calls.push(call);
  }
}
