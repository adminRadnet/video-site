import React from 'react'
import {useRouteMatch, Route, Switch} from 'react-router-dom'
import {useSelector, shallowEqual} from 'react-redux'
import Category from '../Category'
import {replaceSpaces} from '../../lib/util'
import {Container, Col, Row} from 'react-bootstrap'

export default function Categories(){
    let match = useRouteMatch()
    let filterData = useSelector(state => state.filterData, shallowEqual)
    let out = filterData.map((item, idx) => <Col sm="3" className="mt-4" key={idx}><a href={`/category/${replaceSpaces(item.name)}`}>{item.name}</a></Col>)
    return (
      <div>
        <Switch>
          <Route path={`${match.path}/:categoryId`}>
            <Category filterData={filterData} />
          </Route>
          <Route path={match.path}>
            <h2>Browse Categories:</h2>
              <Container>
              <Row>
                {out}
              </Row>
              </Container>
          </Route>
        </Switch>
      </div>
    )
  }