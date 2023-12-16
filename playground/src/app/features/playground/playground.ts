import { FormControl } from "@angular/forms";

export interface PlaygroundForm {
    username: FormControl<string | null | undefined>;
    emailAddress: FormControl<string | null | undefined>;
    phoneNumber: FormControl<string | null | undefined>;
    skillsets: FormControl<string |string[] | null>;
    hobbies: FormControl<string |string[] | null>;
}

export type ListUserViewModel = {
    id: string;
    username: string;
    emailAddress: string;
    phoneNumber: string;
};

export type GetUserViewModel = {
    username: string;
    emailAddress: string;
    phoneNumber: string;
    skillsets: string[];
    hobbies: string[];
};

export type CreateUserModel = {
    username: string;
    emailAddress: string;
    phoneNumber: string;
    skillsets: string[];
    hobbies: string[];
};

export type CreateUserResult = {
    id: string;
};

export type UpdateUserModel = {
    emailAddress: string;
    phoneNumber: string;
    skillsets: string[];
    hobbies: string[];
};

export type UpdateUserResult = {
    id: string;
};

export type DeleteUserResult = {
    id: string;
};