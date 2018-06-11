import React from 'react'
import Link from 'gatsby-link'
import Graph from '../components/graph/Graph'

const IndexPage = () => (
  <div>
    <Graph />
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export default IndexPage
