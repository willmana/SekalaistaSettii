import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

const Facemasks = ({ facemasks, showAll, filter, useSortableData }) => {
    const itemsToShow = showAll
        ? facemasks
        : facemasks.filter(mask => mask.name.toLowerCase().includes(filter.toLowerCase()))

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
                {items.map(mask => (
                    <tr key={mask.id}>
                        <td>{mask.name}</td>
                        {mask.color.length > 1
                            ? <td>{mask.color.map(color =>
                                <span> {color} </span>)}</td>
                            : <td>{mask.color[0]}</td>
                        }

                        <td>{mask.price}</td>
                        <td>{mask.manufacturer}</td>
                        <td><Button as={Link} to={`/facemasks/${mask.id}`} variant="outline-secondary"> Check availability</Button></td>
                    </tr>)
                )

                }
            </tbody>
        </Table>
    )
}

export default Facemasks