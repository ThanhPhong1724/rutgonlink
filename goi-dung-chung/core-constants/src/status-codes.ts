export const STATUS_CODES = {
    SUCCESS: 'THANH_CONG',
    FAILED: 'THAT_BAI',
    PENDING: 'CHO_XU_LY',
    ACTIVE: 'HOAT_DONG',
    INACTIVE: 'TAM_DUNG',
    LOCKED: 'TAM_KHOA',
    DELETED: 'DA_XOA'
} as const;

export type StatusCode = typeof STATUS_CODES[keyof typeof STATUS_CODES];
