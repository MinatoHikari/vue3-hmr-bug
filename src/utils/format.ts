export function getForm(
    params: Record<string, any>,
    withIndex = true,
    addEmpty = false,
): FormData {
    const form = new FormData();
    for (const key in params) {
        const condition = addEmpty || params[key] || params[key] === 0;
        if (condition && !Array.isArray(params[key])) {
            form.append(key, params[key]);
        }
        if (Array.isArray(params[key])) {
            for (let i = 0; i < params[key].length; i++) {
                if (addEmpty || params[key][i] !== '') {
                    const paramKey = withIndex ? `${key}[${i}]` : `${key}`;
                    console.log(paramKey, params[key][i]);
                    form.append(paramKey, params[key][i]);
                }
            }
        }
    }
    console.log('form', form);
    return form;
}
