import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  updateTaskApi,
  markAttendanceApi,
  deleteTaskApi,
} from "@/api/taskApi";

interface ViewTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: any | null;
  seniors: any[];
  allUsers: any[];
  onTaskUpdated: () => void;
}

export function ViewTaskModal({
  open,
  onOpenChange,
  task,
  seniors,
  allUsers,
  onTaskUpdated,
}: ViewTaskModalProps) {
  const [attendance, setAttendance] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedActivity, setEditedActivity] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedConductedBy, setEditedConductedBy] = useState<string[]>([]);

  useEffect(() => {
    if (task) {
      setAttendance(task.attendance || []);
      setEditedActivity(task.activity);
      setEditedDescription(task.description);
      setEditedConductedBy(task.conductedBy || []);
    } else {
      setAttendance([]);
      setIsEditing(false);
      setEditedActivity("");
      setEditedDescription("");
      setEditedConductedBy([]);
    }
  }, [task]);

  if (!task) return null;

  const handleAttendanceChange = (userId: string) => {
    setAttendance((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleConductedByChange = (userId: string) => {
    setEditedConductedBy((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleEditClick = () => {
    if (!task) return;
    setEditedActivity(task.activity);
    setEditedDescription(task.description);
    setEditedConductedBy(task.conductedBy || []);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (task) {
      setEditedActivity(task.activity);
      setEditedDescription(task.description);
      setEditedConductedBy(task.conductedBy || []);
    }
  };

  const handleSaveAttendance = async () => {
    if (!task) return;
    try {
      await markAttendanceApi(task._id, { attendance });
      onTaskUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save attendance:", error);
    }
  };

  const handleSaveChanges = async () => {
    if (!task) return;
    const updatedData = {
      activity: editedActivity,
      description: editedDescription,
      conductedBy: editedConductedBy,
    };
    try {
      await updateTaskApi(task._id, updatedData);
      onTaskUpdated();
      setIsEditing(false);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDelete = async () => {
    if (!task || !window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    try {
      await deleteTaskApi(task._id);
      onTaskUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[95%] sm:max-w-lg max-h-[90vh] overflow-y-auto backdrop-blur-lg border border-gray-200 shadow-xl rounded-xl p-4 sm:p-6"
      >
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold text-center sm:text-left">
            {isEditing ? "Edit Task" : "Task Details"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-3 text-sm sm:text-base">
          <div className="flex flex-col gap-2">
            {isEditing ? (
              <Input
                value={editedActivity}
                onChange={(e) => setEditedActivity(e.target.value)}
                placeholder="Task Name"
                className="w-full"
              />
            ) : (
              <h3 className="text-base sm:text-lg font-medium break-words">
                {task.activity}
              </h3>
            )}

            {isEditing ? (
              <Textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Description"
                className="min-h-[100px] w-full"
              />
            ) : (
              <p className="text-muted-foreground break-words">
                {task.description}
              </p>
            )}
          </div>

          <hr />

          {isEditing && (
            <div>
              <h4 className="font-medium mb-2">Conducted By</h4>
              <div className="max-h-[150px] overflow-y-auto rounded-md border p-3 flex flex-col gap-3">
                {seniors.length > 0 ? (
                  seniors.map((user) => (
                    <div key={user._id} className="flex items-center gap-2">
                      <Checkbox
                        id={`cond-${user._id}`}
                        checked={editedConductedBy.includes(user._id)}
                        onCheckedChange={() => handleConductedByChange(user._id)}
                      />
                      <label
                        htmlFor={`cond-${user._id}`}
                        className="text-sm font-medium"
                      >
                        {user.username}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No users available.
                  </p>
                )}
              </div>
            </div>
          )}

          {!isEditing && (
            <div>
              <h4 className="font-medium mb-2">Attendance</h4>
              <div className="max-h-[200px] overflow-y-auto rounded-md border p-3 flex flex-col gap-3">
                {allUsers.length > 0 ? (
                  allUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`att-${user.id}`}
                        checked={attendance.includes(user.id)}
                        onCheckedChange={() => handleAttendanceChange(user.id)}
                      />
                      <label
                        htmlFor={`att-${user.id}`}
                        className="text-sm font-medium"
                      >
                        {user.username}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No users available.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleCancelEdit}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button onClick={handleSaveChanges} className="w-full sm:w-auto">
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="w-full sm:w-auto"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
              <Button
                onClick={handleSaveAttendance}
                className="w-full sm:w-auto"
              >
                Save Attendance
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
