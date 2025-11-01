import { addTaskApi, getAllStudentApi, getAllTaskApi, getSeniorsApi } from "@/api/taskApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ViewTaskModal } from "@/components/viewTaskModal";

function AdminTasks() {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [students,setStudents] = useState<any[]>([]);
  let count = 0;

  const [seniors, setSeniors] = useState<any[]>([]);
  const [conductedBy, setConductedBy] = useState<string[]>([]);

  const [tasks, setTasks] = useState<any[]>([]);
  const fetchSeniors = async () => {
    try {
      const response = await getSeniorsApi();
      if (response.data && response.data.users) {
        setSeniors(response.data.users);
      }
    } catch (error) {
      console.error("failed to fetch users", error);
    }
  };
  const fetchTask = async () => {
    try {
      const response = await getAllTaskApi();
      if (response.data && response.data.tasks) {
        setTasks(response.data.tasks);
      }
    } catch (error) {
      console.log("failed to fetch tasks", error);
    }
  }

  const fetchStudents = async () => {
    try {
      const response = await getAllStudentApi();
      if (response.data && response.data.users) {
        setStudents(response.data.users);
      }
    } catch (error) {
      console.log("failed to fetch students", error);
    }
  }



  useEffect(() => {
    fetchSeniors();
    fetchTask();
    fetchStudents();
  }, []);
  console.log("senior", seniors);
  console.log("tsak", tasks)
  console.log("students",students)

  const handleViewClick = (task: any) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      activity: taskName,
      description,
      conductedBy: conductedBy,
    };

    addTaskApi(data)
      .then((response) => {
        console.log("Task added:", response.data);
        setOpen(false);
        setTaskName("");
        setDescription("");
        setConductedBy([]);
      })
      .catch((error) => {
        console.error("Failed to add task:", error);
      });
  }

  const handleUserSelect = (userId: string) => {
    setConductedBy((prevSelectedUser) => {
      if (prevSelectedUser.includes(userId)) {
        return prevSelectedUser.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUser, userId];
      }
    });
  };
  return (
    <>
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-2 m-4">
          <Input type="text" placeholder="Search..." className="w-64" />
          <Button type="submit" className="flex items-center gap-1">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>

        <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md  backdrop-blur-lg border border-gray-200 shadow-xl rounded-xl">
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle className="text-lg font-semibold">
              Add New Task
            </DialogTitle>
          </DialogHeader>

          <form className="flex flex-col gap-4 mt-3" onSubmit={handleSubmit}>
            <Input
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
            />
            <Textarea
              placeholder="Description"
              className="min-h-[100px] "
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Conducted By</label>
              <div className="max-h-[200px] overflow-y-auto rounded-md border p-3">
                {seniors.length > 0 ? (
                  seniors.map((senior) => (
                    <div key={senior._id} className="flex items-center gap-2 mb-2">
                      <Checkbox
                        id={senior._id}
                        onCheckedChange={() => handleUserSelect(senior._id)}
                        checked={conductedBy.includes(senior._id)}
                      />
                      <label
                        htmlFor={senior._id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {senior.username}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Loading users...
                  </p>
                )}
              </div>
            </div>

            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full">
              Save Task
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Task ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Task</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{++count}</TableCell>
              <TableCell>{new Date(task.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{task.activity}</TableCell>
              <TableCell className="text-right">
                <Button
                 variant="secondary"
                 onClick={() => handleViewClick(task)}
                 >
                  <Eye className="w-4 h-4" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ViewTaskModal
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        task={selectedTask}
        seniors={seniors}
        allUsers={students} 
        onTaskUpdated={fetchTask}
      />
    </>
  );
}

export default AdminTasks;