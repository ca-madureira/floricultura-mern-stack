import OrderTable from "../components/OrderTable";

export const OrderPage = () => {
  return (
    <section className="flex justify-center w-full">
      <section className="flex justify-center my-8 md:mx-10 w-full">
        <OrderTable />
      </section>
    </section>
  );
};
