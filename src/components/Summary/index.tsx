import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";

export function Summary() {
  const { transactions } = useContext(TransactionContext);

  //{ income: 0, outcome: 0 , total: 0 }
  const summary = transactions.reduce(
    (currentValue, transaction) => {
      if (transaction.type === "income") {
        currentValue.income += transaction.price;
        currentValue.total += transaction.price;
      } else {
        currentValue.outcome += transaction.price;
        currentValue.total -= transaction.price;
      }
      return currentValue;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );
  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00B37E" />
        </header>
        <strong>R$ {summary.income}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saidas</span>
          <ArrowCircleDown size={32} color="#F75A68" />
        </header>
        <strong>R$ {summary.outcome}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#FFF" />
        </header>
        <strong>R$ {summary.total}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
