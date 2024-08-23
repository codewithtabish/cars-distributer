import { Checkbox } from "@/components/ui/checkbox";

export function FeatureBox({ item, index, handleChnage }) {
  return (
    <div className="flex items-center space-x-2" key={index}>
      <Checkbox
        id="terms2"
        checked={item.checked}
        onCheckedChange={(e) => handleChnage(item.name, e)}
      />
      <label
        htmlFor={item.label}
        className="text-sm font-medium leading-none 
        peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {item.label}
      </label>
    </div>
  );
}
