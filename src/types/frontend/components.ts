export interface TextInputProps {
    id: string;
    name: string;
    label: string;
    type?: "text" | "email" | "password" | "tel";
    value: string;
    placeholder?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonProps {
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    children: React.ReactNode;
    variant?: "primary" | "secondary";
}
