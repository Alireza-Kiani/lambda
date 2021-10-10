// Original file: src/proto/auth.proto

import type { User as _userPackage_User, User__Output as _userPackage_User__Output } from '../userPackage/User';

export interface GenerateTokenRequest {
  'user'?: (_userPackage_User | null);
  'userAgent'?: (string);
  'clientIp'?: (string);
}

export interface GenerateTokenRequest__Output {
  'user': (_userPackage_User__Output | null);
  'userAgent': (string);
  'clientIp': (string);
}
