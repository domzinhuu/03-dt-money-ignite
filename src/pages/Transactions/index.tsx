import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionContainer } from './styles'

export function Transactions() {
  return (
    <TransactionContainer>
      <Header />
      <Summary />
    </TransactionContainer>
  )
}
