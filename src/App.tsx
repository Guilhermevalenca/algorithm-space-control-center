import { Routes, Route } from "react-router";
import Home from "./modules/home/pages";
import Receptionist from "./modules/receptionist/pages";
import SpecialistAssistance from "./modules/specialist-assistance/pages";
import Spaceship from "./modules/spaceship/pages";
import { DefaultLayout } from "./layout/default";
import CreateSpaceship from "./modules/spaceship/pages/create";
import database from "./plugins/database";
import { useEffect } from "react";
import { ReceptionistEntity } from "./modules/receptionist/entities/receptionist.entity";
import { ManagerTicketEntity } from "./modules/ticket/entities/manager-ticket.entity";
import Ticket from "./modules/ticket/pages";
import { CreateTicket } from "./modules/ticket/pages/create";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="/ticket">
          <Route index element={<Ticket />} />
          <Route path="create" element={<CreateTicket />} />
        </Route>
        <Route path="/receptionist" element={<Receptionist />} />
        <Route
          path="/specialist-assistance"
          element={<SpecialistAssistance />}
        />
        <Route path="/spaceship">
          <Route index element={<Spaceship />} />
          <Route path="create" element={<CreateSpaceship />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
