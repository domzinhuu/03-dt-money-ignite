import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CirclesFour,
  FloppyDisk,
  X,
} from "phosphor-react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionContext } from "../../contexts/TransactionContext";
import { useContextSelector } from "use-context-selector";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number({ coerce: true }),
  category: z.string(),
  type: z.string(),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: { type: "income" },
  });
  const createTransaction = useContextSelector(
    TransactionContext,
    (context) => {
      return context.createTransaction;
    }
  );

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await createTransaction(data);
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            {...register("description")}
            type="text"
            placeholder="Descrição"
            required
          />
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            placeholder="Preço"
            required
          />
          <input
            {...register("category")}
            type="text"
            placeholder="Categoria"
            required
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <TransactionType
                onValueChange={field.onChange}
                value={field.value}
              >
                <TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} /> Entrada
                </TransactionTypeButton>

                <TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} /> Saida
                </TransactionTypeButton>
              </TransactionType>
            )}
          />

          <button disabled={isSubmitting} type="submit">
            {isSubmitting && <CirclesFour className="loading" size={20} />}
            {!isSubmitting && <FloppyDisk size={20} />}
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
