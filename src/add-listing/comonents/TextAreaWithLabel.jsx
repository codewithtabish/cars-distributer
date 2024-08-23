import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function TextareaWithLabel({ item, handleChnage }) {
  return (
    <div
      className="grid   w-full
    "
    >
      {/* <Label htmlFor="message">Your message</Label> */}
      <Textarea
        placeholder="Type your message here."
        id="message"
        onChange={(e) => handleChnage(item.name, e.target.value)}
        required={item.required}
      />
    </div>
  );
}
