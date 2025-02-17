import { PersonType } from '@enums/person-type.enum';

export default function getPersonTypeOptions() {
	return Object.entries(PersonType).map(([key, value]) => ({
    value: key,
    label: value,
  }));
}
