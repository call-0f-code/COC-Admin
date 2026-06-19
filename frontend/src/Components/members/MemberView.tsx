import { FileText, Ghost, Skull, Shield } from "lucide-react";
import { Header } from "../common/Header";
import { SearchBar } from "../common/SearchBar";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { MemberCard } from "./MemberCard";
import { DeadZoneCard } from "./DeadZoneCard";
import { RoleManagerCard } from "./RoleManagerCard";
import { EmptyState } from "../common/EmptyState";
import { useMembers } from "../../hooks/useMembers";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { globalToast } from "../../utils/toast";
import { motion } from "framer-motion";

type Tab = "pending" | "dead-zone" | "role-manager";

export const MembersView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("pending");

  const { adminUser } = useAuth();
  const isSuperAdmin = adminUser?.role === "SUPER_ADMIN";

  const {
    members,
    isLoading,
    approveCurrentMember,
    deadZoneMembers,
    isDeadZoneLoading,
    ghostMemberMutation,
    getAllmembers,
    updateRoleMutation,
  } = useMembers();

  const filteredMembers =
    members?.filter((member: Member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const filteredDeadZone =
    deadZoneMembers?.filter((member: Member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const filteredAllMembers =
    getAllmembers?.filter((member: Member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  type TabConfig = { key: Tab; label: string; icon: React.ReactNode; count: number; superAdminOnly?: boolean };
  const tabs: TabConfig[] = [
    {
      key: "pending",
      label: "Pending Queue",
      icon: <FileText className="w-4 h-4" />,
      count: members.length,
    },
    {
      key: "dead-zone",
      label: "Dead Zone",
      icon: <Skull className="w-4 h-4" />,
      count: deadZoneMembers.length,
    },
    ...(isSuperAdmin
      ? [
          {
            key: "role-manager" as Tab,
            label: "Role Manager",
            icon: <Shield className="w-4 h-4" />,
            count: getAllmembers.length,
            superAdminOnly: true,
          },
        ]
      : []),
  ];

  return (
    <div className="relative overflow-hidden pt-[80px] space-y-6">
      {/* Fixed header */}
      <Header title="" subtitle="MEMBER_MANAGEMENT" onBack={undefined} />

      {/* Tab navigation */}
      <div className="flex flex-wrap gap-3 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const isDeadZone = tab.key === "dead-zone";
          const isRoleMgr = tab.key === "role-manager";
          return (
            <motion.button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className={`flex items-center gap-2 px-5 py-2.5 border-4 border-black font-black uppercase tracking-wide text-sm transition-all duration-150
                ${isActive
                  ? isDeadZone
                    ? "bg-red-500 text-white shadow-[4px_4px_0_0_#000]"
                    : isRoleMgr
                    ? "bg-black text-yellow-400 shadow-[4px_4px_0_0_#a16207]"
                    : "bg-cyan-400 text-black shadow-[4px_4px_0_0_#000]"
                  : "bg-white text-black shadow-[4px_4px_0_0_#000] hover:bg-gray-100"
                }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {/* Count badge */}
              <span
                className={`ml-1 min-w-[22px] h-[22px] flex items-center justify-center rounded-full border-2 border-black text-xs font-black
                  ${isActive
                    ? isDeadZone
                      ? "bg-black text-red-400"
                      : isRoleMgr
                      ? "bg-yellow-400 text-black"
                      : "bg-black text-cyan-400"
                    : "bg-black text-white"
                  }`}
              >
                {tab.count}
              </span>
              {tab.superAdminOnly && (
                <span className="text-[9px] font-black uppercase tracking-widest bg-yellow-400 text-black border border-black px-1 rounded-sm">
                  SA
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Search bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder={
          activeTab === "pending"
            ? "SEARCH_MEMBERS..."
            : activeTab === "dead-zone"
            ? "SEARCH_DEAD_ZONE..."
            : "SEARCH_ALL_MEMBERS..."
        }
      />

      {/* ── PENDING QUEUE ── */}
      {activeTab === "pending" && (
        <>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-8">
              {filteredMembers.map((member: Member) => {
                const isApproving =
                  approveCurrentMember.isPending &&
                  approveCurrentMember.variables?.memberId === member.id;
                const isGhosting =
                  ghostMemberMutation.isPending &&
                  ghostMemberMutation.variables?.memberId === member.id &&
                  ghostMemberMutation.variables?.ghost === true;

                return (
                  <MemberCard
                    key={member.id}
                    member={member}
                    onApprove={() =>
                      approveCurrentMember.mutate(
                        {
                          memberId: member.id,
                          memberEmail: member.email,
                          memberName: member.name,
                        },
                        {
                          onSuccess: () =>
                            globalToast.success("Member Approved Successfully"),
                        }
                      )
                    }
                    isApproving={isApproving}
                    onGhost={() =>
                      ghostMemberMutation.mutate(
                        { memberId: member.id, ghost: true },
                        {
                          onSuccess: () =>
                            globalToast.success(`${member.name} moved to Dead Zone`),
                        }
                      )
                    }
                    isGhosting={isGhosting}
                  />
                );
              })}

              {filteredMembers.length === 0 && !isLoading && (
                <EmptyState icon={FileText} message="NO_PENDING_MEMBERS" />
              )}
            </div>
          )}
        </>
      )}

      {/* ── DEAD ZONE ── */}
      {activeTab === "dead-zone" && (
        <>
          {isDeadZoneLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-8">
              {filteredDeadZone.map((member: Member) => {
                const isUnghosting =
                  ghostMemberMutation.isPending &&
                  ghostMemberMutation.variables?.memberId === member.id &&
                  ghostMemberMutation.variables?.ghost === false;

                return (
                  <DeadZoneCard
                    key={member.id}
                    member={member}
                    onUnghost={() =>
                      ghostMemberMutation.mutate(
                        { memberId: member.id, ghost: false },
                        {
                          onSuccess: () =>
                            globalToast.success(
                              `${member.name} restored to Pending Queue`
                            ),
                        }
                      )
                    }
                    isUnghosting={isUnghosting}
                  />
                );
              })}

              {filteredDeadZone.length === 0 && !isDeadZoneLoading && (
                <EmptyState icon={Ghost} message="DEAD_ZONE_IS_EMPTY" />
              )}
            </div>
          )}
        </>
      )}

      {/* ── ROLE MANAGER (Super Admin only) ── */}
      {activeTab === "role-manager" && isSuperAdmin && (
        <>
          <div className="flex items-center gap-3 px-1 py-2 bg-black border-4 border-yellow-400 shadow-[4px_4px_0_0_#a16207] rounded-md">
            <Shield className="w-5 h-5 text-yellow-400 flex-shrink-0" strokeWidth={3} />
            <p className="text-yellow-400 font-black text-sm uppercase tracking-wide">
              Super Admin — Role changes take effect immediately and are permanent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-4">
            {filteredAllMembers.map((member: Member) => {
              const isUpdating =
                updateRoleMutation.isPending &&
                updateRoleMutation.variables?.memberId === member.id;
              const isGhosting =
                ghostMemberMutation.isPending &&
                ghostMemberMutation.variables?.memberId === member.id &&
                ghostMemberMutation.variables?.ghost === true;

              return (
                <RoleManagerCard
                  key={member.id}
                  member={member}
                  onRoleChange={(memberId, role) =>
                    updateRoleMutation.mutate(
                      { memberId, role },
                      {
                        onSuccess: () =>
                          globalToast.success(
                            `${member.name}'s role updated to ${role}`
                          ),
                      }
                    )
                  }
                  isUpdating={isUpdating}
                  onGhost={() =>
                    ghostMemberMutation.mutate(
                      { memberId: member.id, ghost: true },
                      {
                        onSuccess: () =>
                          globalToast.success(`${member.name} moved to Dead Zone`),
                      }
                    )
                  }
                  isGhosting={isGhosting}
                />
              );
            })}

            {filteredAllMembers.length === 0 && (
              <EmptyState icon={Shield} message="NO_MEMBERS_FOUND" />
            )}
          </div>
        </>
      )}
    </div>
  );
};
