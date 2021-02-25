import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'


const Gloves = ({ gloves, filter, showAll, useSortableData}) => {

    const itemsToShow = showAll
        ? gloves
        : gloves.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))

    const { items, requestSort, sortConfig } = useSortableData(itemsToShow);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>
                        Name
                        <Button type="button" onClick={() => requestSort('name')}
                            className={getClassNamesFor('name')} style={{ float: 'right' }} variant="outline-secondary">
                            Sort by name
                        </Button>
                    </th>
                    <th>Color</th>
                    <th>Price</th>
                    <th>Manufacturer</th>
                    <th>Availability</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        {item.color.length > 1
                            ? <td>{item.color.map(color =>
                                <span> {color} </span>)}</td>
                            : <td>{item.color[0]} </td>
                        }
                        <td>{item.price}</td>
                        <td>{item.manufacturer}</td>
                        <td><Button as={Link} to={`/gloves/${item.id}`} variant="outline-secondary"> Check availability</Button></td>
                    </tr>)
                )
                }
            </tbody>
        </Table>
    )
}

export default Gloves