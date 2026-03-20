//src/services/auth.service.ts
import { supabase } from "../config/supabase"

export const getUserFromToken = async (token: string) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token)

  if (error || !user) {
    throw new Error("Invalid token")
  }

  return user
}

export const getUserRole = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single()

  if (error) {
    throw new Error("Profile not found")
  }

  return data?.role || "staff"
}