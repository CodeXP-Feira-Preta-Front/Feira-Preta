import { postEntrepreneurs, getEntrepreneurs, deleteEntrepreneur } from '../api/entrepreneurs'
import { addFailure, addSuccess, START_LOAD } from './api'
export const LIST_ENTREPRENEUR = 'LIST_ENTREPRENEUR'
export const REMOVE_ENTREPRENEUR = 'REMOVE_ENTREPRENEUR'
export const EDIT_ENTREPRENEUR = 'EDIT_ENTREPRENEUR'

export function addEntrepreneur(userName, phoneNumber) {
    return dispatch => {
        dispatch({
            type: START_LOAD
        })
        postEntrepreneurs(userName, phoneNumber)
            .then(() => {
                dispatch(addSuccess('Cadastrado com sucesso'))
                dispatch(listEntrepreneurs())
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    dispatch(addFailure('Usuário incorreto'))
                } else if (error.response && error.response.status === 409) {
                    dispatch(addFailure('Empreendedor já cadastrado'))
                } else {
                    dispatch(addFailure('Ocorreu um erro inesperado'))
                }
            })
    }
}

export function listEntrepreneurs() {
    return dispatch => {
        getEntrepreneurs()
            .then(response => {
                dispatch({
                    type: LIST_ENTREPRENEUR,
                    entrepreneurs: response.data
                })
                console.log(response)
            })
            .catch(error => dispatch(addFailure('A lista de empreendedores não foi carregada')))
    }
}

export function removeEntrepreneur(id) {
    return dispatch => {
        deleteEntrepreneur(id)
            .then(() => {
                dispatch(addSuccess('Cadastro removido com sucesso'))
                dispatch(listEntrepreneurs())
            })
            .catch(error => dispatch(addFailure('Não foi possível remover o empreendedor')))
    }
}

export function editEntrepreneur(id) { //adicionar telefone
    return dispatch => {
        dispatch({
            type: EDIT_ENTREPRENEUR,
            id
        })
    }
}