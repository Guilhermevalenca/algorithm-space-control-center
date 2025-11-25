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
            <div key={index} style={{textAlign: "left"}}>
              <p>{panel.spaceship_name}</p>
              <p>{panel.mission_code}</p>
              <p>{panel.description}</p>
               <Divider />
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
