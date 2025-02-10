import React from "react";

const TasksPage = async () => {
  const res = await fetch("http://localhost:3000/api/tasks", {
    cache: "no-store", // no-store is the default value so it doesn't really have to be here. This is just an example
  });
  const tasks = await res.json();

  console.log(tasks);

  return <div>TasksPage</div>;
};

export default TasksPage;
