import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AuthServiceClient as _authPackage_AuthServiceClient, AuthServiceDefinition as _authPackage_AuthServiceDefinition } from './authPackage/AuthService';
import type { UserServiceClient as _userPackage_UserServiceClient, UserServiceDefinition as _userPackage_UserServiceDefinition } from './userPackage/UserService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  authPackage: {
    Access: MessageTypeDefinition
    AuthService: SubtypeConstructor<typeof grpc.Client, _authPackage_AuthServiceClient> & { service: _authPackage_AuthServiceDefinition }
    GenerateTokenRequest: MessageTypeDefinition
    JWT: MessageTypeDefinition
    PublicKey: MessageTypeDefinition
    Refresh: MessageTypeDefinition
  }
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
      Timestamp: MessageTypeDefinition
    }
  }
  userPackage: {
    DeleteUserResponse: MessageTypeDefinition
    EditUserRequest: MessageTypeDefinition
    LoginUserRequest: MessageTypeDefinition
    NewUser: MessageTypeDefinition
    TokenWithUser: MessageTypeDefinition
    User: MessageTypeDefinition
    UserId: MessageTypeDefinition
    UserService: SubtypeConstructor<typeof grpc.Client, _userPackage_UserServiceClient> & { service: _userPackage_UserServiceDefinition }
    Users: MessageTypeDefinition
  }
}

