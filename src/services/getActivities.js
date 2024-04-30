export async function getActivities(supabase) {
  let { data: activities, error } = await supabase
    .from("activities")
    .select("*, familymember(*), status(*)");
  return activities;
}
