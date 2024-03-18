import React from 'react'

export default function PhoneCell({ value, valueFormatted, ...other }) {
    return (
        <div>{valueFormatted}</div>
    )
}
