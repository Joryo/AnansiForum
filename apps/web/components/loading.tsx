import { Spinner } from "@nextui-org/spinner";

export const Loading = ({ label }: { label: string }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner label={label} labelColor="primary" size="lg" />
    </div>
  );
};
