import { getActivities } from "@/services/getActivities";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";

export default function CalendarPage() {
  const supabase = useSupabaseClient();
  const activityQuery = useQuery({
    queryKey: ["activities"],
    queryFn: () => getActivities(supabase),
  });
  return (
    <div>
      <h1>Calendar Page</h1>
      {activityQuery.data?.map((task) => (
        <li key={task.id}> {task.subject}</li>
      ))}
    </div>
  );
}
