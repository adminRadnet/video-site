import React from 'react'
import {useRouteMatch, Route, Switch, useHistory} from 'react-router-dom'
import {useSelector, shallowEqual} from 'react-redux'
import Category from '../Category'
import {replaceSpaces} from '../../lib/util'
import {Container, Col, Row, Card} from 'react-bootstrap'

export default function Categories(){
    let match = useRouteMatch()
    let history = useHistory()
    let filterData = useSelector(state => state.filterData, shallowEqual)
    let out = filterData.map((item, idx) => 
      <Col sm="3" className="mt-4" key={idx}>
        <div onClick={()=>{
          history.push(`/category/${replaceSpaces(item.name)}`)          
        }}>
          <Card>
          <Card.Body className="mt-5 pt-5 text-center">
         {item.name}
        </Card.Body>
        </Card>
        </div>
      </Col>
    )

    return (
      <div className="playlists max-width-lg">
        <Switch>
          <Route path={`${match.path}/:categoryId`} render={()=>{
            return <Category filterData={filterData} />
          }}>
          </Route>
          <Route path={match.path}>
            <h2>Browse Categories</h2>
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