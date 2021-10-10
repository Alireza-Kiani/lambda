// Original file: src/proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { EditUserRequest as _userPackage_EditUserRequest, EditUserRequest__Output as _userPackage_EditUserRequest__Output } from '../userPackage/EditUserRequest';
import type { LoginUserRequest as _userPackage_LoginUserRequest, LoginUserRequest__Output as _userPackage_LoginUserRequest__Output } from '../userPackage/LoginUserRequest';
import type { NewUser as _userPackage_NewUser, NewUser__Output as _userPackage_NewUser__Output } from '../userPackage/NewUser';
import type { TokenWithUser as _userPackage_TokenWithUser, TokenWithUser__Output as _userPackage_TokenWithUser__Output } from '../userPackage/TokenWithUser';
import type { User as _userPackage_User, User__Output as _userPackage_User__Output } from '../userPackage/User';
import type { UserId as _userPackage_UserId, UserId__Output as _userPackage_UserId__Output } from '../userPackage/UserId';

export interface UserServiceClient extends grpc.Client {
  CreateNewUser(argument: _userPackage_NewUser, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  CreateNewUser(argument: _userPackage_NewUser, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  CreateNewUser(argument: _userPackage_NewUser, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  CreateNewUser(argument: _userPackage_NewUser, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  createNewUser(argument: _userPackage_NewUser, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  createNewUser(argument: _userPackage_NewUser, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  createNewUser(argument: _userPackage_NewUser, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  createNewUser(argument: _userPackage_NewUser, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  
  DeleteUser(argument: _userPackage_UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  DeleteUser(argument: _userPackage_UserId, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  DeleteUser(argument: _userPackage_UserId, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  DeleteUser(argument: _userPackage_UserId, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  deleteUser(argument: _userPackage_UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  deleteUser(argument: _userPackage_UserId, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  deleteUser(argument: _userPackage_UserId, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  deleteUser(argument: _userPackage_UserId, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  
  EditUser(argument: _userPackage_EditUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  EditUser(argument: _userPackage_EditUserRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  EditUser(argument: _userPackage_EditUserRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  EditUser(argument: _userPackage_EditUserRequest, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  editUser(argument: _userPackage_EditUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  editUser(argument: _userPackage_EditUserRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  editUser(argument: _userPackage_EditUserRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  editUser(argument: _userPackage_EditUserRequest, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  
  GetUser(argument: _userPackage_UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  GetUser(argument: _userPackage_UserId, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  GetUser(argument: _userPackage_UserId, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  GetUser(argument: _userPackage_UserId, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  getUser(argument: _userPackage_UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  getUser(argument: _userPackage_UserId, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  getUser(argument: _userPackage_UserId, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  getUser(argument: _userPackage_UserId, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  
  LoginUser(argument: _userPackage_LoginUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_TokenWithUser__Output) => void): grpc.ClientUnaryCall;
  LoginUser(argument: _userPackage_LoginUserRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _userPackage_TokenWithUser__Output) => void): grpc.ClientUnaryCall;
  LoginUser(argument: _userPackage_LoginUserRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_TokenWithUser__Output) => void): grpc.ClientUnaryCall;
  LoginUser(argument: _userPackage_LoginUserRequest, callback: (error?: grpc.ServiceError, result?: _userPackage_TokenWithUser__Output) => void): grpc.ClientUnaryCall;
  loginUser(argument: _userPackage_LoginUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_TokenWithUser__Output) => void): grpc.ClientUnaryCall;
  loginUser(argument: _userPackage_LoginUserRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _userPackage_TokenWithUser__Output) => void): grpc.ClientUnaryCall;
  loginUser(argument: _userPackage_LoginUserRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_TokenWithUser__Output) => void): grpc.ClientUnaryCall;
  loginUser(argument: _userPackage_LoginUserRequest, callback: (error?: grpc.ServiceError, result?: _userPackage_TokenWithUser__Output) => void): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateNewUser: grpc.handleUnaryCall<_userPackage_NewUser__Output, _userPackage_User>;
  
  DeleteUser: grpc.handleUnaryCall<_userPackage_UserId__Output, _userPackage_User>;
  
  EditUser: grpc.handleUnaryCall<_userPackage_EditUserRequest__Output, _userPackage_User>;
  
  GetUser: grpc.handleUnaryCall<_userPackage_UserId__Output, _userPackage_User>;
  
  LoginUser: grpc.handleUnaryCall<_userPackage_LoginUserRequest__Output, _userPackage_TokenWithUser>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  CreateNewUser: MethodDefinition<_userPackage_NewUser, _userPackage_User, _userPackage_NewUser__Output, _userPackage_User__Output>
  DeleteUser: MethodDefinition<_userPackage_UserId, _userPackage_User, _userPackage_UserId__Output, _userPackage_User__Output>
  EditUser: MethodDefinition<_userPackage_EditUserRequest, _userPackage_User, _userPackage_EditUserRequest__Output, _userPackage_User__Output>
  GetUser: MethodDefinition<_userPackage_UserId, _userPackage_User, _userPackage_UserId__Output, _userPackage_User__Output>
  LoginUser: MethodDefinition<_userPackage_LoginUserRequest, _userPackage_TokenWithUser, _userPackage_LoginUserRequest__Output, _userPackage_TokenWithUser__Output>
}
