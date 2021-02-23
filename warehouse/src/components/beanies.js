import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const Beanies = ({ beanies, showAll, filter, useSortableData }) => {
    const itemsToShow = showAll
        ? beanies
        : beanies.filter(beanie => beanie.name.toLowerCase().includes(filter.toLowerCase()))

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
                </tr>
            </thead>
            <tbody>
                {items.map(beanie => (
                    <tr key={beanie.id}>
                        <td>{beanie.name}</td>
                        {beanie.color.length > 1
                            ? <td>{beanie.color.map(color =>
                                <span> {color} </span>)}</td>
                            : <td>{beanie.color[0]}</td>}
                        <td>{beanie.price}</td>
                        <td>{beanie.manufacturer}</td>
                    </tr>)
                )

                }
            </tbody>
        </Table>
    )
}

export default Beanies