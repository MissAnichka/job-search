import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from './stores'
import { Provider } from 'react-redux'
import Intro from './components/Intro'
import Admin from './components/containers/Admin'

const app = (
	<Provider store={store.configure(null)}>
		<div>
			<Admin />
		</div>
	</Provider>
)


ReactDOM.render(app, document.getElementById('root'))