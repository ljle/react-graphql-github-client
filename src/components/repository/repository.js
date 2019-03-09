import React from 'react'

const Repository = ({ repository }) => {
  if (repository) {
    const {
      issues: { edges: issues },
      name,
      url
    } = repository

    return (
      <div>
        <p>
          <strong>In Repository:</strong>
          <a href={url}>{name}</a>
        </p>
        <ul>
          {issues.map(issue => (
            <li key={issue.node.id}>
              <a href={issue.node.url}>{issue.node.title}</a>
            </li>
          ))}
        </ul>
      </div>
    )
  } else {
    return null
  }
}

export default Repository
