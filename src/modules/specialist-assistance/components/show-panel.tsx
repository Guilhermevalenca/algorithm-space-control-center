import type { SpecialistAssistanceEntity } from "../entities/specialist_assistance.entity";
import Divider from '@mui/material/Divider';

interface IProps {
  specialistAssistances: SpecialistAssistanceEntity[];
}

export function ShowPanel({ specialistAssistances }: IProps) {
  return (
    <>
      {specialistAssistances.map((item, index) => (
        <div key={index}>
          {item.panel.map((panel, index) => (
            <div key={index}>
              <ul>{panel.spaceship_name}</ul>
              <ul>{panel.mission_code}</ul>
              <ul>{panel.description}</ul>
               <Divider />
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
