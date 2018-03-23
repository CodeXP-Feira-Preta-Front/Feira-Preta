import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listEntrepreneurs, removeEntrepreneur, editEntrepreneur, cleanMessage } from '../../actions'
import EntrepreneurCard from '../EntrepreneurCard'
import './EntrepreneurList.css'

class EntrepreneurList extends Component {
    constructor(props) {
        super(props)
        this.state = { entrepreneurs: this.props.entrepreneurs }
        this.orderedEntrepeneur = ''
    }

    componentDidMount() {
        this.props.dispatchListEntrepreneur()
    }

    removeItem(id) {
        this.props.dispatchRemoveEntrepreneur(id)
    }

    editItem(isEditing, id, usernameInstagram, tel) {
        this.props.dispatchCleanMessage()
        this.props.dispatchEditEntrepreneur(isEditing, id, usernameInstagram, tel)
    }

    orderEntrepeneur(orderBy) {
        this.setState({ orderBy })
        switch (orderBy) {
            case 'phoneNumber':
                this.orderedEntrepeneur = [...this.props.entrepreneurs].sort((a, b) => (a.phoneNumber > b.phoneNumber) ? 1 : (b.phoneNumber > a.phoneNumber) ? -1 : 0)
                break
            case 'usernameInstagram':
                this.orderedEntrepeneur = [...this.props.entrepreneurs].sort((a, b) => (a.usernameInstagram > b.usernameInstagram) ? 1 : (b.usernameInstagram > a.usernameInstagram) ? -1 : 0)
                break
            default:
                this.orderedEntrepeneur = [...this.props.entrepreneurs].sort((a, b) => (a.fullNameInstagram > b.fullNameInstagram) ? 1 : (b.fullNameInstagram > a.fullNameInstagram) ? -1 : 0)
                break
        }
    }

    render() {
        console.log(this.orderedEntrepeneur)
        if (this.orderedEntrepeneur == '') {
            this.orderedEntrepeneur = [...this.props.entrepreneurs]
        }
        console.log(this.orderedEntrepeneur)
        return (
            <section>
                <div className='ordination-options'>
                    <span className='ordination-options__title'>Ordenar por:</span>
                    <input className='ordination-options__radio-button' type="radio" id="usernameInstagram" defaultChecked="checked" onClick={() => this.orderEntrepeneur('usernameInstagram')} ></input>
                    <label className='ordination-options__label' htmlFor="usernameInstagram">Nome de usuário</label>
                    <input className='ordination-options__radio-button' type="radio" id="fullNameInstagram" onClick={() => this.orderEntrepeneur('fullNameInstagram')} ></input>
                    <label className='ordination-options__label' htmlFor="fullNameInstagram">Nome completo</label>
                    <input className='ordination-options__radio-button' type="radio" id="phoneNumber" onClick={() => this.orderEntrepeneur('phoneNumber')} ></input>
                    <label className='ordination-options__label' htmlFor="phoneNumber">Telefone</label>
                </div>
                {this.orderedEntrepeneur.map(entrepreneur => (
                    <EntrepreneurCard
                        key={entrepreneur.id}
                        profilePictureInstagram={entrepreneur.profilePictureInstagram}
                        usernameInstagram={entrepreneur.usernameInstagram}
                        fullNameInstagram={entrepreneur.fullNameInstagram}
                        phoneNumber={entrepreneur.phoneNumber}
                        clickEdit={() => this.editItem(true, entrepreneur.id, entrepreneur.usernameInstagram, entrepreneur.phoneNumber)}
                        clickRemove={() => this.removeItem(entrepreneur.id)}
                    />
                ))}
                {/*<p>orderedEntrepeneur: { this.orderedEntrepeneur[1].usernameInstagram}</p>
                <p>props.entrepreneurs: { this.props.entrepreneurs[1].usernameInstagram}</p>*/}
            </section>
        )
    }
}

const mapStateToProps = state => ({
    // entrepreneurs: state.entrepreneurs
    entrepreneurs: state.entrepreneurs
})

const mapDispatchToProps = dispatch => ({
    dispatchListEntrepreneur: () => {
        dispatch(listEntrepreneurs())
    },
    dispatchRemoveEntrepreneur: (id) => {
        dispatch(removeEntrepreneur(id))
    },
    dispatchEditEntrepreneur: (isEditing, id, usernameInstagram, tel) => {
        dispatch(editEntrepreneur(isEditing, id, usernameInstagram, tel))
    },
    dispatchCleanMessage: () => {
        dispatch(cleanMessage())
    }
}
)

export default connect(mapStateToProps, mapDispatchToProps)(EntrepreneurList)