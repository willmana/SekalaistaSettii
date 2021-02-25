import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import manufacturerService from './../services/manufacturer'
import Table from 'react-bootstrap/Table'


const Glove = ({ gloves, parseAvailability }) => {
    const [avail, setAvail] = useState('Waiting for response...')
    const id = useParams().id
    const glove = gloves.find(n => n.id === id)
    const fetchAvailability = async (manufacturer) => {
        const data = await manufacturerService.getData(manufacturer)
        if (data.response !== "[]") {
            const json = data.response.flat().find(a => a.id.toLowerCase() === id.toLowerCase())
            setAvail(parseAvailability({ json }))
        } else {
            setAvail('Service currently unavailable')
        }
    }

    if (glove !== undefined && avail === 'Waiting for response...') {
        fetchAvailability(glove.manufacturer)
    }


    return (
        <Table striped bordered hover variant="dark">
            <tbody>
                <tr>
                    <th>Type</th>
                    <td>Glove</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>{glove.name}</td>
                </tr>
                <tr>
                    <th>Price</th>
                    <td>{glove.price}</td>
                </tr>
                <tr>
                    <th>Manufacturer</th>
                    <td>{glove.manufacturer}</td>
                </tr>
                <tr>
                    <th>Availability</th>
                    <td>{avail}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default Glove