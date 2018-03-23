import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listEntrepreneurs, removeEntrepreneur, editEntrepreneur, cleanMessage } from '../../actions'
import EntrepreneurCard from '../EntrepreneurCard'
import './EntrepreneurList.css'

class EntrepreneurList extends Component {
    constructor(props) {
        super(props)
        this.state = { orderedEntrepeneur: [...props.entrepreneurs] }
    }

    componentDidMount() {
        this.props.dispatchListEntrepreneur()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.orderBy !== this.state.orderBy) {
            switch (this.state.orderBy) {
                case 'phoneNumber':
                    this.setState({ orderedEntrepeneur: this.state.orderedEntrepeneur.sort((a, b) => (a.phoneNumber > b.phoneNumber) ? 1 : (b.phoneNumber > a.phoneNumber) ? -1 : 0) })
                    break
                case 'fullNameInstagram':
                    this.setState({ orderedEntrepeneur: this.state.orderedEntrepeneur.sort((a, b) => (a.fullNameInstagram > b.fullNameInstagram) ? 1 : (b.fullNameInstagram > a.fullNameInstagram) ? -1 : 0) }) 
                    break
                default:
                    this.setState({ orderedEntrepeneur: this.state.orderedEntrepeneur.sort((a, b) => (a.usernameInstagram > b.usernameInstagram) ? 1 : (b.usernameInstagram > a.usernameInstagram) ? -1 : 0) })
                    break
            }
        }
        if (!this.state.orderBy) {
            this.setState({ orderedEntrepeneur: [...this.props.entrepreneurs], orderBy: 'usernameInstagram' })
        }
}

    removeItem(id) {
        this.props.dispatchRemoveEntrepreneur(id)
    }

    editItem(isEditing, id, usernameInstagram, tel) {
        this.props.dispatchCleanMessage()
        this.props.dispatchEditEntrepreneur(isEditing, id, usernameInstagram, tel)
    }

    orderEntrepeneur(orderBy) {
        (this.state.orderBy != orderBy) && this.setState({ orderBy })
    }
    
    render() {
        console.log('render')
        return (
            <section>
                <div className='ordination-options'>
                    <span className='ordination-options__title'>Ordenar por:</span>
                    <input className='ordination-options__radio-button' type="radio" id="usernameInstagram" name="selectOrder" defaultChecked onClick={() => this.orderEntrepeneur('usernameInstagram')} ></input>
                    <label className='ordination-options__label' htmlFor="usernameInstagram">Nome de usuário</label>
                    <input className='ordination-options__radio-button' type="radio" id="fullNameInstagram" name="selectOrder" onClick={() => this.orderEntrepeneur('fullNameInstagram')} ></input>
                    <label className='ordination-options__label' htmlFor="fullNameInstagram">Nome completo</label>
                    <input className='ordination-options__radio-button' type="radio" id="phoneNumber" name="selectOrder" onClick={() => this.orderEntrepeneur('phoneNumber')} ></input>
                    <label className='ordination-options__label' htmlFor="phoneNumber">Telefone</label>
                </div>
                {this.state.orderedEntrepeneur.map(entrepreneur => (
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
            </section>
        )
    }
}

const mapStateToProps = state => ({
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