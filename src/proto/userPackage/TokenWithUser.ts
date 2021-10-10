// Original file: src/proto/user.proto

import type { JWT as _authPackage_JWT, JWT__Output as _authPackage_JWT__Output } from '../authPackage/JWT';
import type { User as _userPackage_User, User__Output as _userPackage_User__Output } from '../userPackage/User';

export interface TokenWithUser {
  'token'?: (_authPackage_JWT | null);
  'user'?: (_userPackage_User | null);
}

export interface TokenWithUser__Output {
  'token': (_authPackage_JWT__Output | null);
  'user': (_userPackage_User__Output | null);
}
