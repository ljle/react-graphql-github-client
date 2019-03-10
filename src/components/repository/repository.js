import React from 'react'
import PropTypes from 'prop-types'
import Issue from './issue/issue'
import Reaction from './issue/reaction/reaction'

const Repository = ({ repository, onFetchMoreIssues }) => {
  const {
    issues: { edges: issues, pageInfo: { hasNextPage } },
    name,
    url
  } = repository

  return (
    <div>
      <p>
        <strong>In Repository: </strong>
        <a href={url}>{name}</a>
      </p>
      <ul>
        {issues.map(e => (
          <li key={e.node.id}>
            <Issue url={e.node.url} title={e.node.title} />
            <ul>
              {e.node.reactions.edges.map(reaction => (
                <li key={reaction.node.id}>
                  <Reaction content={reaction.node.content} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <hr />
      {hasNextPage && (
        <button onClick={onFetchMoreIssues}>More</button>
      )}
    </div>
  )
}

Repository.propTypes = {
  repository: PropTypes.shape({
    issues: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object),
      totalCount: PropTypes.number,
      pageInfo: PropTypes.shape({
        endCursor: PropTypes.string,
        hasNextPage: PropTypes.bool
      })
    }),
    name: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  onFetchMoreIssues: PropTypes.func
}

export default Repository
