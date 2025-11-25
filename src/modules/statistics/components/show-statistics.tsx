import { Button } from "@mui/material";
import database from "../../../plugins/database";
import { swalPlugin } from "../../../plugins/swal";
import { useState } from "react";

export function ShowStatistics() {
  const [statistics] = useState(database.statistics);
  console.log(statistics);
  const [best_spaceship] = useState(
    statistics.spaceships_with_number_calls.sort(
      (a, b) => b.number_calls - a.number_calls
    )[0]
  );
  return (
    <>
      <p>
        Quantidade de chamados diários: {statistics.total_number_request_day}
      </p>
      <div>
        <p>Quantidade de chamados por prioridade:</p>
        <ul>
          Emergencia:
          {statistics.number_service_requests_by_priority_type.emergency}
        </ul>
        <ul>
          Alta prioridade:
          {statistics.number_service_requests_by_priority_type.high_priority}
        </ul>
        <ul>
          Normal: {statistics.number_service_requests_by_priority_type.normal}
        </ul>
      </div>
      {best_spaceship && (
        <>
          <p>Nome da nave mais chamada: {best_spaceship.spaceship_name}</p>
          <p>Quantidade de chamados: {best_spaceship.number_calls}</p>
        </>
      )}
    </>
  );
}

export function ShowModalStatistics() {
  function show() {
    swalPlugin.fire({
      html: <ShowStatistics />,
    });
  }

  return <Button onClick={show}>Mostrar estatísticas</Button>;
}
