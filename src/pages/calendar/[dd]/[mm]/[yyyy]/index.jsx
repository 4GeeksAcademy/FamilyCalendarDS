import { getActivities } from "@/services/getActivities";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function CalendarPage() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const dd = router.query.dd;
  const mm = router.query.mm;
  const yyyy = router.query.yyyy;

  const d = `${mm}-${dd}-${yyyy}`;
  const activityQuery = useQuery({
    queryKey: ["activities"],
    queryFn: () => getActivities(supabase, d),
    enabled: !!dd && !!mm && !!yyyy,
  });
  return (
    <div>
      <h1>Calendar Page</h1>

      {activityQuery.isLoading && <div>Loading...</div>}
      {activityQuery.data?.map((task) => (
        <li key={task.id}>
          {task.familymember.name} - {task.subject} - {task.status}
        </li>
      ))}
      {activityQuery.isError && <div>Error fetching data</div>}
    </div>
  );
}
