import React from 'react'

const Form = ({ className, children, ...props }) => (
  <form className={`${className}`} {...props}>
    {children}
  </form>
)

export const Field = ({ className, children, ...props }) => (
  <div className={`${className} mb-5`} {...props}>
    {children}
  </div>
)

export const Label = ({ className, children, ...props }) => (
  <label className={`${className} block mb-2 text-sm text-gray-800`} {...props}>
    {children}
  </label>
)

export const Input = ({ className, ...props }) => (
  <input className={`${className} block w-full p-2 rounded border`} {...props} />
)

export const TextArea = ({ className, ...props }) => (
  <textarea className={`${className} block w-full p-2 rounded border`} {...props} />
)

export const Select = ({ className, children, ...props }) => (
  <select className={`${className}`} {...props}>
    {children}
  </select>
)

export const ErrorAlert = ({ error }) => (
  error ? (
    <div className="border border-red-500 text-xs rounded bg-red-200 text-red-500 mb-4 p-2 over-flow-auto">
      {error.message ? error.message : error}
    </div>
  ) : null
)

export default Form
