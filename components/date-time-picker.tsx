"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateTimePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  function handleDateChange(date: Date | undefined) {
    if (!date) return;

    const newDate = new Date(date);

    if (value) {
      newDate.setHours(value.getHours());
      newDate.setMinutes(value.getMinutes());
    }

    onChange(newDate);
  }

  function handleHourChange(hour: string) {
    const date = value ?? new Date();

    const newDate = new Date(date);

    newDate.setHours(Number(hour));

    onChange(newDate);
  }

  function handleMinuteChange(minute: string) {
    const date = value ?? new Date();

    const newDate = new Date(date);

    newDate.setMinutes(Number(minute));

    onChange(newDate);
  }

  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !value && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 size-4" />

            {value ? format(value, "dd/MM/yyyy HH:mm") : "Selecione a data"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto space-y-4 p-4">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateChange}
          />

          <div className="grid grid-cols-2 gap-2">
            <Select
              value={
                value ? String(value.getHours()).padStart(2, "0") : undefined
              }
              onValueChange={handleHourChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Hora" />
              </SelectTrigger>

              <SelectContent>
                {Array.from({ length: 24 }).map((_, hour) => (
                  <SelectItem key={hour} value={String(hour).padStart(2, "0")}>
                    {String(hour).padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={
                value ? String(value.getMinutes()).padStart(2, "0") : undefined
              }
              onValueChange={handleMinuteChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Minuto" />
              </SelectTrigger>

              <SelectContent>
                {Array.from({ length: 60 }).map((_, minute) => (
                  <SelectItem
                    key={minute}
                    value={String(minute).padStart(2, "0")}
                  >
                    {String(minute).padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
