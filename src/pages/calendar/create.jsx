import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActivitySchema } from "@services/schema";

export default function CreateActivityPage() {
  const form = useForm({
    defaultValues: {
      activity: "",
      duedate: "",
    },
    resolver: zodResolver(ActivitySchema),
  });
  return (
    <div className="container">
      <h2>Create Page</h2>
      <label className="form-label">Activity</label>
      <input
        type="text"
        {...form.register("activity")}
        className="form-control"
      />
    </div>
  );
}
