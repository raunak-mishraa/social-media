import React from "react";
import { InputProps } from "./ui/input";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, ...props}, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);
    return (
        <div className="relative">
           <Input 
            type={showPassword ? "text" : "password"}
            className={cn("pe-10", className)}
            ref={ref}
            {...props}
           />
           <button 
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            onClick={() => setShowPassword((prev) => !prev)}
            title={showPassword ? "Hide password" : "Show password"}
           >
                {showPassword 
                 ? <EyeOff className="size-5" />
                 : <Eye className="size-5" />
                 }
           </button>
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };