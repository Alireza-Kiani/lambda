// Original file: src/proto/auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Access as _authPackage_Access, Access__Output as _authPackage_Access__Output } from '../authPackage/Access';
import type { GenerateTokenRequest as _authPackage_GenerateTokenRequest, GenerateTokenRequest__Output as _authPackage_GenerateTokenRequest__Output } from '../authPackage/GenerateTokenRequest';
import type { JWT as _authPackage_JWT, JWT__Output as _authPackage_JWT__Output } from '../authPackage/JWT';
import type { Refresh as _authPackage_Refresh, Refresh__Output as _authPackage_Refresh__Output } from '../authPackage/Refresh';
import type { User as _userPackage_User, User__Output as _userPackage_User__Output } from '../userPackage/User';

export interface AuthServiceClient extends grpc.Client {
  CheckAuth(argument: _authPackage_Access, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  CheckAuth(argument: _authPackage_Access, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  CheckAuth(argument: _authPackage_Access, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  CheckAuth(argument: _authPackage_Access, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  checkAuth(argument: _authPackage_Access, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  checkAuth(argument: _authPackage_Access, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  checkAuth(argument: _authPackage_Access, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  checkAuth(argument: _authPackage_Access, callback: (error?: grpc.ServiceError, result?: _userPackage_User__Output) => void): grpc.ClientUnaryCall;
  
  GenerateToken(argument: _authPackage_GenerateTokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  GenerateToken(argument: _authPackage_GenerateTokenRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  GenerateToken(argument: _authPackage_GenerateTokenRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  GenerateToken(argument: _authPackage_GenerateTokenRequest, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  generateToken(argument: _authPackage_GenerateTokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  generateToken(argument: _authPackage_GenerateTokenRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  generateToken(argument: _authPackage_GenerateTokenRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  generateToken(argument: _authPackage_GenerateTokenRequest, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  
  RefreshToken(argument: _authPackage_Refresh, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  RefreshToken(argument: _authPackage_Refresh, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  RefreshToken(argument: _authPackage_Refresh, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  RefreshToken(argument: _authPackage_Refresh, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  refreshToken(argument: _authPackage_Refresh, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  refreshToken(argument: _authPackage_Refresh, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  refreshToken(argument: _authPackage_Refresh, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  refreshToken(argument: _authPackage_Refresh, callback: (error?: grpc.ServiceError, result?: _authPackage_JWT__Output) => void): grpc.ClientUnaryCall;
  
}

export interface AuthServiceHandlers extends grpc.UntypedServiceImplementation {
  CheckAuth: grpc.handleUnaryCall<_authPackage_Access__Output, _userPackage_User>;
  
  GenerateToken: grpc.handleUnaryCall<_authPackage_GenerateTokenRequest__Output, _authPackage_JWT>;
  
  RefreshToken: grpc.handleUnaryCall<_authPackage_Refresh__Output, _authPackage_JWT>;
  
}

export interface AuthServiceDefinition extends grpc.ServiceDefinition {
  CheckAuth: MethodDefinition<_authPackage_Access, _userPackage_User, _authPackage_Access__Output, _userPackage_User__Output>
  GenerateToken: MethodDefinition<_authPackage_GenerateTokenRequest, _authPackage_JWT, _authPackage_GenerateTokenRequest__Output, _authPackage_JWT__Output>
  RefreshToken: MethodDefinition<_authPackage_Refresh, _authPackage_JWT, _authPackage_Refresh__Output, _authPackage_JWT__Output>
}
