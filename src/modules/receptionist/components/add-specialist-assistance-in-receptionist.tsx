import { useState } from "react";
import { AppForm, AppButton, AppOption, AppSelect } from "../../../components";
import { SpecialistEnum } from "../../specialist-assistance/enums/specialist.enum";
import { swalPlugin } from "../../../plugins/swal";
import { ReceptionistEntity } from "../entities/receptionist.entity";
import { SpecialistAssistanceEntity } from "../../specialist-assistance/entities/specialist_assistance.entity";
import database from "../../../plugins/database";

interface IProps {
  receptionist: ReceptionistEntity;
  forceUpdate: () => void;
}

export function AddSpecialistAssistanceInReceptionist({
  receptionist,
  forceUpdate,
}: IProps) {
  function submit(specialistAssistance: SpecialistAssistanceEntity) {
    receptionist.addSpecialistAssistance(specialistAssistance);
    const specialistAssistances = database.data.specialist_assistances;
    if (specialistAssistances) {
      specialistAssistances.push(specialistAssistance);
    }
    database.data = {
      receptionists: [receptionist],
      specialist_assistances: specialistAssistances,
    };
    forceUpdate();

    swalPlugin.close();
  }

  function showForm() {
    swalPlugin.fire({
      html: (
        <div>
          <h1>Escolha a especialidade e adicione um especialista a listagem</h1>
          <Form submit={submit} />
        </div>
      ),
    });
  }
  return (
    <AppButton onClick={showForm}>
      Adicionar especialista a listagem do recepcionista
    </AppButton>
  );
}

const Form = ({ submit }) => {
  const [typeSpecialist, setTypeSpecialist] = useState(
    SpecialistEnum.communications
  );
  return (
    <AppForm
      onSubmit={(e) => {
        e.preventDefault();
        submit(
          new SpecialistAssistanceEntity({
            specialist: typeSpecialist,
          })
        );
      }}
    >
      <AppSelect onChange={(e) => setTypeSpecialist(e.target.value)}>
        <AppOption value={SpecialistEnum.communications}>
          comunicações
        </AppOption>
        <AppOption value={SpecialistEnum.energy}>energia</AppOption>
        <AppOption value={SpecialistEnum.navigation}>navegação</AppOption>
        <AppOption value={SpecialistEnum.life_support}>
          suporte de vida
        </AppOption>
      </AppSelect>
      <AppButton type="submit">Adicionar</AppButton>
    </AppForm>
  );
};
