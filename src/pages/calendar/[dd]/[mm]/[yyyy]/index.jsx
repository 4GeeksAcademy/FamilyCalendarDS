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

  // Separate tasks for Child 1 and Child 2
  const child1Tasks = activityQuery.data?.filter(
    (task) => task.familymember.name === "Luke"
  );
  const child2Tasks = activityQuery.data?.filter(
    (task) => task.familymember.name === "Bohan"
  );

  return (
    <div
      className="container"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <h1>Task Daily Family Page</h1>
      <div className="column" style={{ width: "48%", margin: "1%" }}>
        <div>Luke</div>

        {activityQuery.isLoading && <div>Loading...</div>}
        {child1Tasks &&
          child1Tasks.map((task) => (
            <li key={task.id}>
              {task.subject} - {task.status}
            </li>
          ))}
        {activityQuery.isError && <div>Error fetching data</div>}
        <a href="/calendar/create" className="btn btn-success">
          Add Task
        </a>
      </div>
      <div className="column" style={{ width: "48%", margin: "1%" }}>
        <div>Bohan</div>

        {activityQuery.isLoading && <div>Loading...</div>}
        {child2Tasks &&
          child2Tasks.map((task) => (
            <li key={task.id}>
              {task.subject} - {task.status}
            </li>
          ))}
        {activityQuery.isError && <div>Error fetching data</div>}
        <a href="/calendar/create" className="btn btn-success">
          Add Task
        </a>
      </div>
    </div>
  );
}
