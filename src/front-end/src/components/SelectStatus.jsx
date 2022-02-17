import React from 'react'

export default function SelectStatus({ handleChange, status, dataTestId, children }) {
  return (
    <select
      onChange={handleChange}
      name="status"
      value={status}
      data-testid={dataTestId}
      className="form-select custom-select"
      aria-label="Default select example">
      {children}
      <option value="pendente">Pending</option>
      <option value="em andamento">In Progress</option>
      <option value="pronto">Ready</option>
    </select>
  )
}
