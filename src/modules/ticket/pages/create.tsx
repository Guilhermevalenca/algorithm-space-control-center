import { useState, type FormEvent } from "react";
import { AppButton, AppForm } from "../../../components";
import database from "../../../plugins/database";
import { PriorityEnum } from "../enums/priority.enum";
import { SpecialistEnum } from "../../specialist-assistance/enums/specialist.enum";
import { SelectSpaceship } from "../components/select-spaceship";
import { SelectPriority } from "../components/select-priority";
import { SelectTypeProblem } from "../components/select-type-problem";
import { TicketEntity } from "../entities/ticket.entity";
import type { ManagerTicketEntity } from "../entities/manager-ticket.entity";
import { useNavigate } from "react-router";

export function CreateTicket() {
  const navigate = useNavigate();

  const [spaceship, setSpaceShip] = useState(database.data.spaceships[0]);
  const [priority, setPriority] = useState(PriorityEnum.normal);
  const [type_problem, setTypeProblem] = useState(SpecialistEnum.energy);

  function selectSpaceship(name: string) {
    const spaceship = database.data.spaceships.find(
      (spaceship) => spaceship.name === name
    );
    if (spaceship) {
      setSpaceShip(spaceship);
    }
  }

  function submit(form: FormEvent) {
    form.preventDefault();
    const manager_ticket: ManagerTicketEntity =
      database.data.manager_tickets[0];
    if (manager_ticket) {
      console.log(spaceship);
      manager_ticket.addTicket(
        new TicketEntity({
          priority,
          type_problem,
        }),
        spaceship
      );

      database.data = {
        manager_tickets: [manager_ticket],
      };

      navigate("/");
    }
  }

  return (
    <>
      <AppForm onSubmit={submit}>
        <div>
          <label>Qual a sua nave?</label>
          <SelectSpaceship setSelect={selectSpaceship} />
        </div>
        <div>
          <label>Qual a prioridade ?</label>
          <SelectPriority setSelect={setPriority} />
        </div>
        <div>
          <label>Qual o tipo de problema?</label>
          <SelectTypeProblem setSelect={setTypeProblem} />
        </div>
        <AppButton type="submit">Registrar ticket</AppButton>
      </AppForm>
    </>
  );
}
