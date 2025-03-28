import { UserRole } from '@enums/user-role.enum';

export const roleLabels: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Administrator',
  [UserRole.DIRECTOR]: 'Director',
  [UserRole.SECRETARY]: 'Secretar',
  [UserRole.HEAD_OF_DIRECTION]: 'Șef direcție',
};

export default function getUserRoleOptions() {
  return Object.entries(UserRole)
    .filter(([_, value]) => value !== UserRole.ALL)
    .map(([key, value]) => ({
      value: value,
      label: roleLabels[value as UserRole] || value,
    }));
}
