import { supabase } from "./db";
export async function signUp(email,password){
    console.log(email,password)
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
      return{data,error};

}
export async function signIn(email,password){
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      return{data,error};
}
export async function signOut(){
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log("Error signing out:", error.message)
      return null
    } else {
      console.log("User signed out")
      return true
    }
}
export async function signInWithOAuth(provider:string){ 
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
      })
      if (error) {
        console.log("Error signing in with OAuth:", error.message)
        return null
      } else {
        console.log("User signed in with OAuth:", data)
        return data
      }
    
}
