"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../supabase/client";
import { Tables } from "@/types/supabase";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type User = Tables<"users">;
type UserPackage = Tables<"user_packages"> & { package: Tables<"packages"> };

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [packages, setPackages] = useState<Tables<"packages">[]>([]);
  const [userPackages, setUserPackages] = useState<
    Record<string, UserPackage[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchUsers();
    fetchPackages();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching users:", error);
    } else {
      setUsers(data || []);
      // Fetch packages for each user
      const userIds = data?.map((user) => user.id) || [];
      await fetchUserPackages(userIds);
    }
    setLoading(false);
  };

  const fetchPackages = async () => {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .order("price", { ascending: true });

    if (error) {
      console.error("Error fetching packages:", error);
    } else {
      setPackages(data || []);
    }
  };

  const fetchUserPackages = async (userIds: string[]) => {
    if (userIds.length === 0) return;

    const { data, error } = await supabase
      .from("user_packages")
      .select(
        `
        *,
        package:package_id(id, name, price, currency, duration_days)
      `,
      )
      .in("user_id", userIds);

    if (error) {
      console.error("Error fetching user packages:", error);
    } else {
      // Group packages by user_id
      const packagesByUser: Record<string, UserPackage[]> = {};
      data?.forEach((pkg) => {
        if (!packagesByUser[pkg.user_id]) {
          packagesByUser[pkg.user_id] = [];
        }
        packagesByUser[pkg.user_id].push(pkg as UserPackage);
      });
      setUserPackages(packagesByUser);
    }
  };

  const toggleSuperAdmin = async (
    userId: string,
    currentValue: boolean | null,
  ) => {
    const { error } = await supabase
      .from("users")
      .update({ is_super_admin: !currentValue })
      .eq("id", userId);

    if (error) {
      console.error("Error updating user:", error);
    } else {
      // Update local state
      setUsers(
        users.map((user) =>
          user.id === userId
            ? { ...user, is_super_admin: !currentValue }
            : user,
        ),
      );
    }
  };

  const assignPackage = async () => {
    if (!selectedUser || !selectedPackage) return;

    const selectedPkg = packages.find((pkg) => pkg.id === selectedPackage);
    if (!selectedPkg) return;

    // Calculate end date based on duration_days
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + selectedPkg.duration_days);

    const { error } = await supabase.from("user_packages").insert({
      user_id: selectedUser.id,
      package_id: selectedPackage,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      is_active: true,
    });

    if (error) {
      console.error("Error assigning package:", error);
    } else {
      // Refresh user packages
      await fetchUserPackages([selectedUser.id]);
      setIsDialogOpen(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (user.full_name && user.full_name.toLowerCase().includes(searchLower)) ||
      (user.email && user.email.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Input
          type="text"
          placeholder="Search users..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-8">Loading users...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Packages
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {user.avatar_url ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.avatar_url}
                            alt=""
                          />
                        ) : (
                          <span className="text-gray-500 text-sm">
                            {user.full_name?.charAt(0) ||
                              user.email?.charAt(0) ||
                              "U"}
                          </span>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.full_name || "No name"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {userPackages[user.id]?.length ? (
                        <div className="space-y-1">
                          {userPackages[user.id].map((pkg) => (
                            <div
                              key={pkg.id}
                              className="text-xs px-2 py-1 bg-blue-50 rounded inline-block mr-1"
                            >
                              {pkg.package.name}
                            </div>
                          ))}
                        </div>
                      ) : (
                        "No packages"
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Switch
                        checked={!!user.is_super_admin}
                        onCheckedChange={() =>
                          toggleSuperAdmin(user.id, user.is_super_admin)
                        }
                        id={`admin-switch-${user.id}`}
                      />
                      <Label
                        htmlFor={`admin-switch-${user.id}`}
                        className="ml-2"
                      >
                        {user.is_super_admin ? "Yes" : "No"}
                      </Label>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Dialog
                      open={isDialogOpen && selectedUser?.id === user.id}
                      onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (open) {
                          setSelectedUser(user);
                          setSelectedPackage(packages[0]?.id || "");
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Assign Package
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Assign Package to {user.full_name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="package-select">
                              Select Package
                            </Label>
                            <select
                              id="package-select"
                              className="w-full p-2 border rounded-md"
                              value={selectedPackage}
                              onChange={(e) =>
                                setSelectedPackage(e.target.value)
                              }
                            >
                              {packages.map((pkg) => (
                                <option key={pkg.id} value={pkg.id}>
                                  {pkg.name} - {pkg.price} {pkg.currency}
                                </option>
                              ))}
                            </select>
                          </div>
                          <Button onClick={assignPackage} className="w-full">
                            Assign Package
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
