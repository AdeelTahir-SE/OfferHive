"use client";
import { useState } from "react";
import { Pencil } from "lucide-react";

export default function EditableText({
  text,
  onSave,
  className,
  isEditing = false,
}: {
  text: string;
  onSave: (newValue: string) => void;
  className?: string;
  isEditing?: boolean;
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
  style={{ height: value.length > 100 ? "400px" : "auto" }}
  className={` w-full rounded  lg:max-w-6xl ${className}`}
/>

  ) : (
    <div className={`relative px-4  max-w-screen md:px-32  xl:max-w-6xl ${className}`}>
      <p className="h-auto break-words text-ellipsis pr-8">{text}</p>
      {!isEditing && (
        <Pencil
          size={20}
          className="absolute top-1 right-1 cursor-pointer text-gray-500 hover:text-gray-800 hover:scale-110 transition-transform"
          onClick={() => setEditing(true)}
        />
      )}
    </div>
  );
}
