import ProjectForm from "@/components/projectForm";
export default function NewProjectPage() {
  return (
    <>
      <h1>New Project</h1>
      <ProjectForm
        project={{
          name: "",
          description: "",
          due_date: "",
          id: 0,
          user_id: "",
        }}
      />
    </>
  );
}
