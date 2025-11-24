import { useState } from "react";
import { AppButton, AppForm } from "../../../components";
import database from "../../../plugins/database";
import { swalPlugin } from "../../../plugins/swal";
import type { ManagerTicketEntity } from "../../ticket/entities/manager-ticket.entity";
import type { ReceptionistEntity } from "../entities/receptionist.entity";
import type { TicketEntity } from "../../ticket/entities/ticket.entity";
import type { SpaceshipsEntity } from "../../spaceship/entities/spaceship.entity";

interface IProps {
  receptionist: ReceptionistEntity;
}

export function AddCall({ receptionist }: IProps) {
  function submit(
    ticket: TicketEntity,
    spaceship: SpaceshipsEntity,
    description: string
  ) {
    console.log(description);
    receptionist.createCall(ticket, spaceship, description);
    database.data = {
      receptionists: [receptionist],
    };
  }

  function showForm() {
    const manager_ticket: ManagerTicketEntity =
      database.data.manager_tickets[0];
    if (manager_ticket) {
      const response = manager_ticket.ticket_with_higher_priority;
      console.log(response);
      if (response?.ticket && response?.spaceship) {
        const { ticket, spaceship } = response;
        swalPlugin.fire({
          html: <Form ticket={ticket} spaceship={spaceship} submit={submit} />,
        });
      } else {
        swalPlugin.fire({
          html: (
            <div>
              <h1>Não há chamados para serem atendidos</h1>
            </div>
          ),
        });
      }
    }
  }

  return <AppButton onClick={showForm}>Atender proximo chamado</AppButton>;
}

interface IPropForm {
  ticket: TicketEntity;
  spaceship: SpaceshipsEntity;
  submit: (
    ticket: TicketEntity,
    spaceship: SpaceshipsEntity,
    description: string
  ) => void;
}

const Form = ({ ticket, spaceship, submit }: IPropForm) => {
  const [description, setDescription] = useState("");
  return (
    <AppForm
      onSubmit={(e) => {
        e.preventDefault();
        submit(ticket, spaceship, description);
      }}
    >
      <h3>Chamado para ser atendido</h3>
      <p>Número do ticket: {ticket.number_sequence}</p>
      <p>nave espacial: {spaceship.name}</p>
      <p>Prioridade: {ticket.priority}</p>
      <p>Tipo de problema Problema: {ticket.type_problem}</p>
      <div>
        <label>Descreva seu problema:</label>
        <textarea
          onChange={(e) => {
            console.log(e.target.value);
            setDescription(String(e.target.value));
          }}
        />
      </div>
      <AppButton type="submit">Registrar chamado</AppButton>
    </AppForm>
  );
};
