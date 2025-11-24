import { AppOption, AppSelect } from "../../../components";
import { PriorityEnum } from "../enums/priority.enum";

interface IProps {
  setSelect: (value: PriorityEnum) => void;
}

export function SelectPriority({ setSelect }: IProps) {
  return (
    <AppSelect onChange={(e) => setSelect(String(e.target.value))}>
      <AppOption>{PriorityEnum.normal}</AppOption>
      <AppOption>{PriorityEnum.high_priority}</AppOption>
      <AppOption>{PriorityEnum.emergency}</AppOption>
    </AppSelect>
  );
}
