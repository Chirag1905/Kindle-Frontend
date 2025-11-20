import { HTMLProps } from "react";

export interface InputProps extends HTMLProps<HTMLInputElement> {
    type: string;
    name: string;
    placeholder?: string;
    className?: string;
}

export interface SelectProps {
    name: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    className?: string;
}

export interface SwitchProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export interface Option {
    label: string;
    value: string;
}