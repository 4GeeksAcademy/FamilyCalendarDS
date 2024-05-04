export async function createActivity(supabase, activityData) {
  const { data, error } = await supabase
    .from("activities")
    .insert([activityData])
    .select();
  return data;
}
