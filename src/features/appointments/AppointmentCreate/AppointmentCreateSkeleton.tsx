import { Button, InputSearch } from '@/components/ui';

export const AppointmentCreateSkeleton = () => (
  <div className="flex mt-3 justify-between gap-10 mb-8">
    <InputSearch placeholder="Search Appointments" isDisabled={true} />
    <Button className="h-[52px] font-medium" isDisabled={true}>
      Create
    </Button>
  </div>
);
