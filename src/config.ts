import * as dotenv from 'dotenv';
dotenv.config();
import * as env from 'env-var';
export const NETWORK: string = env.get('NETWORK').required(true).asString();
export const PORT: number = env.get('PORT').required(true).asInt();
export const FEE_PER_BYTE: number = env.get('FEE_PER_BYTE').required(true).asInt();
export const BYTES_PER_IN: number = env.get('BYTES_PER_IN').required(true).asInt();
export const BYTES_PER_OUT: number = env.get('BYTES_PER_OUT').required(true).asInt();
export const CONST_BYTES: number = env.get('CONST_BYTES').required(true).asInt();
