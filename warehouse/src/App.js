import React, { useState, useEffect, useMemo } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import itemService from './services/items'
import Gloves from './components/gloves'
import Facemasks from './components/facemasks'
import Beanies from './components/beanies'
import './App.css';


const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);
  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }

  return { items: sortedItems, requestSort };
}

const App = () => {
  const [gloves, setGloves] = useState([])
  const [beanies, setBeanies] = useState([])
  const [facemasks, setFacemasks] = useState([])
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
    if (event.target.value === ('')) setShowAll(true)
    else setShowAll(false)
  }

  useEffect(() => {
    async function renderGloves() {
      const data = await itemService.getGloves()
      setGloves(data)
    }
    async function renderFacemasks() {
      const data = await itemService.getFacemasks()
      setFacemasks(data)
    }
    async function renderBeanies() {
      const data = await itemService.getBeanies()
      setBeanies(data)
    }
    renderGloves()
    renderFacemasks()
    renderBeanies()
  }, [])


  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/gloves">Gloves</Nav.Link>
            <Nav.Link as={Link} to="/facemasks">Facemasks</Nav.Link>
            <Nav.Link as={Link} to="/beanies">Beanies</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Filter" className="mr-sm-2" value={filter} onChange={handleFilterChange} />

          </Form>
        </Navbar>
      </div>
      <Switch>
        <Route path="/gloves">
          <Gloves gloves={gloves} filter={filter} showAll={showAll} useSortableData={useSortableData}/>
        </Route>
        <Route path="/facemasks">
          <Facemasks facemasks={facemasks} filter={filter} showAll={showAll} useSortableData={useSortableData}/>
        </Route>
        <Route path="/beanies">
          <Beanies beanies={beanies} filter={filter} showAll={showAll} useSortableData={useSortableData}/>
        </Route>
        <Route path="/" >
          <Jumbotron>
            <h1>Warehouse application</h1>
            <p>
              This is a single page application, that fetches clothing products from an API and displays
              said products in tables. This application doesn't have pagination.
              It uses react-router so that user is able to switch easily from product category to another. It has built
              in filtering and user is also able to sort tables by product name. The application should be pretty
              responsive considering the fact that each product category has almost 8000 items.
            </p>
          </Jumbotron>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
