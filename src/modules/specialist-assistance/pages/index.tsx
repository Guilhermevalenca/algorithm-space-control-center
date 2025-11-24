import { useEffect, useState } from "react";
import { SpecialistAssistanceEntity } from "../entities/specialist_assistance.entity";
import database from "../../../plugins/database";
import { SpecialistEnum } from "../enums/specialist.enum";
import { ShowPanel } from "../components/show-panel";

export default function SpecialistAssistance() {
  const [specialistAssistanceCom, setSpecialistAssistanceCom] = useState<
    SpecialistAssistanceEntity[]
  >([]);
  const [specialistAssistanceEnergy, setSpecialistAssistanceEnergy] = useState<
    SpecialistAssistanceEntity[]
  >([]);
  const [specialistAssistanceNav, setSpecialistAssistanceNav] = useState<
    SpecialistAssistanceEntity[]
  >([]);
  const [specialistAssistanceLife, setSpecialistAssistanceLife] = useState<
    SpecialistAssistanceEntity[]
  >([]);

  useEffect(() => {
    if (database.data.specialist_assistances) {
      setSpecialistAssistanceCom(
        database.data.specialist_assistances.filter(
          (item) => item.specialist === SpecialistEnum.communications
        )
      );
      setSpecialistAssistanceEnergy(
        database.data.specialist_assistances.filter(
          (item) => item.specialist === SpecialistEnum.energy
        )
      );
      setSpecialistAssistanceNav(
        database.data.specialist_assistances.filter(
          (item) => item.specialist === SpecialistEnum.navigation
        )
      );
      setSpecialistAssistanceLife(
        database.data.specialist_assistances.filter(
          (item) => item.specialist === SpecialistEnum.life_support
        )
      );
    }
  }, []);
  return (
    <>
      <h1>Painel de todos os especialistas, por especialidade</h1>
      <ShowPanel specialistAssistances={specialistAssistanceCom} />
      <ShowPanel specialistAssistances={specialistAssistanceEnergy} />
      <ShowPanel specialistAssistances={specialistAssistanceLife} />
      <ShowPanel specialistAssistances={specialistAssistanceNav} />
    </>
  );
}
