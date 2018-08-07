import React from 'react'
import Link from 'gatsby-link'
import Graph from '../components/graph/Graph'

const IndexPage = () => (
  <div>
    <Graph />
    <br/>
    <p>All the data used is available here : <a href="https://data.mfe.govt.nz/table/95346-use-of-public-conservation-land-great-walks-200517/">data.mfe.govt.nz</a></p>
    <br/>
    <Link to="/contact/">Contact me</Link>
  </div>
)

export default IndexPage
