import React, { Component } from 'react'
import superagent from 'superagent'
import { connect } from 'react-redux'
import actions from '../../actions'

class Admin extends Component {
    constructor() {
        super()
        this.state = {
            username: ''
        }
    }

    componentDidMount() {
        console.log('Admin Component Did Mount!')
        // who is logged in??
        superagent.get('/auth/currentuser').query(null).set('Accept', 'application/json').end((err, response) => {
            if (err) {
                console.log('REQUEST ERROR: ' + err.message)
                return
            }
            const currentuser = response.body.user
            if (!currentuser) {
                console.log('USER NOT LOGGED IN: ')
                return
            }

            console.log('USER: ' + JSON.stringify(currentuser))
            this.props.currentUserReceived(currentuser)
        })
    }

    updateUsername(event) {
        console.log('updateUsername: ' + event.target.value)
        this.setState({ username: event.target.value })
    }

    updateUser(event) {
        event.preventDefault()
        console.log('Update User!')
        if (!this.state.username) {
            alert('No Changes Made')
            return
        }
        superagent.post('/auth/update').send({ username: this.state.username }).set('Accept', 'application/json').end((err, response) => {
            if (err) {
                alert('Error: ' + err.message)
                return
            }
            console.log('User Updated: ' + JSON.stringify(response.body))
            const currentUser = response.body.user
            this.props.currentUserReceived(currentUser)

            alert('User Updated!')
        })
    }

    render() {
        const currentUser = this.props.user.currentUser
        let username = ''

        if (!currentUser) {
            console.log('NO CURRENT USER!')
        } else {
            console.log('CURRENT USER IS: ' + JSON.stringify(currentUser))
            username = currentUser.username
        }

        return (
            <div className="container">
                <h1>Welcome {username}</h1>

                <hr />

                {
                    !currentUser ? null : (
                        <form>
                            <input type="text" onChange={this.updateUsername.bind(this)} defaultValue={currentUser.username} placeholder="Username" />
                            <br />
                            <button onClick={this.updateUser.bind(this)}>Update User</button>
                        </form>
                    )
                }
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        user: state.user
    }
}

const dispatchToProps = (dispatch) => {
    return {
        currentUserReceived: (user) => dispatch(actions.currentUserReceived(user))
    }
}

export default connect(stateToProps, dispatchToProps)(Admin)