import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighlight,
  TransactionContainer,
  TransactionsTable,
} from "./styles";
import { TransactionContext } from "../../contexts/TransactionContext";

export function Transactions() {
  const { transactions } = useContext(TransactionContext);

  return (
    <div>
      <Header />
      <Summary />

      <TransactionContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((item) => (
              <tr key={item.id}>
                <td width="50%">{item.description}</td>
                <td>
                  <PriceHighlight variant={item.type}>
                    {item.price}
                  </PriceHighlight>
                </td>
                <td>{item.category}</td>
                <td>{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionContainer>
    </div>
  );
}
