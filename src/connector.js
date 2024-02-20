import { InjectedConnector } from '@web3-react/injected-connector'
import { KaikasConnector } from 'kaikas-connector'

export const injected = new InjectedConnector({ supportedChainIds: [5] })
