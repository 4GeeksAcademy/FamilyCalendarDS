export async function getActivities (supabase) {
let { data: activities, error } = await supabase.from("activities").select("*");
return activities;       
}