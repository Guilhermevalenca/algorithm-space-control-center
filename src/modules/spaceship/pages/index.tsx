import { useEffect, useState } from "react";
import database from "../../../plugins/database";
import type { SpaceshipsEntity } from "../entities/spaceship.entity";
import { RenderSpaceship } from "../components/render-spaceship";

export default function Spaceship() {
  const [spaceships, setSpaceships] = useState<SpaceshipsEntity[]>([]);

  useEffect(() => {
    if (database.data.spaceships) {
      setSpaceships(database.data.spaceships);
    }
  }, []);
  return (
    <>
      <h1>Página das naves espaciais!</h1>
      {spaceships.map((spaceship, index) => (
        <RenderSpaceship key={index} spaceship={spaceship} />
      ))}
    </>
  );
}
