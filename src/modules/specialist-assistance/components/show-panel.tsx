import { AppCard } from "../../../components";
import database from "../../../plugins/database";
import type { SpecialistAssistanceEntity } from "../entities/specialist_assistance.entity";
import { SpecialistEnum } from "../enums/specialist.enum";

interface IProps {
  specialistAssistances: SpecialistAssistanceEntity[];
}

export function ShowPanel({ specialistAssistances }: IProps) {
  let translate: string = "Comunicação";
  if (specialistAssistances && specialistAssistances.length > 0) {
    if (specialistAssistances[0].specialist === SpecialistEnum.communications) {
      translate = "Comunicação";
    } else if (specialistAssistances[0].specialist === SpecialistEnum.energy) {
      translate = "Energia";
    } else if (
      specialistAssistances[0].specialist === SpecialistEnum.navigation
    ) {
      translate = "Navegação";
    } else if (
      specialistAssistances[0].specialist === SpecialistEnum.life_support
    ) {
      translate = "Suporte de vida";
    }
    console.log(database.data);
  }
  return (
    <AppCard>
      <h3>{translate}</h3>
      {specialistAssistances.map((item, index) => (
        <div key={index}>
          {item.panel.map((panel, index) => (
            <div key={index}>
              <ul>{panel.spaceship_name}</ul>
              <ul>{panel.mission_code}</ul>
              <ul>{panel.description}</ul>
              <fieldset />
            </div>
          ))}
        </div>
      ))}
    </AppCard>
  );
}
