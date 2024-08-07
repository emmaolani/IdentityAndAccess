type fields = ['id', 'email', 'password', 'firstName', 'lastName', 'phoneNumber', 'country', 'state', 'town', 'postalCode', 'status', 'OTP']; 

type options = {
    shouldFillForm: boolean,
    shouldEnterInvalidInputInField: boolean | false,
    shouldEnterEmptyStringInField: boolean | false,
    field: [fields[any]?, fields[any]?, fields[any]?, fields[any]?, fields[any]?, fields[any]?,
    fields[any]?, fields[any]?, fields[any]?, fields[any]?, fields[any]?, fields[any]?]
    
}

export type option = options;