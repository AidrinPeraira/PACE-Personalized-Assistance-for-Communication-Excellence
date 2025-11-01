import {
  addTaskApi,
  getAllStudentApi,
  getAllTaskApi,
  getSeniorsApi,
} from "@/api/taskApi";
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
  const [students, setStudents] = useState<any[]>([]);
  // let count = 0; // <-- Removed this, as it's a render-side side-effect

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
  };

  const fetchStudents = async () => {
    try {
      const response = await getAllStudentApi();
      if (response.data && response.data.users) {
        setStudents(response.data.users);
      }
    } catch (error) {
      console.log("failed to fetch students", error);
    }
  };

  useEffect(() => {
    fetchSeniors();
    fetchTask();
    fetchStudents();
  }, []);

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
        fetchTask(); 
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full p-4 gap-4">

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full sm:w-64"
          />
          <Button type="submit" variant="outline" size="icon" className="sm:hidden">
            <Search className="h-4 w-4" /> 
          </Button>
          <Button type="submit" variant="outline" className="hidden sm:flex items-center gap-1">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 w-full sm:w-auto" 
        >
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

            <div className="flex gap-2"> 
              <DialogClose asChild>
                <Button type="button" variant="outline" className="w-full">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" className="w-full">
                Save Task
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="hidden md:block p-4">
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
            {tasks.map((task, index) => (
              <TableRow key={task._id}> 
                <TableCell className="font-medium">{index + 1}</TableCell> 
                <TableCell>
                  {new Date(task.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{task.activity}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="secondary"
                    onClick={() => handleViewClick(task)}
                    className="flex items-center gap-1 ml-auto" 
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="block md:hidden p-4 space-y-3">
        {tasks.map((task, index) => (
          <div
            key={task._id}
            className="border rounded-lg p-4 shadow-sm bg-card text-card-foreground"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="font-semibold text-base pr-2">
                {task.activity}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleViewClick(task)}
                className="flex-shrink-0 flex items-center gap-1"
              >
                <Eye className="w-4 h-4" />
                View
              </Button>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                <strong className="text-card-foreground">Task ID:</strong>{" "}
                {index + 1} 
              </p>
              <p>
                <strong className="text-card-foreground">Date:</strong>{" "}
                {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

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