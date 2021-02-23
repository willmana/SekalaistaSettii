import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const Gloves = ({ gloves, filter, showAll, useSortableData }) => {
    const itemsToShow = showAll
        ? gloves
        : gloves.filter(glove => glove.name.toLowerCase().includes(filter.toLowerCase()))

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
                            className={getClassNamesFor('name')} style={{float: 'right'}} variant="outline-secondary">
                            Sort by name
                        </Button>
                    </th>
                    <th>Color</th>
                    <th>Price</th>
                    <th>Manufacturer</th>
                </tr>
            </thead>
            <tbody>
                {items.map(glove => (
                    <tr key={glove.id}>
                        <td>{glove.name}</td>
                        {glove.color.length > 1
                            ? <td>{glove.color.map(color =>
                                <span> {color} </span>)}</td>
                            : <td>{glove.color[0]} </td>
                        }
                        <td>{glove.price}</td>
                        <td>{glove.manufacturer}</td>
                    </tr>)
                )

                }
            </tbody>
        </Table>
    )
}

export default Gloves