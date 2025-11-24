export class SpaceshipsEntity {
  __type = "SpaceshipsEntity";

  name: string;
  mission_code: string;
  sector: string;
  quantity_human: number;

  constructor(data: {
    name: string;
    mission_code: string;
    sector: string;
    quantity_human: number;
  }) {
    this.name = data?.name ?? "";
    this.mission_code = data?.mission_code ?? "";
    this.sector = data?.sector ?? "";
    this.quantity_human = data?.quantity_human ?? 0;
  }
}
