import { supabase } from "./supabase";

export async function getCollections() {
  try {
    let { data: collections, error } = await supabase
      .from("collections")
      .select("*");
    if (error) {
      throw new Error(`Fetching  collections failed. Status ${error}`);
    }

    return collections;
  } catch (error) {
    console.error("Fetch Error");
  }
}

export async function getMenCollections() {
  let { data: men, error } = await supabase
    .from("collections")
    .select("*")
    .eq("gender", "men");
  if (error) throw new Error(`Fetching men collections failed: ${error}`);

  return men;
}

export async function getWomenCollections() {
  let { data: women, error } = await supabase
    .from("collections")
    .select("*")
    .eq("gender", "men");
  if (error)
    throw new Error(`Fetching women collections failed: ${error.message}`);

  return women;
}

export async function getFilter() {}

export async function getWishLists(wishlistIds) {
  let { data: wishlists, error } = await supabase
    .from("collections")
    .select("*")
    .in("id", wishlistIds);

  if (error) throw new Error(`Fetching WishList failed: ${error.message}`);

  return wishlists;
}

export async function getCartLists(cartlistIds) {
  let { data: cartLists, error } = await supabase
    .from("collections")
    .select("*")
    .in("id", cartlistIds);

  if (error) throw new Error(`Fetching CartList failed: ${error.message}`);

  return cartLists;
}

export async function getSearch({ searchEntry }) {
  let { data: search, error } = await supabase
    .from("collections")
    .select("*")
    .or(
      `productName.ilike.%${searchEntry}%, description.ilike.%${searchEntry}%`
    );
  if (error) throw new Error(`Fetching search result failed: ${error.message}`);

  // console.log(
  //   "This is the Search Result:",
  //   search,
  //   "For Search Term:",
  //   searchEntry
  // );

  return search;
}
