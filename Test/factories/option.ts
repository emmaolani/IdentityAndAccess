

type options = {
    emailType: 'active' | 'inActive';
    phoneType: 'active' | 'inActive';
    phoneVerificationCodeType: 'new' | 'expired' | 'null';
    emailVerificationCodeType: 'new' | 'expired' | 'null';
}

export type option = options;