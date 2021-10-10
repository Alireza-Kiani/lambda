// Original file: src/proto/auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { JWT as _authPackage_JWT, JWT__Output as _authPackage_JWT__Output } from '../authPackage/JWT';
import type { NewUser as _userPackage_NewUser, NewUser__Output as _userPackage_NewUser__Output } from '../userPackage/NewUser';

export interface UserServiceClient extends grpc.Client {
  GenerateToken(argument: _userPackage_NewUser, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  GenerateToken(argument: _userPackage_NewUser, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  GenerateToken(argument: _userPackage_NewUser, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  GenerateToken(argument: _userPackage_NewUser, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  generateToken(argument: _userPackage_NewUser, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  generateToken(argument: _userPackage_NewUser, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  generateToken(argument: _userPackage_NewUser, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  generateToken(argument: _userPackage_NewUser, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  
  LoginUser(argument: _userPackage_NewUser, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  LoginUser(argument: _userPackage_NewUser, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  LoginUser(argument: _userPackage_NewUser, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  LoginUser(argument: _userPackage_NewUser, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  loginUser(argument: _userPackage_NewUser, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  loginUser(argument: _userPackage_NewUser, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  loginUser(argument: _userPackage_NewUser, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  loginUser(argument: _userPackage_NewUser, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  GenerateToken: grpc.handleUnaryCall<_userPackage_NewUser__Output, _authPackage_JWT>;
  
  LoginUser: grpc.handleUnaryCall<_userPackage_NewUser__Output, _authPackage_JWT>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  GenerateToken: MethodDefinition<_userPackage_NewUser, _authPackage_JWT, _userPackage_NewUser__Output, _authPackage_JWT__Output>
  LoginUser: MethodDefinition<_userPackage_NewUser, _authPackage_JWT, _userPackage_NewUser__Output, _authPackage_JWT__Output>
}
