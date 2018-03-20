import React from 'react'
import './Entrepreneurs.css'
import EntrepreneursForm from '../../EntrepreneursForm'
import EntrepreneurList from '../../EntrepreneurList'

const Entrepreneurs = () => (
    <article className="entrepreneurs">
        <h1 className="entrepreneurs__title">Empreendedores</h1>
        <EntrepreneursForm />
        <section>
            <EntrepreneurList />
        </section>
    </article> 
)

export default Entrepreneurs