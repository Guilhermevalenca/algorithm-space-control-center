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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
    <Card>
      <h1>Adicionar Ticket</h1>
      <CardContent>
       <AppForm onSubmit={submit}>
        <Stack>
          <Box sx={{mr: "auto"}}>
            <label>Qual a sua nave?</label>
          </Box>
          <SelectSpaceship setSelect={selectSpaceship} />
        </Stack>
        <Stack>
          <Box sx={{mr: "auto"}}>
            <label>Qual é a sua prioridade?</label>
          </Box>
          <SelectPriority setSelect={setPriority} />
        </Stack>
        <Stack>
          <Box sx={{mr: "auto"}}>
            <label>Qual o tipo do problema?</label>
          </Box>
          <SelectTypeProblem setSelect={setTypeProblem} />
        </Stack>
        <Stack direction="row" sx={{ ml: "auto" }} spacing={1}>
          <Button variant="outlined" href="/">Cancelar</Button>
          <Button variant="contained" type="submit">Registrar ticket</Button>
        </Stack>
      </AppForm>
      </CardContent>
    </Card>
    </>
  );
}
