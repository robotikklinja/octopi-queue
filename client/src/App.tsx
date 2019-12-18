import React, { PropsWithChildren } from 'react'
import {
  EuiPage,
  EuiPageBody,
  EuiEmptyPrompt,
  EuiTabs,
  EuiTab,
  EuiSpacer,
} from '@elastic/eui'

import {
  Route,
  Switch,
  BrowserRouter,
  RouteComponentProps,
  withRouter,
  useLocation
} from 'react-router-dom'
import { Form } from './views/Form'
import { PrinterQueue } from './views/PrinterQueue'

function NavigationTabComponent({ history }: PropsWithChildren<{}> & RouteComponentProps) {
  const { pathname } = useLocation()

  return (
    <EuiTabs>
      <EuiTab onClick={() => history.push('/')} isSelected={pathname === '/'}>Queue</EuiTab>
      <EuiTab onClick={() => history.push('/submit')} isSelected={pathname === '/submit'}>New Order</EuiTab>
    </EuiTabs>
  )
}

const NavigationTab = withRouter(NavigationTabComponent)

export function App() {
  return (
    <BrowserRouter>
      <EuiPage restrictWidth={1024}>
        <EuiPageBody>
          <EuiEmptyPrompt
            iconType="database"
            title={
              <h1>OctoPi Print Queue</h1>
            }
          />

          <EuiSpacer/>
          <NavigationTab />
          <EuiSpacer />

          <Switch>
            <Route path="/submit">
              <Form />
            </Route>

            <Route path="/">
              <PrinterQueue />
            </Route>
          </Switch>
        </EuiPageBody>
      </EuiPage>
    </BrowserRouter>
  )
}