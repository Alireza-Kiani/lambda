// Original file: src/proto/auth.proto


export interface JWT {
  'accessToken'?: (string);
  'refreshToken'?: (string);
  'expiresIn'?: (number);
  'tokenType'?: (string);
}

export interface JWT__Output {
  'accessToken': (string);
  'refreshToken': (string);
  'expiresIn': (number);
  'tokenType': (string);
}
