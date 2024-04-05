import { useMutation } from "convex/react";
import { useState } from "react";


export const useApiMutation = (mutation: any) => {
    const [pending, setPending] = useState(false);
    const apiMutation = useMutation(mutation);

    const mutate = (payload: any) => {
        setPending(true);
        return apiMutation(payload)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            setPending(false);
        });
    }

    return {
        mutate,
        pending,
    }
}