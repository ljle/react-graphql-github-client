import React, { useState, useEffect } from 'react'
import axios from '../../config/axios-config'
import { GET_ISSUES_OF_REPOSITORY } from '../../queries'
import Organization from '../organization/organization'

const TITLE = 'React GraphQL GitHub Client'

const App = () => {
  const [path, setPath] = useState(
    'the-road-to-learn-react/the-road-to-learn-react'
  )
  const [organization, setOrganization] = useState(null)
  const [errors, setErrors] = useState(null)

  /* Query API to get issues of repository */
  const getIssuesOfRepository = (path, cursor) => {
    const [organization, repository] = path.split('/')

    return axios.post('', {
      query: GET_ISSUES_OF_REPOSITORY,
      variables: { organization, repository, cursor }
    })
  }

  /* Update state with query results */
  const resolveIssuesQuery = (queryResult, cursor) => {
    const {
      data: {
        data: { organization: organizationResult },
        errors
      }
    } = queryResult

    if (!cursor) {
      setOrganization(organizationResult)
    } else {
      const { edges: oldIssues } = organization.repository.issues
      const { edges: newIssues } = organizationResult.repository.issues
      const updatedIssues = [...oldIssues, ...newIssues]

      setOrganization({
        ...organizationResult,
        repository: {
          ...organizationResult.repository,
          issues: {
            ...organizationResult.repository.issues,
            edges: updatedIssues
          }
        }
      })
    }
    setErrors(errors)
  }

  const onFetchFromGitHub = (path, cursor) => {
    getIssuesOfRepository(path, cursor).then(result =>
      resolveIssuesQuery(result, cursor)
    )
  }

  const onFetchMoreIssues = () => {
    const {
      repository: {
        issues: {
          pageInfo: { endCursor }
        }
      }
    } = organization

    onFetchFromGitHub(path, endCursor)
  }

  const onSubmit = event => {
    event.preventDefault()
    onFetchFromGitHub(path)
  }

  useEffect(() => {
    onFetchFromGitHub(path)
  }, [setOrganization, setPath])

  return (
    <div>
      <h1>{TITLE}</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor='url'>Show open issues for https://github.com/</label>
        <input
          id='url'
          type='text'
          onChange={({ target: { value } }) => setPath(value)}
          value={path}
          style={{ width: '300px' }}
        />
        <button type='submit'>Search</button>
      </form>
      <hr />
      {organization ? (
        <Organization
          organization={organization}
          errors={errors}
          onFetchMoreIssues={onFetchMoreIssues}
        />
      ) : (
        <p>No information yet ...</p>
      )}
    </div>
  )
}

export default App
