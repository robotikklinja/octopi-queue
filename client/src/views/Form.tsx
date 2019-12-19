import React, { useState, Fragment, PropsWithChildren } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import {
  EuiForm,
  EuiButton,
  EuiFieldText,
  EuiFormRow,
  EuiTextArea,
  EuiSpacer,
  EuiSelect,
  EuiFlexGrid,
  EuiFlexItem,
  EuiTitle
} from '@elastic/eui'

const { hostname } = window.location

export function FormComponent({ history }: PropsWithChildren<{}> & RouteComponentProps) {
  const [author, setAuthor] = useState("")
  const [estimated, setEstimated] = useState(60)
  const [purpose, setPurpose] = useState("School")
  const [description, setDescription] = useState("")
  const [printer, setPrinter] = useState(0)

  const onSubmit = (event: any) => {
    event.preventDefault()

    fetch(`http://${hostname}:9010/api/v1/queue/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author, purpose, description, estimated, printer
      })
    }).then(() => {
      history.push('/')
    })
  }

  return (
    <Fragment>
      <EuiTitle>
        <h1>Add new item to Queue</h1>
      </EuiTitle>

      <EuiSpacer/>

      <EuiForm>
        <EuiFlexGrid columns={2} gutterSize="s">
          <EuiFlexItem>
            <EuiFormRow display="row" label="Name" helpText="Username to display in queue">
              <EuiFieldText onChange={(event) => setAuthor(event.target.value)} required />
            </EuiFormRow>

            <EuiFormRow label="Estimated time" helpText="Estimated time for print to complete">
              <EuiSelect onChange={(event) => setEstimated(parseInt(event.target.value))} id="select_estimated" options={[
                {value: 60, text: 'Less than 1 hour'},
                {value: 180, text: 'More than 3 hours'},
                {value: 300, text: 'More than 5 hours'}
              ]}/>
            </EuiFormRow>

            <EuiFormRow label="Purpose" helpText="Printing for personal or school purposes?">
              <EuiSelect onChange={(event) => setPurpose(event.target.value)} id="select_purpose" options={[
                {value: 'School', text: 'School'},
                {value: 'Personal', text: 'Personal'}
              ]}/>
            </EuiFormRow>
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiFormRow label="Printer" helpText="Printer names are found on the printers">
              <EuiSelect onChange={(event) => setPrinter(parseInt(event.target.value))} id="select_printer" options={[
                {value: 0, text: 'Printer 1'},
                {value: 1, text: 'Printer 2'}
              ]}/>
            </EuiFormRow>

            <EuiFormRow label="Description" helpText="What are you printing?">
              <EuiTextArea onChange={(event) => setDescription(event.target.value)} required />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGrid>

        <EuiSpacer />

        <EuiButton type="submit" fill onClick={onSubmit}>
          Submit Form
        </EuiButton>
      </EuiForm>
    </Fragment>
  )
}

export const Form = withRouter(FormComponent)