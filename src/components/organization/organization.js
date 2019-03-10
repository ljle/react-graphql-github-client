import React from 'react'
import PropTypes from 'prop-types'
import Repository from '../repository/repository'

const Organization = ({ organization, errors, onFetchMoreIssues }) => {
  const { repository, url, name } = organization

  if (errors) {
    return (
      <p>
        <strong>Something went wrong: </strong>
        {errors.map(error => error.message).join(' ')}
      </p>
    )
  }

  return (
    <div>
      <p>
        <strong>Issues from Organization: </strong>
        <a href={url}>{name}</a>
      </p>
      <Repository
        repository={repository}
        onFetchMoreIssues={onFetchMoreIssues}
      />
    </div>
  )
}

Organization.propTypes = {
  organization: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
    repository: PropTypes.object
  }).isRequired,
  errors: PropTypes.arrayOf(PropTypes.object),
  onFetchMoreIssues: PropTypes.func
}

export default Organization
