import { useContextSelector } from "use-context-selector";
import { TransactionContext } from "../contexts/TransactionContext";
import { useMemo } from "react";

export function useSummary() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions;
  });

  //{ income: 0, outcome: 0 , total: 0 }
  const summary = useMemo(() => {
    return transactions.reduce(
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
  }, [transactions]);

  return summary;
}
