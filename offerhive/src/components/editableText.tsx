"use client";
import { useState } from "react";
import { Pencil } from "lucide-react";

export default function EditableText({
  text,
  onSave,
  className,
}: {
  text: string;
  onSave: (newValue: string) => void;
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(text);

  const handleSave = () => {
    setEditing(false);
    if (value !== text) {
      onSave(value);
    }
  };

  return editing ? (
    <input
      value={value}
      autoFocus
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleSave}
      onKeyDown={(e) => e.key === "Enter" && handleSave()}
      className={`border p-1 rounded min-w-full ${className}`}
    />
  ) : (
    <span className={`flex items-center gap-2 overflow-ellipsis  ${className}`}>
      <p className="max-w-60 h-auto overflow-hidden text-ellipsis  ">
        {text}
      </p>
      <Pencil
        size={24}
        className="cursor-pointer text-gray-500 hover:text-gray-800  hover:scale-110"
        onClick={() => setEditing(true)}
      />
    </span>
  );
}
