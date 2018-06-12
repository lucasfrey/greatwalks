import React from 'react'
import Link from 'gatsby-link'
import Graph from '../components/graph/Graph'

const IndexPage = () => (
  <div>
    <Graph />
    <br/>
    <Link to="/page-2/">Contact me</Link>
  </div>
)

export default IndexPage
