import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActivitySchema } from "@/services/schema";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createActivity } from "@/services/createActivity";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function CreateActivityPage() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      subject: "",
      duedate: "",
    },
    resolver: zodResolver(ActivitySchema),
  });

  const activityQuery = useMutation({
    mutationFn: (data) => createActivity(supabase, data),
  });
  const familyMembersQuery = useQuery({
    queryKey: ["family_members"],
    queryFn: async () => {
      const { data } = await supabase.from("familymember").select("*");
      return data;
    },
  });

  const handleSaveData = async (data) => {
    const createRecord = await activityQuery.mutateAsync(data);
    console.log(createRecord);
    router.push("/calendar");
  };

  return (
    <div className="container">
      <h2>Create Activity</h2>
      <form onSubmit={form.handleSubmit(handleSaveData)}>
        <label className="form-label">Activity</label>
        <input
          type="text"
          {...form.register("subject")}
          className="form-control"
        />

        {form.formState.errors.activity && (
          <div className="text-danger">
            {form.formState.errors.activity?.message}
          </div>
        )}

        <label className="form-label">Due</label>
        <input
          type="date"
          {...form.register("duedate", { valueAsDate: true })}
          className="form-control"
        />

        {form.formState.errors.duedate && (
          <div className="text-danger">
            {form.formState.errors.duedate?.message}
          </div>
        )}

        <label className="form-label">Family Member</label>
        <select {...form.register("familymember_id")} className="form-control">
          {familyMembersQuery.data?.map((fm) => (
            <option value={fm.id} key={fm.id}>
              {fm.name}
            </option>
          ))}
        </select>

        {form.formState.errors.duedate && (
          <div className="text-danger">
            {form.formState.errors.duedate?.message}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-success"
          disabled={activityQuery.isPending}
        >
          {activityQuery.isPending ? "Saving data..." : "Create Activity"}
        </button>
      </form>
    </div>
  );
}
