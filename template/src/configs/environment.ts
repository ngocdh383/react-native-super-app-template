export interface DomainGroup {
  DEV: string;
  TESTING: string;
  STAGING: string;
  PRODUCTION: string;
}

export enum Environment {
  DEV = 'DEV',
  TESTING = 'TESTING',
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION',
}

export const ENV = Environment.DEV;
