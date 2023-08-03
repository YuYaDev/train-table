// actions.js
export const FORM_SET_VALUE = 'FORM_SET_VALUE';

//генератор экшена, принипмает ключ значение поля
export const setFormValue = (global_idx: number, item_idx: number, field: string, value: number) => ({
    type: FORM_SET_VALUE,
    global_idx,
    item_idx,
    field,
    value
})