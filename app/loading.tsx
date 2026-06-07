import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-20">
      <Spinner className="h-8 w-8" />
    </div>
  );
}
