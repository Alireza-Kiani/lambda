// Original file: src/proto/user.proto


export interface _userPackage_EditUserRequest_Payload {
  'name'?: (string);
  'password'?: (string);
  'privilege'?: (string);
  'v'?: (number);
}

export interface _userPackage_EditUserRequest_Payload__Output {
  'name': (string);
  'password': (string);
  'privilege': (string);
  'v': (number);
}

export interface EditUserRequest {
  'id'?: (string);
  'payload'?: (_userPackage_EditUserRequest_Payload | null);
}

export interface EditUserRequest__Output {
  'id': (string);
  'payload': (_userPackage_EditUserRequest_Payload__Output | null);
}
