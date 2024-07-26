import LoginDTO from './loginDTO';

export interface JwtPayloadDTO extends Omit<LoginDTO, 'password'> {}
