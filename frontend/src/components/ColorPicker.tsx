import { ColorOption } from "@/types/product";

interface ColorPickerProps {
  selectedColor: ColorOption;
  onColorChange: (color: ColorOption) => void;
}

const colorMap = {
  yellow: {
    bg: "bg-[#E6CA97]",
    label: "Yellow Gold",
  },
  rose: {
    bg: "bg-[#E1A4A9]",
    label: "Rose Gold",
  },
  white: {
    bg: "bg-[#D9D9D9]",
    label: "White Gold",
  },
};

export default function ColorPicker({
  selectedColor,
  onColorChange,
}: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {(Object.keys(colorMap) as ColorOption[]).map((color) => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            className={`cursor-pointer
              w-4 h-4 rounded-full 
              ${colorMap[color].bg} 
              border-2 border-transparent transition-all ease-in-out 
              focus:outline-none 
              ${
                selectedColor === color
                  ? `ring-1 ring-offset-2 ring-gray-800`
                  : "hover:scale-110"
              }
            `}
            title={colorMap[color].label}
            aria-label={colorMap[color].label}
          />
        ))}
      </div>

      <div className="text-[12px] font-bold text-black">
        {colorMap[selectedColor].label}
      </div>
    </div>
  );
}
