import { FirmType } from 'types/api/firm';

export type UserRoleType = 'client' | 'employee' | 'owner';

type Attrs = {
  id: number;
  name: string;
  email: string;
  role: UserRoleType;
}

type Includes = {
  firm: FirmType;
  policy: { canEdit: boolean },
}

export type UserIncludesType = Includes;

export type UserType<K extends keyof Includes | never = never> = Attrs & Pick<Includes, K>;
