// Original file: src/proto/user.proto

import type { User as _userPackage_User, User__Output as _userPackage_User__Output } from '../userPackage/User';

export interface VerifiedTokenResponse {
  'user'?: (_userPackage_User | null);
  'sessionId'?: (string);
}

export interface VerifiedTokenResponse__Output {
  'user': (_userPackage_User__Output | null);
  'sessionId': (string);
}
