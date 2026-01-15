export const ERR_CODES = {
  SYSTEM: {
    INTERNAL: 'SYS_001',
    VALIDATION: 'SYS_002',
  },
  USER: {
    NOT_FOUND: 'USER_001',
    ALREADY_EXISTS: 'USER_002',
  },
} as const; 