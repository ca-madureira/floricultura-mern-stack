import OrderTable from "../components/OrderTable";

export const OrderPage = () => {
  return (
    <section className="flex justify-center w-fullbg-red-500">
      <section className="md:w-50%">
        <OrderTable />
      </section>
    </section>
  );
};
