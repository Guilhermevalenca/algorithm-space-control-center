import type { SpaceshipsEntity } from "../entities/spaceship.entity";

interface IProps {
  spaceship: SpaceshipsEntity;
}

export function RenderSpaceship({ spaceship }: IProps) {
  return (
    <div>
      <p>Nome: {spaceship.name}</p>
      <p>Codigo da missão: {spaceship.mission_code}</p>
      <p>Quantidade de pessoas: {spaceship.quantity_human}</p>
      <p>Setor: {spaceship.sector}</p>
    </div>
  );
}
