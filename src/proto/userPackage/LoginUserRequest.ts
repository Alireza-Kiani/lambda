// Original file: src/proto/user.proto

import type { NewUser as _userPackage_NewUser, NewUser__Output as _userPackage_NewUser__Output } from '../userPackage/NewUser';

export interface LoginUserRequest {
  'user'?: (_userPackage_NewUser | null);
  'userAgent'?: (string);
  'clientIp'?: (string);
}

export interface LoginUserRequest__Output {
  'user': (_userPackage_NewUser__Output | null);
  'userAgent': (string);
  'clientIp': (string);
}
