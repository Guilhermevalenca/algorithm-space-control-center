import { useState, type FormEvent } from "react";
import { AppForm, AppInput, AppButton } from "../../../components";
import database from "../../../plugins/database";
import { SpaceshipsEntity } from "../entities/spaceship.entity";

export default function CreateSpaceship() {
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
    }
  }

  return (
    <>
      <AppForm onSubmit={submit}>
        <AppInput label="Nome" onChange={(e) => setName(e.target.value)} />
        <AppInput
          label="Código da missão"
          onChange={(e) => setMissionCode(e.target.value)}
        />
        <AppInput label="Setor" onChange={(e) => setSector(e.target.value)} />
        <AppInput
          label="Quantidade de pessoas"
          onChange={(e) => setQuantityHuman(Number(e.target.value))}
          type="number"
        />
        <AppButton type="submit">Cadastrar nave espacial</AppButton>
      </AppForm>
    </>
  );
}
