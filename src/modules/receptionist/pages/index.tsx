import { useEffect, useState } from "react";
import type { ReceptionistEntity } from "../entities/receptionist.entity";
import database from "../../../plugins/database";
import { AddSpecialistAssistanceInReceptionist } from "../components/add-specialist-assistance-in-receptionist";
import { useForceUpdate } from "../../../utils/force-reload";
import { AddCall } from "../components/add-call";

export default function Receptionist() {
  const forceUpdate = useForceUpdate();
  const [receptionist, setReceptionist] = useState<ReceptionistEntity>();
  const [quantSpecialist, setQuantSpecialist] = useState(0);

  useEffect(() => {
    if (database.data.receptionists) {
      setReceptionist(database.data.receptionists[0]);
    }
  }, []);
  useEffect(() => {
    if (database.data.specialist_assistances) {
      setQuantSpecialist(database.data.specialist_assistances.length);
    }
  });
  return (
    <>
      <h1>Página de recepcionistas</h1>
      <p>Quantidade de especialistas no momento: {quantSpecialist}</p>
      {receptionist && (
        <AddSpecialistAssistanceInReceptionist
          receptionist={receptionist}
          forceUpdate={() => forceUpdate()}
        />
      )}

      <h1>Atender chamados</h1>
      {receptionist && <AddCall receptionist={receptionist} />}
    </>
  );
}
