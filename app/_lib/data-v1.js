const URLENDPOINT = "http://localhost:4781";

export async function getCollections() {
  try {
    const repsonse = await fetch(`${URLENDPOINT}/collections`);
    if (!repsonse.ok) {
      throw new Error(
        `Fetching  collections failed. Status ${repsonse.status}`
      );
    }
    const data = await repsonse.json();
    return data;
  } catch (error) {
    console.error("Fetch Error");
  }
}

export async function getCollectionsData({ filters }) {
  try {
    const repsonse = await fetch(`${URLENDPOINT}/collections/${filters}`);
    if (!repsonse.ok) {
      throw new Error(
        `Fetching  collections failed. Status ${repsonse.status}`
      );
    }
    const data = await repsonse.json();
    return data;
  } catch (error) {
    console.error("Fetch Error");
  }
}

export async function getMenCollections() {
  const repsonse = await fetch(
    `${URLENDPOINT}/collections?gender=men&_limit=7`
  );
  const data = await repsonse.json();
  // const men = data.filter((product) => product.gender === "men");
  const men = data;
  console.log(men);

  return men;
}

export async function getWomenCollections() {
  const repsonse = await fetch(
    `${URLENDPOINT}/collections?gender=women&_limit=7`
  );
  const data = await repsonse.json();
  // const women = data.filter((product) => product.gender === "women");
  const women = data;
  console.log(women);

  return women;
}

export async function getWishLists(wishlists) {
  const repsonse = await fetch(`${URLENDPOINT}/collections`);
  const data = await repsonse.json();

  const wishList = data.filter((product) => wishlists.includes(product.id));
  console.log(wishList);

  return wishList;
}

export async function getCartLists(cartlists) {
  const repsonse = await fetch(`${URLENDPOINT}/collections`);
  const data = await repsonse.json();

  const cartList = data.filter((product) => cartlists.includes(product.id));
  console.log(cartList);

  return cartList;
}

export async function getSearch({ SearchInput }) {
  const repsonse = await fetch(`${URLENDPOINT}/collections`);
  const data = await repsonse.json();
  const search = data.filter((product) => product.productname === SearchInput);

  return search || [];
}

export async function getFilter() {
  const repsonse = await fetch(`${URLENDPOINT}/collections?${filter}`);
  const data = await repsonse.json();

  return filtered;
}
