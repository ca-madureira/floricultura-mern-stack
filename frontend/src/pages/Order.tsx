import OrderTable from "../components/OrderTable";

export const OrderPage = () => {
  return (
    <section className="flex justify-center w-full p-4 overflow-y-auto">
      <section className="h-screen ">
        <OrderTable />
      </section>
    </section>
  );
};
