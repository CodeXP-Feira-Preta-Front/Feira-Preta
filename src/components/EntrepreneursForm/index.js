import React from 'react'
import { connect } from 'react-redux'
import { addEntrepreneur } from '../../actions'
import MaskedInput from 'react-text-mask'
import FormInput from '../Form/FormInput'
import FormButton from '../Form/FormButton'
import './EntrepreneursForm.css'

class EnterpreneursForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUserInput = this.handleUserInput.bind(this)
        this.handlePhoneInput = this.handlePhoneInput.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.dispatchAddEntrepreneur(this.userName, this.phoneNumber)
        event.target.reset()
    }

    handleUserInput(event) {
        this.userName = event.target.value
    }
    handlePhoneInput(event) {
        this.phoneNumber = event.target.value
    }

    render() {
        return (
        <form className='enterpreneurs-form' onSubmit={this.handleSubmit} >
            <input className="form-input" type='text' placeholder='@usuário' onChange={this.handleUserInput} />
            <MaskedInput
                    mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    className="form-input"
                    placeholder="Telefone"
                    guide={true}
                    keepCharPositions={true}
                    onChange={this.handlePhoneInput}
            />
            <FormButton type="submit">Enviar</FormButton>
        </form>
        )

    }
}

const mapDispatchToProps = dispatch => ({
    dispatchAddEntrepreneur: (userName, phoneNumber) => (dispatch(addEntrepreneur( userName, phoneNumber )))
})

export default connect(null, mapDispatchToProps)(EnterpreneursForm)