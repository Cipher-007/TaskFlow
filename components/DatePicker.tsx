import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function DatePicker({
  stateValue,
  onStateChange,
}: {
  stateValue: Date | undefined;
  onStateChange: (date: Date) => void;
}) {
  const [date, setDate] = useState<Date>();
  useEffect(() => {
    if (date) {
      onStateChange(date);
    }
  }, [date, onStateChange]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !stateValue && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {stateValue ? format(stateValue, "PPP") : <span>Pick due date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={stateValue}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
