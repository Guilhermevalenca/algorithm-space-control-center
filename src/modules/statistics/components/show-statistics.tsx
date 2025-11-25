import { Button, Stack } from "@mui/material";
import database from "../../../plugins/database";
import { swalPlugin } from "../../../plugins/swal";
import { useState } from "react";
import Box from '@mui/material/Box';

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
      <p style={{ textAlign: "left" }}>
        Quantidade de chamados diários: {statistics.total_number_request_day}
      </p>
      <Stack direction="row" spacing={4}>
          <Box>
            🟥 Emergencia:
          {statistics.number_service_requests_by_priority_type.emergency}
          </Box>
          <Box>
            🟧 Alta prioridade:
          {statistics.number_service_requests_by_priority_type.high_priority}
          </Box>
          <Box>
            🟩 Normal: {statistics.number_service_requests_by_priority_type.normal}
          </Box>
      </Stack>
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
