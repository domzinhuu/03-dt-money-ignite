import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { TransactionContext } from "../../contexts/TransactionContext";
import { priceFormatter } from "../../utils/formattter";
import { useContextSelector } from "use-context-selector";

export function Summary() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions;
  });

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
        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saidas</span>
          <ArrowCircleDown size={32} color="#F75A68" />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#FFF" />
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
