import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Eye, Plus, Search, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addTaskApi } from "@/api/taskApi"
function AdminTasks() {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      activity:taskName,
      description,
      conductedBy:"nandu"
    }
    addTaskApi(data)
  }

  const invoices = [
    { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
    { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
    { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
  ]
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
        <DialogContent
          className="sm:max-w-md  backdrop-blur-lg border border-gray-200 shadow-xl rounded-xl"
        >
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle className="text-lg font-semibold">Add New Task</DialogTitle>
          </DialogHeader>

          <form className="flex flex-col gap-4 mt-3" onSubmit={handleSubmit}>
            <Input placeholder="Task Name" onChange={(e) => { setTaskName(e.target.value) }} />
            <Textarea
              placeholder="Description"
              className="min-h-[100px] "
              onChange={(e) => {setDescription(e.target.value)}}
            />

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="ConductedBy" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>North America</SelectLabel>
                  <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                  <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                  <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                  <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                  <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <DialogClose asChild>
              <Button
              >
                Close
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full" onClick={() => setOpen(false)}>
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
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>Cordinators</TableCell>

              <TableCell className="text-right">
                <Button variant="secondary">
                  <Eye className="w-4 h-4"/>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default AdminTasks
