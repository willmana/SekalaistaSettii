import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import manufacturerService from './../services/manufacturer'
import Table from 'react-bootstrap/Table'


const Facemask = ({ facemasks, parseAvailability }) => {
    const [avail, setAvail] = useState('Waiting for response...')
    const id = useParams().id
    const facemask = facemasks.find(n => n.id === id)
    const fetchAvailability = async (manufacturer) => {
        const data = await manufacturerService.getData(manufacturer)
        if (data.response !== "[]") {
            const json = data.response.flat().find(a => a.id.toLowerCase() === id.toLowerCase())
            setAvail(parseAvailability({ json }))
        } else {
            setAvail('Service currently unavailable')
        }
    }

    if (facemask !== undefined && avail === 'Waiting for response...') {
        fetchAvailability(facemask.manufacturer)
    }


    return (
        <Table striped bordered hover variant="dark">
            <tbody>
                <tr>
                    <th>Type</th>
                    <td>Facemask</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>{facemask.name}</td>
                </tr>
                <tr>
                    <th>Price</th>
                    <td>{facemask.price}</td>
                </tr>
                <tr>
                    <th>Manufacturer</th>
                    <td>{facemask.manufacturer}</td>
                </tr>
                <tr>
                    <th>Availability</th>
                    <td>{avail}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default Facemask