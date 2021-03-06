import s from './index.module.styl'
import React from 'react'
import t from '~t'
import { Route, Switch, Redirect } from 'react-router-dom'
import Screen from '~co/screen/basic'
import { target } from '~target'
import config from '~config'
import Logo from '~assets/brand/icon_raw.svg?component'

import Auth from './auth'
import Login from './login'
import Signup from './signup'
import Lost from './lost'
import Recover from './recover'
import Extension from './extension'

export default ({ match })=>(
	<Screen className={s.page} appSize='large'>
		<div className={s.content}>
			<Logo className={s.logo} />

			{/* Check auth status and make redirects */}
			<Auth />

			<Switch>
				{target == 'extension' && <Route component={Extension} />}

				<Route path={`${match.path}/login`} component={Login} />
				<Route path={`${match.path}/signup`} component={Signup} />
				<Route path={`${match.path}/lost`} component={Lost} />
				<Route path={`${match.path}/recover/:token`} component={Recover} />

				{/* Default route */}
				<Route><Redirect to={`${match.path}/login`} /></Route>
			</Switch>
		</div>

		<footer className={s.footer}>
			&copy; 2020 Raindrop.io
			<a href={config.links.help.index} target='_blank'>{t.s('support')}</a>
		</footer>
	</Screen>
)