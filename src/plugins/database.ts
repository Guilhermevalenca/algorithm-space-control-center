import { stringify, parse } from "flatted";
import { ReceptionistEntity } from "../modules/receptionist/entities/receptionist.entity";
import { SpaceshipsEntity } from "../modules/spaceship/entities/spaceship.entity";
import { SpecialistAssistanceEntity } from "../modules/specialist-assistance/entities/specialist_assistance.entity";
import { ManagerTicketEntity } from "../modules/ticket/entities/manager-ticket.entity";
import { TicketEntity } from "../modules/ticket/entities/ticket.entity";
import { ServiceQueueEntity } from "../modules/specialist-assistance/entities/service_queue.entity";
import { CallEntity } from "../modules/receptionist/entities/call.entity";

const classMap = {
  CallEntity,
  ReceptionistEntity,
  SpaceshipsEntity,
  ServiceQueueEntity,
  SpecialistAssistanceEntity,
  ManagerTicketEntity,
  TicketEntity,
};

type DataType = {
  receptionists: ReceptionistEntity[];
  spaceships: SpaceshipsEntity[];
  specialist_assistances: SpecialistAssistanceEntity[];
  manager_tickets: ManagerTicketEntity[];
};

export class Database {
  #data: Map<string, string> = new Map();
  statistics = {
    total_number_request_day: 0,
    number_service_requests_by_priority_type: {
      emergency: 0,
      high_priority: 0,
      normal: 0,
    },
    spaceships_with_number_calls: [] as {
      spaceship_name: string;
      number_calls: number;
    }[],
  };

  constructor() {
    let data: {
      receptionists: ReceptionistEntity[];
      spaceships: SpaceshipsEntity[];
      specialist_assistances: SpecialistAssistanceEntity[];
      manager_tickets: ManagerTicketEntity[];
    };

    const json_data = localStorage.getItem("data");
    if (json_data && typeof json_data === "string") {
      data = parse(json_data);
    } else {
      data = {
        receptionists: [],
        spaceships: [],
        specialist_assistances: [],
        manager_tickets: [],
      };
    }
    this.#data.set("data", stringify(data));

    const statistics = localStorage.getItem("statistics");
    if (statistics && typeof statistics === "string") {
      this.statistics = parse(statistics);
    } else {
      localStorage.setItem("statistics", stringify(this.statistics));
    }
  }

  get data(): DataType {
    const raw = parse(String(this.#data.get("data")));
    const response = reviveClasses(raw, classMap);

    const manager_tickets = response.manager_tickets ?? [];
    const receptionists = response.receptionists ?? [];

    if (!(response.manager_tickets && response.manager_tickets.length > 0)) {
      manager_tickets.push(new ManagerTicketEntity());
    }
    if (!(response.receptionists && response.receptionists.length > 0)) {
      receptionists.push(
        new ReceptionistEntity({
          manage_ticket: response.manager_tickets[0],
        })
      );
      if (receptionists[0].specialist_assistances) {
        response.specialist_assistances =
          receptionists[0].specialist_assistances;
      }
    }
    return {
      ...response,
      specialist_assistances:
        receptionists[0].specialist_assistances ??
        response.specialist_assistances,
    };
  }

  set data(data: Partial<DataType>) {
    const raw = parse(String(this.#data.get("data")));
    const newData = {
      receptionists: data?.receptionists ?? raw.receptionists,
      spaceships: data?.spaceships ?? raw.spaceships,
      specialist_assistances:
        data?.specialist_assistances ?? raw.specialist_assistances,
      manager_tickets: data?.manager_tickets ?? raw.manager_tickets,
    };

    const json_data = stringify(newData);

    this.#data.set("data", json_data);
    localStorage.setItem("data", json_data);
  }

  updateStatistics(partial: Partial<typeof this.statistics>) {
    const newStatistics = {
      ...this.statistics,
      ...partial,
    };

    const serialized = stringify(newStatistics);
    localStorage.setItem("statistics", serialized);

    this.statistics = newStatistics;

    console.log(newStatistics);
  }
}

export default new Database();

function reviveClasses(
  obj: any,
  classMap: Record<string, any>,
  cache = new WeakMap()
) {
  if (obj === null || typeof obj !== "object") return obj;

  // se este objeto já foi transformado, apenas retorna
  if (cache.has(obj)) return cache.get(obj);

  // se objeto tem um "type" indicando a classe
  if (obj.__type && classMap[obj.__type]) {
    const inst = new classMap[obj.__type]();
    cache.set(obj, inst);

    // copiar atributos recursivamente
    for (const key of Object.keys(obj)) {
      if (key === "__type") continue;
      inst[key] = reviveClasses(obj[key], classMap, cache);
    }

    return inst;
  }

  // arrays
  if (Array.isArray(obj)) {
    const arr: any[] = [];
    cache.set(obj, arr);

    for (const item of obj) {
      arr.push(reviveClasses(item, classMap, cache));
    }

    return arr;
  }

  // objetos normais
  const newObj: any = {};
  cache.set(obj, newObj);

  for (const key of Object.keys(obj)) {
    newObj[key] = reviveClasses(obj[key], classMap, cache);
  }

  return newObj;
}
