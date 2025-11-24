import { useEffect, useState } from "react";
import { AppOption, AppSelect } from "../../../components";
import type { SpaceshipsEntity } from "../../spaceship/entities/spaceship.entity";
import database from "../../../plugins/database";

interface IProps {
  setSelect: (name: string) => void;
}

export function SelectSpaceship({ setSelect }: IProps) {
  const [spaceships, setSpaceships] = useState<SpaceshipsEntity[]>([]);

  useEffect(() => {
    if (database.data.spaceships) {
      setSpaceships(database.data.spaceships);
    }
  }, []);

  return (
    <AppSelect onChange={(e) => setSelect(String(e.target.value))}>
      {spaceships.map((spaceship, index) => (
        <AppOption key={index} value={spaceship.name}>
          {spaceship.name}
        </AppOption>
      ))}
    </AppSelect>
  );
}
