import React, { useEffect, Fragment, useState } from 'react'
import {
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
  EuiButton
} from '@elastic/eui'
import { Queue, QueueItem } from '../app/types'

const {hostname} = window.location

console.info(`
OctoPi Queue Client Started on ${hostname}:2000
`)

function PrinterQueues() {
  const [left, setLeft] = useState<Queue>({size: 0, items: []})
  const [right, setRight] = useState<Queue>({size: 0, items: []})
  const [updates, setUpdates] = useState(0)

  useEffect(() => {
    fetch(`http://${hostname}:9010/api/v1/queue`)
      .then(res => res.json())
      .then((res) => {
        const leftQueue = res.items.filter((x: QueueItem) => x.printer === 0)
        const rightQueue = res.items.filter((x: QueueItem) => x.printer === 1)

        setLeft({size: leftQueue.length, items: leftQueue})
        setRight({size: rightQueue.length, items: rightQueue})
      })
  }, [updates])

  function onClick(printer: number) {
    fetch(`http://${hostname}:9010/api/v1/queue/${printer}/complete`, {method: 'DELETE'})
      .then(() => {
        setUpdates(s => s + 1)
      })
  }

  return (
    <Fragment>
      <EuiFlexItem>
        <EuiTitle>
          <h2>Printer 1</h2>
        </EuiTitle>

        {left.items.length ?
        <EuiButton fill onClick={() => onClick(0)} fullWidth={true}>Mark job as Complete</EuiButton> : null}
        <EuiSpacer/>

        {left.items.map(item => (
          <Fragment>
            <EuiPanel key={`${item.author}-${item.description}`}>
              <EuiTitle>
                <h3>{item.author}</h3>
              </EuiTitle>

              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiDescriptionList>
                    <EuiDescriptionListTitle>Estimated Duration</EuiDescriptionListTitle>
                    <EuiDescriptionListDescription>{item.estimated} min</EuiDescriptionListDescription>

                    <EuiDescriptionListTitle>Purpose</EuiDescriptionListTitle>
                    <EuiDescriptionListDescription>{item.purpose}</EuiDescriptionListDescription>
                  </EuiDescriptionList>
                </EuiFlexItem>

                <EuiFlexItem>
                  <EuiDescriptionList>
                    <EuiDescriptionListTitle>Brief</EuiDescriptionListTitle>
                    <EuiDescriptionListDescription>{item.description}</EuiDescriptionListDescription>
                  </EuiDescriptionList>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPanel>

            <EuiSpacer/>
          </Fragment>
        ))}
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiTitle>
          <h1>Printer 2</h1>
        </EuiTitle>

        {right.items.length ?
        <EuiButton fill onClick={() => onClick(1)} fullWidth={true}>Mark job as Complete</EuiButton> : null}
        <EuiSpacer/>

        {right.items.map(item => (
          <Fragment>
            <EuiPanel key={`${item.author}-${item.description}`}>
              <EuiTitle>
                <h3>{item.author}</h3>
              </EuiTitle>

              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiDescriptionList>
                    <EuiDescriptionListTitle>Estimated Duration</EuiDescriptionListTitle>
                    <EuiDescriptionListDescription>{item.estimated} min</EuiDescriptionListDescription>

                    <EuiDescriptionListTitle>Purpose</EuiDescriptionListTitle>
                    <EuiDescriptionListDescription>{item.purpose}</EuiDescriptionListDescription>
                  </EuiDescriptionList>
                </EuiFlexItem>

                <EuiFlexItem>
                  <EuiDescriptionList>
                    <EuiDescriptionListTitle>Brief</EuiDescriptionListTitle>
                    <EuiDescriptionListDescription>{item.description}</EuiDescriptionListDescription>
                  </EuiDescriptionList>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPanel>
            <EuiSpacer/>
          </Fragment>
        ))}
      </EuiFlexItem>
    </Fragment>
  )
}

export function PrinterQueue() {
  return (
    <Fragment>
      <EuiTitle>
        <h1>Current Printer Queues</h1>
      </EuiTitle>

      <EuiSpacer/>

      <EuiFlexGroup>
        <PrinterQueues/>
      </EuiFlexGroup>
    </Fragment>
  )
}