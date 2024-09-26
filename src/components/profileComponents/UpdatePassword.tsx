import { updatePassword } from "@/api/profile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function UpdatePasswordDialog() {
  const { toast } = useToast();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = async () => {
    console.log("update password");
    if (newPassword !== confirmPassword || newPassword === "") {
      toast({
        title: "Error",
        description: "Passwords do not match or are empty",
        variant: "destructive",
      });
      return;
    }

    if (oldPassword === newPassword) {
      toast({
        title: "Error",
        description: "New password cannot be the same as the old password",
        variant: "destructive",
      });
      return;
    }

    try {
      await updatePassword(oldPassword, newPassword);
      toast({
        title: "Success",
        description: "Password updated successfully",
      });
    } catch (err: any) {
      if (err.response.status === 401) {
        toast({
          title: "Error",
          description: "Incorrect password",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full border border-red-500 text-red-500 hover:text-red-600 dark:border-red-900 dark:text-red-900 dark:hover:text-red-700"
        >
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="p-12 dark:border-border dark:bg-secondary dark:text-quaternary sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="dark:text-quaternary">
            Update Password
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4 dark:text-quaternary">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              className="mt-1 dark:text-quaternary"
            />
          </div>
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        <DialogFooter className="md:flex-row md:justify-center">
          <Button variant="green" type="submit" onClick={handleUpdatePassword}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
