import { supabase } from "../config/supabase"

export const getProducts = async (category?: string) => {
  let query = supabase.from("products").select("*")

  if (category && category !== "All") {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) throw error

  return data
}

export const getCategories = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("category")

  if (error) throw error

  // 🔥 unique category
  const unique = [...new Set(data.map((item) => item.category))]

  return ["All", ...unique]
}