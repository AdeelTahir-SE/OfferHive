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
    <textarea
      value={value}
      autoFocus
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleSave}
      onKeyDown={(e) => e.key === "Enter" && handleSave()}
      className={`border p-1 rounded min-w-full max-w-screen ${className}`}
    />
  ) : (
    <div className={`relative ${className}`}>
      <p className="h-auto overflow-hidden text-ellipsis pr-8">
        {text}
      </p>
      <Pencil
        size={20}
        className="absolute top-1 right-1 cursor-pointer text-gray-500 hover:text-gray-800 hover:scale-110 transition-transform"
        onClick={() => setEditing(true)}
      />
    </div>
  );
}
