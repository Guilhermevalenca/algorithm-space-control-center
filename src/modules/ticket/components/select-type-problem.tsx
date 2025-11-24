import { AppOption, AppSelect } from "../../../components";
import { SpecialistEnum } from "../../specialist-assistance/enums/specialist.enum";

interface IProps {
  setSelect: (value: SpecialistEnum) => void;
}

export function SelectTypeProblem({ setSelect }: IProps) {
  return (
    <AppSelect onChange={(e) => setSelect(String(e.target.value))}>
      <AppOption value={SpecialistEnum.communications}>
        {SpecialistEnum.communications}
      </AppOption>
      <AppOption value={SpecialistEnum.energy}>
        {SpecialistEnum.energy}
      </AppOption>
      <AppOption value={SpecialistEnum.life_support}>
        {SpecialistEnum.life_support}
      </AppOption>
      <AppOption value={SpecialistEnum.life_support}>
        {SpecialistEnum.navigation}
      </AppOption>
    </AppSelect>
  );
}
