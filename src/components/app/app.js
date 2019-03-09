import React, { useState, useEffect } from 'react'
import axios from '../../config/axios-config'
import { GET_ISSUES_OF_REPOSITORY } from '../../queries'
import Organization from '../organization/organization'

const TITLE = 'React GraphQL GitHub Client'

const App = () => {
  const [path, setPath] = useState(
    'the-road-to-learn-react/the-road-to-learn-react'
  )
  const [organization, setOrganization] = useState('the-road-to-learn-react')
  const [errors, setErrors] = useState(null)

  /* Query API to get issues of repository */
  const getIssuesOfRepository = path => {
    const [organization, repository] = path.split('/')

    return axios.post('', {
      query: GET_ISSUES_OF_REPOSITORY,
      variables: { organization, repository }
    })
  }

  /* Update state with query results */
  const resolveIssuesQuery = queryResult => {
    const {
      data: {
        data: { organization },
        errors
      }
    } = queryResult
    setOrganization(organization)
    setErrors(errors)
  }

  const onFetchFromGitHub = path => {
    getIssuesOfRepository(path).then(resolveIssuesQuery)
  }

  const onSubmit = event => {
    event.preventDefault()
    onFetchFromGitHub(path)
  }

  useEffect(() => {
    onFetchFromGitHub(path)
  }, [setOrganization])

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
        <Organization organization={organization} errors={errors} />
      ) : (
        <p>No information yet ...</p>
      )}
    </div>
  )
}

export default App
