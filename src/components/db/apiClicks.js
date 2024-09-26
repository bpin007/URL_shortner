import supabase from "./supabase";

export async function getClicksForUrls(urlIds) {
  const { error, data } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);
  if (error) {
    console.log(error.message);
    throw new Error("Unable to load Details");
  }
  return data;
}

export async function getClicksForUrl(url_id) {
  const { error, data } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.log(error.message);
    throw new Error("unable to load Stats");
  }

  return data;
}
