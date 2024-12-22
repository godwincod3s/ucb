import React from 'react';
export const useForm = (initialState: any = {}) => {
    const [ formValues, setFormValues ] = React.useState(initialState)

    // console.log(formValues)

    return [
        formValues,
        (e: any) => {
            setFormValues( {
                ...formValues,
                [e.target.name]: e.target.type === "checkbox" ? (e.target.checked ? true : false ) : e.target.value //use switch for other cases
            })
        }
    ]
}