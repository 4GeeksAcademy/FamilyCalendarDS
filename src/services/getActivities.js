export async function getActivities(supabase, duedate) {
  let { data: activities, error } = await supabase
    .from("activities")
    .select("*, familymember(*)")
    .eq("duedate", duedate)
    .eq("status", "open");
  return activities;
}

export async function getFamilyMembers(supabase) {
  let { data: activities, error } = await supabase
    .from("activities")
    .select("*, familymember(*), status(*)");
  return activities;
}
