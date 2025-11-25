import { useState, type FormEvent } from "react";
import { AppForm, AppInput } from "../../../components";
import database from "../../../plugins/database";
import { SpaceshipsEntity } from "../entities/spaceship.entity";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";

export default function CreateSpaceship() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mission_code, setMissionCode] = useState("");
  const [sector, setSector] = useState("");
  const [quantity_human, setQuantityHuman] = useState(0);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (database.data.spaceships) {
      const spaceships = database.data.spaceships;
      spaceships.push(
        new SpaceshipsEntity({
          name,
          mission_code,
          sector,
          quantity_human,
        })
      );
      database.data = {
        spaceships,
      };

      navigate("/");
    }
  }

  return (
    <>
      <Card>
        <h1>Cadastrar nave</h1>
        <CardContent>
          <AppForm onSubmit={submit}>
            <Box sx={{ mr: "auto" }}>
              <AppInput
                placeholder="Digite o nome da sua nave..."
                label="Nome"
                onChange={(e) => setName(e.target.value)}
              />
              <AppInput
                placeholder="Digite o código da sua missão..."
                label="Código da missão"
                onChange={(e) => setMissionCode(e.target.value)}
              />
              <AppInput
                placeholder="Digite seu setor atual..."
                label="Setor"
                onChange={(e) => setSector(e.target.value)}
              />
              <AppInput
                label="Quantidade de pessoas"
                onChange={(e) => setQuantityHuman(Number(e.target.value))}
                type="number"
              />
            </Box>
            <Stack direction="row" sx={{ ml: "auto" }} spacing={1}>
              <Button variant="outlined" href="/">
                Cancelar
              </Button>
              <Button variant="contained" type="submit">
                Cadastrar nave
              </Button>
            </Stack>
          </AppForm>
        </CardContent>
      </Card>
    </>
  );
}
