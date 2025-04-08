import { supabase } from "./db";
export async function sendMessage(
    name: string,
    email: string,
    message: string,
    ) {
    const { data, error } = await supabase
        .from("Contact")
        .insert([
        {
            name,
            email,
            message,
        },
        ])
        .select();
    
    return { data, error };
    }

